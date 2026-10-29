(function () {
  'use strict';
  // Source figures are references, not property-level predictions. Updated 2026-10-29.
  var STUDIES = {
    gift: {label:'Texas A&M AgriLife / AECOM, Ecosystem Service Values for Texas (2025); 2021 USD', url:'https://agrilife.org/gift/files/2025/08/Ecosystem-Service-Values-for-Texas_FINAL-August-2025.pdf'},
    fema: {label:'FEMA (2022), national benefit-transfer table reproduced in AECOM (2025); 2021 USD', url:'https://agrilife.org/gift/files/2025/08/Ecosystem-Service-Values-for-Texas_FINAL-August-2025.pdf'},
    eco: {label:'EcoMetrics (2024), La Salle County right-of-way restoration; 2023 USD', url:'https://nri.tamu.edu/media/3986/ecometrics-analysis.pdf'}
  };
  var CLASSES = [
    {id:'native_prairie',label:'Prairie / native meadow',icon:'🌼',value:1941,year:2021,source:'gift',eligible:true,warning:'Texas literature-based grassland/prairie benchmark. Not a measurement or guarantee of benefits for newly planted sites.'},
    {id:'wetland',label:'Wetland',icon:'💧',value:18948,year:2021,source:'gift',eligible:true,warning:'Use only for sites actually functioning as wetlands. Do not label every detention pond edge a wetland.'},
    {id:'forest',label:'Upland woodland',icon:'🌳',value:12589,year:2021,source:'fema',eligible:true,warning:'National fallback reference with components including existence values; local applicability is uncertain.'},
    {id:'riparian_forest',label:'Creekside forest',icon:'🏞️',value:37199,year:2021,source:'fema',eligible:true,warning:'National riparian-forest fallback; not appropriate for a narrow strip of trees without review.'},
    {id:'non_native_grass',label:'Non-native grass restoration',icon:'🌾',value:930,year:2023,source:'eco',eligible:false,warning:'La Salle County oil-and-gas right-of-way case study only. Not a generic lawn or Hays County grassland valuation.'},
    {id:'turf_estimate',label:'Regularly mowed turf',icon:'🏟️',value:null,year:null,source:null,eligible:false,warning:'No verified local annual ecosystem-service dollar value is assigned. Lawns can still provide benefits; this tool will not invent a value.'},
    {id:'rural_green_open_space',label:'Other rural green space',icon:'🟩',value:10632,year:2021,source:'fema',eligible:true,warning:'Broad national fallback class; choose a more specific land-cover class when possible.'},
    {id:'urban_green_open_space',label:'Urban green open space',icon:'🏙️',value:19992,year:2021,source:'gift',eligible:true,warning:'Broad urban-green category has high overlap risk; do not use as a proxy for turf or native prairie.'}
  ];
  var selected = 'native_prairie';
  var mixed = false;
  var feature = null;
  var layer = null;
  var fmt = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
  function el(id){return document.getElementById(id);}
  function money(value){return value === null || !Number.isFinite(value) ? 'Not established' : fmt.format(value);}
  function number(id){var x=Number(el(id).value);return el(id).value.trim()==='' || !Number.isFinite(x) || x<0 ? null : x;}
  function cls(id){return CLASSES.find(function(c){return c.id===id;});}
  function set(id,value){el(id).textContent=value;}
  function link(container,info){while(container.firstChild){container.removeChild(container.firstChild);}
    if(!info){return;}var a=document.createElement('a');a.href=info.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=info.label;container.appendChild(a);}
  var map=L.map('map',{scrollWheelZoom:true}).setView([29.9891,-97.8772],12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:20,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
  var drawn=new L.FeatureGroup();map.addLayer(drawn);
  map.addControl(new L.Control.Draw({draw:{polygon:{allowIntersection:false,showArea:true},rectangle:true,polyline:false,circle:false,marker:false,circlemarker:false},edit:{featureGroup:drawn}}));
  map.on(L.Draw.Event.CREATED,function(e){drawn.clearLayers();layer=e.layer;drawn.addLayer(layer);feature=layer.toGeoJSON();update();});
  map.on(L.Draw.Event.EDITED,function(e){e.layers.eachLayer(function(x){layer=x;feature=x.toGeoJSON();});update();});
  map.on(L.Draw.Event.DELETED,function(){feature=null;layer=null;update();});
  el('clearBtn').addEventListener('click',function(){drawn.clearLayers();feature=null;layer=null;update();});
  function area(){if(feature){return turf.area(feature)*0.00024710538146717;}return number('manualAcres');}
  function buildCards(){var holder=el('landCards');holder.textContent='';CLASSES.forEach(function(c){
    var b=document.createElement('button');b.type='button';b.className='land-card'+(selected===c.id?' selected':'');
    b.setAttribute('aria-pressed',String(selected===c.id));
    var icon=document.createElement('span');icon.className='icon';icon.textContent=c.icon;
    var title=document.createElement('strong');title.textContent=c.label;
    var desc=document.createElement('small');desc.textContent=c.value===null?'No verified dollar default':(c.eligible?'Published reference':'Case study only');
    b.append(icon,title,desc);b.addEventListener('click',function(){selected=c.id;buildCards();update();});holder.appendChild(b);
  });}
  function buildMix(){var wrap=el('mixRows');wrap.textContent='';
    [{pct:60,id:'forest'},{pct:20,id:'native_prairie'},{pct:20,id:'rural_green_open_space'}].forEach(function(r){
      var row=document.createElement('div');row.className='mix-row';
      var p=document.createElement('input');p.className='mix-pct';p.type='number';p.min='0';p.max='100';p.step='1';p.value=String(r.pct);p.setAttribute('aria-label','Percentage of total area');
      var select=document.createElement('select');select.className='mix-class';select.setAttribute('aria-label','Land-cover category');
      CLASSES.forEach(function(c){var o=document.createElement('option');o.value=c.id;o.textContent=c.label;select.appendChild(o);});select.value=r.id;
      var yr=document.createElement('span');yr.className='small';yr.textContent='2021 USD only';row.append(p,select,yr);wrap.appendChild(row);
    });
  }
  function calculateReference(acres){
    if(acres===null){return {value:null,rate:null,message:'Enter a valid non-negative area.'};}
    if(!mixed){var c=cls(selected);if(!c.eligible || c.value===null){return {value:null,rate:null,message:c.warning};}
      return {value:acres*c.value,rate:c.value,message:c.warning};
    }
    var pctSum=0,total=0,invalid='';
    Array.from(document.querySelectorAll('.mix-row')).forEach(function(r){
      var input=r.querySelector('.mix-pct');var raw=input.value.trim();var pct=raw===''?NaN:Number(raw);
      var c=cls(r.querySelector('.mix-class').value);
      if(!Number.isFinite(pct)||pct<0||pct>100){invalid='All area percentages must be between 0 and 100.';return;}
      pctSum+=pct;
      if(pct>0&&(!c.eligible||c.year!==2021||c.value===null)){invalid='A selected category has no compatible 2021 USD reference. Remove it or use a case-study comparison.';return;}
      if(c.value!==null){total+=acres*pct/100*c.value;}
    });
    if(!invalid&&Math.abs(pctSum-100)>0.0001){invalid='Land-cover areas total '+pctSum.toFixed(1)+'%; they must add up to exactly 100%.';}
    if(invalid){return {value:null,rate:null,message:invalid};}
    return {value:total,rate:acres>0?total/acres:0,message:'Mixed-cover reference assumes distinct, non-overlapping areas. Broad categories must not be counted alongside more specific categories over the same land.'};
  }
  function finances(acres){
    var rate=number('mowCost'),before=number('mowsCurrent'),after=number('mowsProposed');
    var install=number('installCost'),care=number('careCost');
    if(acres===null||rate===null||before===null||after===null){['currentMowOut','proposedMowOut','mowDiffOut'].forEach(function(id){set(id,'Check inputs');});set('tenYearOut','Check inputs');return;}
    var current=acres*rate*before,proposed=acres*rate*after,diff=current-proposed;
    set('currentMowOut',money(current));set('proposedMowOut',money(proposed));set('mowDiffOut',money(diff));
    if(install===null||care===null){set('tenYearOut','Needs costs');
      set('financeNote','Enter installation and annual restoration management costs (enter 0 only if documented) to calculate the undiscounted 10-year difference. No total savings claim is made yet.');
      return;}
    var net=10*(diff-acres*care)-acres*install;
    set('tenYearOut',money(net));
    set('financeNote','Ten-year modeled difference after user-entered restoration costs (undiscounted). Positive values mean modeled savings. Does not include other unentered costs or site-specific inflation.');
  }
  function update(){
    var acres=area();var c=cls(selected);var ref=calculateReference(acres);
    var isReference=ref.value!==null;
    set('areaOut',acres===null?'Check acreage':acres.toLocaleString('en-US',{maximumFractionDigits:2})+' acres');
    set('rateOut',isReference?money(ref.rate)+'/ac/yr':'Not established');
    set('grossOut',isReference?money(ref.value):'Not established');
    set('heroValue',isReference?money(ref.value):'—');
    set('heroNote',isReference?'2021 USD · Published reference, not measured at this site':'No defensible estimate for this selection');
    set('statusOut',isReference?'Study benchmark':'No default');
    set('plainAnswer',ref.message);
    var src=mixed?null:STUDIES[c.source];var note=el('valueNote');note.textContent='';
    if(mixed){note.textContent='Mixed-cover calculation uses only compatible 2021 USD reference categories. Every zone must be distinct.';}
    else {
      var head=document.createElement('strong');head.textContent=c.value===null?'No ecosystem-dollar value established.':'Source figure: '+money(c.value)+'/acre/year ('+c.year+' USD).';
      var p=document.createElement('p');p.textContent=c.warning;note.append(head,p);
      if(src){link(el('sourceOut'),src);}else{set('sourceOut','No general ecosystem-dollar source accepted for this category.');}
    }
    if(mixed){set('sourceOut','Mixed-cover references: see the list of original sources below.');}
    set('mixError',mixed?ref.message:'');
    var count=document.querySelectorAll('.habitat-check:checked').length;
    set('habitatOut',count+' of 4 observations selected. These notes do not change monetary estimates; this is not a validated ecological condition score.');
    finances(acres);
  }
  function buildSources(){var list=el('sourceList');list.textContent='';Object.keys(STUDIES).forEach(function(k){var li=document.createElement('li');link(li,STUDIES[k]);list.appendChild(li);});}
  document.querySelector('.advanced').addEventListener('toggle',function(e){mixed=e.target.open;update();});
  document.addEventListener('input',update);document.addEventListener('change',update);
  buildCards();buildMix();buildSources();update();
})();