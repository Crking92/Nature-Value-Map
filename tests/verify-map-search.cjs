// Run with Node 22: node tests/verify-map-search.cjs
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');
const core=require('../map-search-core.js');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'style.css'),'utf8');
const src=fs.readFileSync(path.join(root,'app.js'),'utf8');
const wf=fs.readFileSync(path.join(root,'.github/workflows/verify-evidence.yml'),'utf8');
const url=new URL(core.buildUrl('  Steeplechase Park, Kyle TX  '));
assert.equal(url.hostname,'geocode.arcgis.com');
assert.equal(url.protocol,'https:');
assert.equal(url.searchParams.get('SingleLine'),'Steeplechase Park, Kyle TX');
assert.equal(url.searchParams.get('maxLocations'),'5');
assert.equal(url.searchParams.get('forStorage'),'false','Results must not be stored without an authenticated agreement');
assert.equal(url.searchParams.get('sourceCountry'),'USA');
assert.equal(url.searchParams.get('f'),'json');
assert.equal(url.searchParams.get('location'),'-97.8772,29.9891');
assert.throws(()=>core.buildUrl(''),/Enter/);
assert.throws(()=>core.buildUrl('x'.repeat(181)),/Enter/);
assert.equal(core.normalizeQuery('  123   Main St  '),'123 Main St');
const payload={candidates:[
 {address:'Steeplechase Park, Kyle, TX',location:{x:-97.875,y:29.989},score:98,attributes:{Addr_type:'POI'}},
 {address:'Another match',location:{x:-97.8,y:30.01},score:84,attributes:{Addr_type:'Locality'}},
 {address:'Bad lat',location:{x:-97.8,y:400},score:99},
 {address:'Poor score',location:{x:-97.8,y:30.01},score:22},
 {address:'Missing coordinate',location:{x:-97.8},score:91},
 {address:'Dangerous label <img src=x>',location:{x:-97.8,y:30},score:89}
]};
const hits=core.matches(payload);
assert.equal(hits.length,3);
assert.deepEqual([hits[0].lat,hits[0].lon],[29.989,-97.875]);
assert.equal(hits[1].type,'Locality');
assert.throws(()=>core.matches({error:{code:499,message:'Unauthorized'}}),/unavailable/);
assert.throws(()=>core.matches({}),/No valid search results/);
for(const id of ['placeSearchForm','placeSearchInput','placeSearchButton','placeSearchStatus','placeSearchResults','mapZoomIn','mapZoomOut','mapBackKyle','mapDetails']){
 assert.ok(html.includes('id="'+id+'"'),'Missing address/map control: '+id);
}
assert.ok(html.includes('map-search-core.js?v=1')&&html.includes('app.js?v=8'));
assert.ok(html.includes('style.css?v=8'));
assert.ok(/<form id="placeSearchForm"[^>]*role="search"/.test(html));
assert.ok(html.includes('Search for a U.S. address, park, or place'));
assert.ok(html.includes('it does not select a property or change acreage'),'Search cannot assert a parcel boundary');
assert.ok(css.includes('.map-zoom-tools')&&css.includes('.map-search-results'),'Map controls need visible styling');
assert.ok(src.includes('scrollWheelZoom:false'),'Map interaction must not hijack normal page scroll');
assert.ok(!src.includes('navigator.geolocation'),'No location permission or covert geolocation required');
assert.ok(!src.includes('oninput=')&&!src.includes('autocomplete search'),'Search must be explicit, not per-keystroke geocoding');
assert.ok(wf.includes('node tests/verify-map-search.cjs'),'CI must test map search');

class El {
 constructor(){this.value='';this._text='';this.style={};this.children=[];this.listeners={};this.attrs={};this.className='';this.disabled=false;this.checked=false;}
 get textContent(){return this._text;}
 set textContent(v){this._text=String(v);this.children=[];}
 append(...c){this.children.push(...c);}
 appendChild(c){this.children.push(c);}
 get firstChild(){return this.children[0]||null;}
 removeChild(c){const k=this.children.indexOf(c);if(k>=0)this.children.splice(k,1);}
 addEventListener(name,fn){this.listeners[name]=fn;}
 setAttribute(name,val){this.attrs[name]=String(val);}
 querySelector(sel){return this.children.find(c=>c.className===sel.slice(1))||null;}
}
function setup(mapAvailable){
 const all=new Map(),get=id=>{if(!all.has(id))all.set(id,new El());return all.get(id)};
 const vals={manualAcres:'2',mowsCurrent:'15',mowsProposed:'2',mowCost:'55',siteSetting:'unknown',costBasis:'assumption',runoffModel:'',runoffSource:'',installCost:'',careCost:''};
 for(const [id,v] of Object.entries(vals))get(id).value=v;
 const details=new El(),document={
  events:{},getElementById:get,createElement:()=>new El(),
  querySelector:sel=>sel==='.advanced'?details:null,
  querySelectorAll:sel=>sel==='.mix-row'?get('mixRows').children:[],
  addEventListener(event,fn){this.events[event]=fn;}
 };
 const state={zoom:12,center:null,queries:0,viewChanges:[],pins:0};
 const map={
  setView(center,zoom){state.center=center;state.zoom=zoom;state.viewChanges.push({center,zoom});return this;},
  zoomIn(){state.zoom++},zoomOut(){state.zoom--},
  invalidateSize(){},addLayer(){return this;},addControl(){return this;},on(){return this;},
  removeLayer(){return this;},getZoom(){return state.zoom;}
 };
 const L=mapAvailable?{
  map:()=>map,tileLayer:()=>({addTo(){return this;}}),FeatureGroup:class{clearLayers(){}addLayer(){}},
  Control:{Draw:class{}},Draw:{Event:{CREATED:'created',EDITED:'edited',DELETED:'deleted'}},
  circleMarker:()=>({addTo(){state.pins++;return this;}})
 }:undefined;
 const turf={area:()=>4046.86};
 let response={candidates:[payload.candidates[0]]};
 const fetchMock=async function(request){state.queries++;state.lastURL=request;return {ok:true,json:async()=>response}};
 let now=2000;
 const FauxDate={now:()=>now};
 new Function('document','L','turf','NVMPlaceSearch','fetch','Date',src)(document,L,turf,core,fetchMock,FauxDate);
 return {get,document,map,state,details,setResponse:r=>{response=r},advance:ms=>{now+=ms}};
}
async function run(){
 const view=setup(true),el=view.get;
 assert.equal(el('mowDiffOut').textContent,'$1,430','Initial 2-acre cost should remain intact');
 view.get('mapZoomIn').listeners.click();assert.equal(view.state.zoom,13,'Explicit + button zooms');
 view.get('mapZoomOut').listeners.click();assert.equal(view.state.zoom,12,'Explicit − button zooms');
 assert.equal(view.state.queries,0,'No search request without user submit');
 el('placeSearchInput').value='Steeplechase Park, Kyle TX';
 await el('placeSearchForm').listeners.submit({preventDefault(){}});
 assert.equal(view.state.queries,1,'One request per user submission');
 assert.deepEqual(view.state.center,[29.989,-97.875],'Single match centers map');
 assert.equal(view.state.pins,1,'A visible location pin is drawn');
 assert.match(el('placeSearchStatus').textContent,/Showing Steeplechase Park/);
 assert.equal(el('mowDiffOut').textContent,'$1,430','Address search does not silently change acreage');
 view.get('mapBackKyle').listeners.click();
 assert.deepEqual(view.state.center,[29.9891,-97.8772],'Kyle reset button works');
 view.advance(1500);
 view.setResponse({candidates:payload.candidates.slice(0,2)});
 await el('placeSearchForm').listeners.submit({preventDefault(){}});
 assert.equal(el('placeSearchResults').children.length,2,'Ambiguous results require choosing a candidate');
 assert.match(el('placeSearchStatus').textContent,/Choose the correct/);
 el('placeSearchResults').children[1].listeners.click();
 assert.deepEqual(view.state.center,[30.01,-97.8],'Selected match moves map');
 assert.equal(el('placeSearchResults').children.length,0,'Selection clears candidate list');
 assert.equal(view.state.zoom,13,'Locality searches should not zoom to parcel level');
 const absent=setup(false);
 absent.get('mapZoomIn').listeners.click();
 assert.match(absent.get('placeSearchStatus').textContent,/unavailable/);
 absent.get('placeSearchInput').value='A real place';
 await absent.get('placeSearchForm').listeners.submit({preventDefault(){}});
 assert.equal(absent.state.queries,0,'No geocoder request when map unavailable');
 assert.equal(absent.get('mowDiffOut').textContent,'$1,430','No map needed for original cost calculations');
 console.log('PASS: explicit map zoom, geocoder URL, match validation, single/ambiguous searches, Kyle reset, no hidden acreage changes, and map failure fallback.');
}
run().catch(e=>{console.error(e);process.exitCode=1;});
