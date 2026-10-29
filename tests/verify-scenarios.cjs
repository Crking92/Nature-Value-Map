// Node 22. Functional integration checks with a mocked DOM; no map tiles or network required.
// These tests validate shipped app.js's public outputs, not the suitability of a study transfer.
'use strict';
const assert=require('node:assert/strict'), fs=require('node:fs'), path=require('node:path');
const src=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');
class El {
 constructor(tag='div'){this.tag=tag;this.children=[];this.listeners={};this.value='';this._text='';this.className='';this.checked=false;this.style={};this.attrs={};}
 get textContent(){return this._text;}
 set textContent(v){this._text=String(v);this.children=[];}
 append(...xs){this.children.push(...xs);}
 appendChild(x){this.children.push(x);}
 get firstChild(){return this.children[0]||null;}
 removeChild(x){const i=this.children.indexOf(x);if(i>=0)this.children.splice(i,1);}
 addEventListener(name,fn){this.listeners[name]=fn;}
 setAttribute(key,value){this.attrs[key]=value;}
 querySelector(selector){const cl=selector.replace(/^\./,'');return this.children.find(x=>x.className.split(' ').includes(cl))||null;}
}
const registry=new Map();
const el=id=>{if(!registry.has(id))registry.set(id,new El());return registry.get(id);};
const inputs={manualAcres:'1',siteSetting:'unknown',mowCost:'55',mowsCurrent:'15',mowsProposed:'2',installCost:'',careCost:'',costBasis:'assumption',costReference:''};
for(const [id,value] of Object.entries(inputs))el(id).value=value;
const details=new El('details'),document={
 listeners:{},getElementById:el,createElement:tag=>new El(tag),
 querySelector:s=>s==='.advanced'?details:null,
 querySelectorAll:s=>s==='.mix-row'?el('mixRows').children:s==='.habitat-check:checked'?[]:[],
 addEventListener(name,fn){this.listeners[name]=fn;}
};
const map={setView(){return this},addLayer(){return this},addControl(){return this},on(){return this;}};
const L={
 map:()=>map,tileLayer:()=>({addTo(){return this;}}),
 FeatureGroup:class{clearLayers(){}addLayer(){}},
 Control:{Draw:class{}},Draw:{Event:{CREATED:'created',EDITED:'edited',DELETED:'deleted'}}
};
const turf={area:()=>4046.8564224};
new Function('document','L','turf',src)(document,L,turf);
function refresh(){document.listeners.change();}
function choose(index){el('landCards').children[index].listeners.click();}
function accept(){el('referenceAcknowledged').checked=true;refresh();}
function mix(open){details.listeners.toggle({target:{open}});}
function row(i,pct,id){
 const r=el('mixRows').children[i];
 r.querySelector('.mix-pct').value=String(pct);
 r.querySelector('.mix-class').value=id;
}
assert.equal(el('grossOut').textContent,'Confirm reference use','Do not automatically extrapolate one acre');
assert.equal(el('heroValue').textContent,'—','No large dollar headline before acknowledgement');
assert.equal(el('valueNote').children[0].textContent,'Source figure: $1,941/acre/year (2021 USD).','Study amount remains visible and traceable');
accept();
assert.equal(el('grossOut').textContent,'$1,941');
assert.equal(el('mowDiffOut').textContent,'$715','1 ac × (15-2) × $55');
assert.equal(el('tenYearOut').textContent,'Needs costs');
choose(1);assert.equal(el('grossOut').textContent,'Confirm reference use','Category change revokes acknowledgement');
accept();assert.equal(el('grossOut').textContent,'$18,948');
el('siteSetting').value='engineered';refresh();
assert.equal(el('grossOut').textContent,'Not established','Engineered basin must not receive a natural wetland transfer');
choose(3);accept();assert.equal(el('grossOut').textContent,'Not established','Engineered basin must not receive riparian transfer');
mix(true);
assert.equal(el('grossOut').textContent,'Not established','Mixed cover starts with blank proportions');
assert.ok(el('mixRows').children.every(r=>r.querySelector('.mix-pct').value===''),'No invented split');
row(0,50,'wetland');row(1,50,'forest');row(2,0,'turf_estimate');accept();refresh();
assert.equal(el('grossOut').textContent,'Not established','Mixed engineered wetland loophole blocked');
assert.match(el('plainAnswer').textContent,/Engineered drainage/);
row(0,50,'riparian_forest');refresh();
assert.equal(el('grossOut').textContent,'Not established','Mixed engineered riparian loophole blocked');
row(0,50,'forest');row(1,50,'native_prairie');refresh();
assert.equal(el('grossOut').textContent,'$7,265','Valid 50/50 reference uses one normalized dollar year');
row(2,1,'turf_estimate');refresh();
assert.equal(el('grossOut').textContent,'Not established','Nonzero unsupported turf must block mixed totals');
row(2,0,'turf_estimate');row(0,51,'forest');refresh();
assert.equal(el('grossOut').textContent,'Not established','Mixed shares greater than 100 blocked');
row(0,50,'forest');refresh();assert.equal(el('grossOut').textContent,'$7,265');
el('siteSetting').value='blackland';refresh();
mix(false);assert.equal(el('grossOut').textContent,'Confirm reference use','Mode change revokes acknowledgement once independent habitat mismatch is cleared');
choose(5);accept();assert.equal(el('grossOut').textContent,'Not established','No fabricated turf ecosystem-dollar default');
el('manualAcres').value='-1';refresh();assert.equal(el('areaOut').textContent,'Check acreage');
el('manualAcres').value='1';refresh();
el('installCost').value='1500';el('careCost').value='100';refresh();
assert.equal(el('tenYearOut').textContent,'$4,650','10yr modeled cost difference keeps mowing/management separate');
el('mowCost').value='-5';refresh();assert.equal(el('tenYearOut').textContent,'Check inputs','Negative costs blocked');
el('mowCost').value='55';el('installCost').value='';refresh();
assert.equal(el('tenYearOut').textContent,'Needs costs','Unknown installation cost must never be treated as zero');
// Itemized costs: all inputs are user-supplied for one pass of the full site.
el('mowCost').value='55';el('installCost').value='1500';el('careCost').value='100';
el('manualAcres').value='1';
el('useItemizedMowing').checked=true;
for(const [id,value] of Object.entries({laborHours:'2',laborRate:'20',equipHours:'1',equipRate:'25',fuelCost:'10',otherMowCost:'5'}))el(id).value=value;
refresh();
assert.equal(el('itemizedMowOut').textContent.includes('$80'),true,'Itemized one-site-pass cost (40+25+10+5) shown');
assert.equal(el('mowDiffOut').textContent,'$1,040','13 fewer passes times $80');
assert.equal(el('tenYearOut').textContent,'$7,900','Undiscounted 10-year scenario with input restoration costs');
el('fuelCost').value='';refresh();
assert.equal(el('tenYearOut').textContent,'Check inputs','No cost imputation when a component is blank');
el('fuelCost').value='10';refresh();
el('useItemizedMowing').checked=false;refresh();
assert.equal(el('mowDiffOut').textContent,'$715','Simple user-editable rate restored');

// Runoff intake: no volume invented until independent model outputs provided.
assert.equal(el('runoffVolumeOut').textContent,'Not calculated');
el('runoffModel').value='swc';
el('runoffSource').value='EPA SWC 3.4.0 / sample record';
el('runoffBefore').value='5';el('runoffAfter').value='3';
el('runoffComparable').checked=true;refresh();
assert.equal(el('runoffDepthOut').textContent,'Reduction: 2 in/year');
assert.equal(el('runoffVolumeOut').textContent,'Reduction: 54,308 gallons/year','1 acre × 2 inches × 27,154');
el('runoffAfter').value='7';refresh();
assert.equal(el('runoffVolumeOut').textContent,'Increase: 54,308 gallons/year','Negative delta is runoff increase, not avoided runoff');
el('runoffAfter').value='3';el('runoffSource').value='';refresh();
assert.equal(el('runoffVolumeOut').textContent,'Not calculated','No model identifier means no published conversion');
el('runoffSource').value='EPA SWC 3.4.0 / sample record';
el('runoffComparable').checked=false;refresh();
assert.equal(el('runoffVolumeOut').textContent,'Not calculated','Unconfirmed model assumptions block comparison');
el('runoffComparable').checked=true;el('manualAcres').value='12';refresh();
assert.equal(el('runoffVolumeOut').textContent,'Not calculated','Conservative EPA SWC 12-acre screening limit');
el('runoffModel').value='swmm';refresh();
assert.equal(el('runoffVolumeOut').textContent,'Reduction: 651,696 gallons/year','Other documented model may provide a larger site scenario (still unreviewed)');
el('runoffBefore').value='-1';refresh();
assert.equal(el('runoffVolumeOut').textContent,'Not calculated','Negative runoff depth rejected');

console.log('PASS: acknowledgement, scenarios, mixed land covers, engineered-drainage guard, monetary year cost input validation, itemized costs and external model-output conversion.');
