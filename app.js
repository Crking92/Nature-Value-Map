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

  // Direct transcriptions of AECOM 2025 Table 1 (report p.12) and Table 3 (p.22).
  // A dash in the source is not a zero benefit; only listed, monetized categories appear here.
  var SERVICE_COMPONENTS = {
    native_prairie: [
      {label:'Climate regulation',value:236,count:2,origin:'Conservation Fund (2022); Liu et al. (2022)'},
      {label:'Flood and storm hazard reduction',value:363,count:1,origin:'Conservation Fund (2022)'},
      {label:'Food provisioning',value:129,count:1,origin:'Liu et al. (2022)'},
      {label:'Habitat',value:286,count:1,origin:'Liu et al. (2022)'},
      {label:'Recreation / tourism',value:95,count:1,origin:'Liu et al. (2022)'},
      {label:'Water supply',value:190,count:2,origin:'Conservation Fund (2022); Liu et al. (2022)'},
      {label:'Water quality',value:330,count:1,origin:'Conservation Fund (2022)'},
      {label:'Soil quality',value:312,count:1,origin:'Liu et al. (2022)'}
    ],
    wetland: [
      {label:'Aesthetic value',value:921},
      {label:'Climate regulation',value:289},
      {label:'Flood and storm hazard reduction',value:4349},
      {label:'Food provisioning',value:1988},
      {label:'Habitat',value:3792},
      {label:'Recreation / tourism',value:1271},
      {label:'Water supply',value:5937},
      {label:'Water quality',value:401}
    ],
    urban_green_open_space: [
      {label:'Aesthetic value',value:9820},
      {label:'Climate regulation',value:2891},
      {label:'Flood and storm hazard reduction',value:104},
      {label:'Habitat',value:5872},
      {label:'Recreation / tourism',value:1305}
    ]
  };
  // Fail closed if source-table subtotals and saved benchmark ever become inconsistent.
  Object.keys(SERVICE_COMPONENTS).forEach(function(id){
    var total=SERVICE_COMPONENTS[id].reduce(function(s,c){return s+c.value;},0);
    if(total!==CLASSES.find(function(c){return c.id===id;}).value){
      throw new Error('Evidence table and valuation mismatch: '+id);
    }
  });
  function buildServiceBreakdown(){
    var holder=el('serviceBreakdown');holder.textContent='';
    var note=el('serviceFootnote');
    if(mixed){
      holder.textContent='Select a single land-cover category to inspect its original study components. Mixed-area totals are sums of separate categories and should not be interpreted as one study.';
      note.textContent='';return;
    }
    var rows=SERVICE_COMPONENTS[selected];
    if(!rows){
      holder.textContent=cls(selected).eligible?
        'The original national fallback is not itemized in this release. See the FEMA source before relying on this broad category.':
        'No general land-cover economic breakdown is established for this category.';
      note.textContent='';return;
    }
    var total=cls(selected).value;
    var container=document.createElement('div');container.className='service-rows';
    rows.slice().sort(function(a,b){return b.value-a.value;}).forEach(function(d){
      var row=document.createElement('div');row.className='service-row';
      var name=document.createElement('div');name.className='service-name';name.textContent=d.label;
      var track=document.createElement('div');track.className='service-track';
      var fill=document.createElement('span');fill.className='service-fill';fill.style.width=(d.value/total*100)+'%';track.appendChild(fill);
      var moneyBox=document.createElement('strong');moneyBox.className='service-dollar';moneyBox.textContent=money(d.value);
      row.append(name,track,moneyBox);
      if(d.count){
        var meta=document.createElement('small');meta.className='service-origin';meta.textContent=d.count+' contributing '+(d.count===1?'study':'studies')+': '+d.origin;row.appendChild(meta);
      }
      container.appendChild(row);
    });
    var summary=document.createElement('p');summary.className='service-summary';summary.textContent='Published component sum: '+money(total)+' per acre per year (2021 USD).';
    holder.append(container,summary);
    var source=document.createElement('a');source.href=STUDIES.gift.url;source.target='_blank';source.rel='noopener noreferrer';
    source.textContent=selected==='native_prairie'?'Texas A&M/AECOM Table 3 and Appendix B':'Texas A&M/AECOM Table 1 and Appendix B';
    note.textContent='Only the monetized services listed in the report are itemized. Unvalued categories (such as pollination in the prairie synthesis) are not zero ecological benefits. ';
    note.appendChild(source);
  }

  var selected = 'native_prairie';
  var showAllLandscapes = false;
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
  var map=L.map('map',{scrollWheelZoom:false}).setView([29.9891,-97.8772],12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:20,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
  var drawn=new L.FeatureGroup();map.addLayer(drawn);
  map.addControl(new L.Control.Draw({draw:{polygon:{allowIntersection:false,showArea:true},rectangle:true,polyline:false,circle:false,marker:false,circlemarker:false},edit:{featureGroup:drawn}}));
  map.on(L.Draw.Event.CREATED,function(e){drawn.clearLayers();layer=e.layer;drawn.addLayer(layer);feature=layer.toGeoJSON();update();});
  map.on(L.Draw.Event.EDITED,function(e){e.layers.eachLayer(function(x){layer=x;feature=x.toGeoJSON();});update();});
  map.on(L.Draw.Event.DELETED,function(){feature=null;layer=null;update();});
  el('clearBtn').addEventListener('click',function(){drawn.clearLayers();feature=null;layer=null;update();});
  // The map is optional and initially collapsed. Fix Leaflet's size only after opening it.
  el('mapDetails').addEventListener('toggle',function(e){
    if(e.target.open){setTimeout(function(){map.invalidateSize();},100);}
  });
  // A manual acreage edit overrides and clears any previously drawn polygon.
  el('manualAcres').addEventListener('input',function(){
    if(feature){drawn.clearLayers();feature=null;layer=null;}
  });
  Array.from(document.querySelectorAll('[data-acres]')).forEach(function(button){
    button.addEventListener('click',function(){
      drawn.clearLayers();feature=null;layer=null;
      el('manualAcres').value=button.getAttribute('data-acres');
      update();
    });
  });
  el('moreLandscapes').addEventListener('click',function(){
    showAllLandscapes=!showAllLandscapes;
    el('moreLandscapes').setAttribute('aria-expanded',String(showAllLandscapes));
    el('moreLandscapes').textContent=showAllLandscapes?'Show fewer landscapes −':'Show more landscapes +';
    buildCards();
  });
  el('shareScenario').addEventListener('click',function(){
    var acres=area(),before=number('mowsCurrent'),after=number('mowsProposed');
    var diff=el('mowDiffOut').textContent;
    if(acres===null||before===null||after===null||diff==='Check inputs'){
      set('shareStatus','Please enter valid inputs first.');return;
    }
    var basis=el('useItemizedMowing').checked?
      'Itemized mowing price supplied by the visitor':
      'Visitor-selected mowing price per acre per cut: '+el('mowCost').value+' USD';
    var message=[
      'NATURE VALUE MAP — EXPLORATORY SCENARIO (not verified actual savings)',
      'Area: '+acres+' acres',
      'Current mowing: '+before+' cycles/year',
      'Alternative mowing: '+after+' cycles/year',
      'Annual mowing-only difference: '+diff,
      basis,
      'Landscape research selected: '+cls(selected).label+' (not field-verified)',
      'This excludes planting, habitat management, and other restoration costs. No added ecological-dollar benefit or cash revenue is claimed.',
      'City of Kyle reported mowing price range: $40–$70 per acre per cut in a February 18, 2025 council presentation. This is not an audited average.',
      'Methods: https://crking92.github.io/Nature-Value-Map/'
    ].join('\n');
    if(typeof navigator==='undefined'||!navigator.clipboard||!navigator.clipboard.writeText){
      set('shareStatus','Copy is unavailable in this browser.');return;
    }
    navigator.clipboard.writeText(message).then(function(){
      set('shareStatus','Copied, including assumptions and limitations.');
    }).catch(function(){set('shareStatus','Copy permission was blocked.');});
  });
  function area(){if(feature){var a=turf.area(feature)*0.00024710538146717;return Number.isFinite(a)&&a>=0?a:null;}return number('manualAcres');}
  function buildCards(){var holder=el('landCards');holder.textContent='';CLASSES.forEach(function(c){
    var b=document.createElement('button');b.type='button';b.className='land-card'+(selected===c.id?' selected':'');
    b.setAttribute('aria-pressed',String(selected===c.id));
    // Present only the four familiar choices at first; all options still exist.
    var featured={native_prairie:true,turf_estimate:true,forest:true,wetland:true};
    b.hidden=!showAllLandscapes&&!featured[c.id]&&selected!==c.id;
    var priority={turf_estimate:0,native_prairie:1,forest:2,wetland:3};
    b.style.order=String(Object.hasOwn(priority,c.id)?priority[c.id]:100+CLASSES.indexOf(c));
    var icon=document.createElement('span');icon.className='icon';icon.textContent=c.icon;
    var title=document.createElement('strong');title.textContent=c.label;
    var desc=document.createElement('small');desc.textContent=c.id==='wetland'?'Verified habitat only':c.value===null?'No trustworthy dollar default':(c.eligible?'Research reference available':'Specialized study only');
    b.append(icon,title,desc);b.addEventListener('click',function(){selected=c.id;el('referenceAcknowledged').checked=false;buildCards();update();});holder.appendChild(b);
  });}
  function buildMix(){var wrap=el('mixRows');wrap.textContent='';
    [{pct:'',id:'forest'},{pct:'',id:'native_prairie'},{pct:'',id:'rural_green_open_space'}].forEach(function(r){
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
      if(el('siteSetting').value==='engineered' && (selected==='wetland'||selected==='riparian_forest')){
        return {value:null,rate:null,message:'This user-described engineered drainage area has not been verified as natural wetland or riparian forest. The selected benchmark is withheld. Reclassify the actual habitat or obtain a site assessment.'};
      }
      if(!el('referenceAcknowledged').checked){return {value:null,rate:null,requiresAcknowledgement:true,message:'The per-acre research reference is available below. Confirm that you understand its limitations before showing the area-scaled illustration.'};}
      return {value:acres*c.value,rate:c.value,message:c.warning};
    }
    var pctSum=0,total=0,invalid='';
    Array.from(document.querySelectorAll('.mix-row')).forEach(function(r){
      var input=r.querySelector('.mix-pct');var raw=input.value.trim();var pct=raw===''?NaN:Number(raw);
      var c=cls(r.querySelector('.mix-class').value);
      if(!Number.isFinite(pct)||pct<0||pct>100){invalid='All area percentages must be between 0 and 100.';return;}
      pctSum+=pct;
      if(pct>0&&(!c.eligible||c.year!==2021||c.value===null)){invalid='A selected category has no compatible 2021 USD reference. Remove it or use a case-study comparison.';return;}
      if(pct>0&&el('siteSetting').value==='engineered'&&(c.id==='wetland'||c.id==='riparian_forest')){invalid='Engineered drainage has not been verified as natural wetland or riparian forest. Its benchmark is withheld even in a mixed-cover calculation.';return;}
      if(c.value!==null){total+=acres*pct/100*c.value;}
    });
    if(!invalid&&Math.abs(pctSum-100)>0.0001){invalid='Land-cover areas total '+pctSum.toFixed(1)+'%; they must add up to exactly 100%.';}
    if(invalid){return {value:null,rate:null,message:invalid};}
    if(!el('referenceAcknowledged').checked){return {value:null,rate:null,requiresAcknowledgement:true,message:'Confirm reference limitations before scaling the published study benchmarks to this user-defined mixture.'};}
    return {value:total,rate:acres>0?total/acres:0,message:'Mixed-cover reference assumes distinct, non-overlapping areas. Broad categories must not be counted alongside more specific categories over the same land.'};
  }

  function updateSiteFit() {
    var setting=el('siteSetting').value;
    var kind=mixed?'mixed':selected;
    var msg='';
    if(setting==='unknown') msg='Site setting not independently checked. The published dollar figure is a planning benchmark, not a site-verified estimate.';
    else if(kind==='wetland' || kind==='riparian_forest'){
      msg=setting==='wetland' && kind==='wetland'?
        'You reported a field-confirmed inland wetland. The statewide wetland synthesis includes other wetland types and is still not validated for this parcel.':
        setting==='riparian' && kind==='riparian_forest'?
        'You reported a riparian area. The published national riparian value is still not a measurement of this stream corridor.':
        'Potential mismatch: this class requires verified wetland or riparian habitat, not merely nearby water or an engineered drainage structure.';
    } else if(setting==='engineered') {
      msg='Engineered drainage swales and detention basins are not automatically wetlands, native prairies, or natural floodplains. Require observed vegetation, soils and hydrology; no source-derived local $/acre is established.';
    } else if(kind==='native_prairie') {
      msg=setting==='edwards'?
        'Edwards Plateau soils and vegetation can differ substantially from the prairie source studies. This remains a regional reference only.':
        setting==='blackland'?
        'Blackland Prairie is a plausible regional comparison if actual native grassland cover is present, but soils, maturity and ecological function are not measured by this tool.':
        'The selected site type alone does not establish the presence or maturity of native prairie vegetation.';
    } else if(kind==='turf_estimate'||kind==='non_native_grass'){
      msg='No general Hays County ecosystem-service valuation is available for this selection. Mowing-cost scenarios can still be calculated separately.';
    } else {
      msg='Even with the site setting selected, the published land-cover category is a conditional state or national reference, not a measured Hays County parcel value.';
    }
    set('siteFitOut',msg+' Site setting was entered by the user; it is not verified against soil or vegetation maps.');
  }

  function itemizedMowingRate(acres){
    if(!el('useItemizedMowing').checked){
      set('itemizedMowOut','Itemized mowing is not enabled; the editable per-acre price above is used.');
      return number('mowCost');
    }
    var inputs=['laborHours','laborRate','equipHours','equipRate','fuelCost','otherMowCost'];
    var values=inputs.map(number);
    if(acres===null||acres<=0||values.some(function(n){return n===null;})){
      set('itemizedMowOut','Enter a positive acreage and all six valid non-negative inputs. No mowing result is generated with incomplete itemization.');
      return null;
    }
    var perCut=values[0]*values[1]+values[2]*values[3]+values[4]+values[5];
    if(!Number.isFinite(perCut)||perCut<=0){
      set('itemizedMowOut','Itemized cost must be positive and finite; confirm labor, equipment and supplies are not counted twice.');
      return null;
    }
    var perAcre=perCut/acres;
    set('itemizedMowOut','Your itemized total is '+money(perCut)+' for one cut of the selected area, or '+money(perAcre)+'/acre/cut. User-entered estimate, not an audited City of Kyle cost.');
    return Number.isFinite(perAcre)?perAcre:null;
  }

  function updateRunoff(acres){
    var before=number('runoffBefore'),after=number('runoffAfter');
    var model=el('runoffModel').value,src=el('runoffSource').value.trim();
    var comparable=el('runoffComparable').checked;
    var fail=function(msg){set('runoffDepthOut','Not calculated');set('runoffVolumeOut','Not calculated');set('runoffStatus',msg);};
    if(acres===null||acres<=0){fail('A positive selected area is required.');return;}
    if(!model||!src||before===null||after===null||!comparable){
      fail('Enter both externally modeled annual runoff depths, the model/version/reference and confirm comparable scenarios. No runoff estimate is invented.');return;
    }
    if(model==='swc'&&acres>=12){
      fail('EPA describes its Stormwater Calculator hydrology analysis for sites under 12 acres. Use appropriately designed SWMM or another documented hydrologic model for this larger area.');return;
    }
    var inches=before-after;
    var gallons=inches*acres*27154;
    if(!Number.isFinite(gallons)){fail('Model inputs produce a non-finite result.');return;}
    set('runoffDepthOut',(inches>=0?'Reduction: ':'Increase: ')+Math.abs(inches).toLocaleString('en-US',{maximumFractionDigits:3})+' in/year');
    set('runoffVolumeOut',(inches>=0?'Reduction: ':'Increase: ')+Math.round(Math.abs(gallons)).toLocaleString('en-US')+' gallons/year');
    set('runoffStatus','User-reported '+(model==='swc'?'EPA Stormwater Calculator':'external hydrologic model')+' outputs; source: '+src+'. The site only performs subtraction and an acre-inch-to-gallon conversion (1 acre-inch ≈ 27,154 gallons). Inputs and hydrologic accuracy have NOT been independently validated. No flood-damage or ecosystem-dollar value is calculated.');
  }

  function finances(acres){
    var rate=itemizedMowingRate(acres),before=number('mowsCurrent'),after=number('mowsProposed');
    var install=number('installCost'),care=number('careCost');
    if(acres===null||rate===null||before===null||after===null){['currentMowOut','proposedMowOut','mowDiffOut'].forEach(function(id){set(id,'Check inputs');});set('tenYearOut','Check inputs');set('mowRangeOut','Enter valid non-negative acreage, mowing frequency and complete price information.');set('financeNote','Financial calculation withheld: invalid or missing mowing cost inputs.');return;}
    var current=acres*rate*before,proposed=acres*rate*after,diff=current-proposed;
    var rangeLow=acres*(before-after)*40, rangeHigh=acres*(before-after)*70;
    set('mowRangeOut','For context only, Kyle’s reported $40–$70/acre/cut rate implies '+money(Math.min(rangeLow,rangeHigh))+' to '+money(Math.max(rangeLow,rangeHigh))+' in mowing-only annual difference at these frequencies. That external range is not a confidence interval on the user-entered estimate.');
    set('currentMowOut',money(current));set('proposedMowOut',money(proposed));set('mowDiffOut',money(diff));
    if(install===null||care===null){set('tenYearOut','Needs costs');
      set('financeNote','Enter installation and annual restoration management costs (enter 0 only if documented) to calculate the undiscounted 10-year difference. No total savings claim is made yet.');
      return;}
    var net=10*(diff-acres*care)-acres*install;
    set('tenYearOut',money(net));
    var basis=el('costBasis').value,source=el('costReference').value.trim();
    var basisText=basis==='invoice'?'User reports an invoice/work order':basis==='quote'?'User reports a quote/bid':'Planning assumptions (not independently verified)';
    set('financeNote','Ten-year modeled difference after user-entered restoration costs (undiscounted). '+basisText+(source?'; source note: '+source:'')+'. Positive values mean modeled savings, not a verified project return. Excludes unentered costs and inflation.');
  }
  function update(){
    var acres=area();var c=cls(selected);var ref=calculateReference(acres);
    var isReference=ref.value!==null;
    set('areaOut',acres===null?'Check acreage':acres.toLocaleString('en-US',{maximumFractionDigits:2})+(acres===1?' acre':' acres'));
    set('currentCutsLabel',el('mowsCurrent').value);
    set('proposedCutsLabel',el('mowsProposed').value);
    set('areaHelp',feature?'Map drawing active; '+(acres===null?'check geometry':acres.toLocaleString('en-US',{maximumFractionDigits:2})+' acres')+' measured by drawn polygon. Choose a size or type acreage to clear it.':'The map is optional. Draw a polygon or rectangle for a geometry-based acreage.');
    set('rateOut',isReference?money(ref.rate)+'/ac/yr':'Not established');
    set('grossOut',isReference?money(ref.value):(ref.requiresAcknowledgement?'Confirm reference use':'Not established'));
    set('heroValue',isReference?money(ref.value):'—');
    set('heroNote',isReference?'2021 USD · Published benchmark, not incremental restoration value':(ref.requiresAcknowledgement?'Published benchmark — acknowledgement required':'No supported scaled reference for this selection'));
    set('statusOut',isReference?'Illustrative study transfer':(ref.requiresAcknowledgement?'Study reference only':'No eligible reference'));
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
    updateSiteFit();
    buildServiceBreakdown();
    finances(acres);
    updateRunoff(acres);
  }
  function buildSources(){var list=el('sourceList');list.textContent='';Object.keys(STUDIES).forEach(function(k){var li=document.createElement('li');link(li,STUDIES[k]);list.appendChild(li);});}
  document.querySelector('.advanced').addEventListener('toggle',function(e){mixed=e.target.open;el('referenceAcknowledged').checked=false;update();});
  document.addEventListener('input',update);document.addEventListener('change',update);
  buildCards();buildMix();buildSources();update();
})();
