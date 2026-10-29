(function () {
  'use strict';
  var core=window.NVMFieldAssessment;
  if(!core)throw new Error('Field assessment core did not load.');
  var form=document.getElementById('fieldForm');
  var report=document.getElementById('fieldReport');
  var errors=document.getElementById('fieldErrors');
  var check=document.getElementById('checkRecord');
  var btnJSON=document.getElementById('downloadJSON');
  var btnCSV=document.getElementById('downloadCSV');
  var validated=null;

  function inputData(){
    var data=Object.fromEntries(new FormData(form).entries());
    // Missing form inputs are unknown, not imputed zero.
    return data;
  }
  function disableExport(){
    validated=null;
    btnJSON.disabled=true;btnCSV.disabled=true;
  }
  function addText(parent,tag,value,cssClass){
    var el=document.createElement(tag);
    if(cssClass)el.className=cssClass;
    el.textContent=value;
    parent.appendChild(el);
    return el;
  }
  function refresh(){
    disableExport();
    errors.textContent='';
    report.replaceChildren();
    var result=core.build(inputData());
    if(!result.ok){
      addText(report,'p','Data not yet validated. Review the missing or inconsistent fields.');
      errors.textContent=result.errors.map(function(x){return '• '+x;}).join('\n');
      return;
    }
    validated=result.record;
    btnJSON.disabled=false;btnCSV.disabled=false;
    var count=result.record.first_hit_samples.sample_size_points;
    addText(report,'p','Valid first-hit record: '+count+' sampled points at '+validated.visit.site_id+' / '+validated.visit.plot_id+' on '+validated.visit.visit_date+'.');
    var grid=addText(report,'div','','metrics');
    core.CLASSES.forEach(function(c){
      var card=addText(grid,'div','','metric');
      addText(card,'strong',String(validated.first_hit_samples.observed_percent_by_first_hit[c.key])+'%');
      addText(card,'small',c.title+': '+validated.first_hit_samples.counts[c.key]+' of '+count+' points');
    });
    addText(report,'p','These percentages apply only to the sampled first-hit points. They are not full-site cover, a quality score, or proof of ecological improvement. Classification verification: '+(validated.context.native_status_verified?'reported as independently checked':'preliminary / unverified')+'.','hint');
  }
  function exportFile(content,mime,ext){
    if(!validated)return;
    var safe=function(s){return String(s).replace(/[^A-Za-z0-9_-]/g,'_').slice(0,45);};
    var name=['nvm-field',safe(validated.visit.site_id),safe(validated.visit.plot_id),validated.visit.visit_date].join('_')+'.'+ext;
    var blob=new Blob([content],{type:mime});
    var url=URL.createObjectURL(blob);
    var a=document.createElement('a');
    a.href=url;a.download=name;
    document.body.appendChild(a);
    a.click();a.remove();
    setTimeout(function(){URL.revokeObjectURL(url);},1000);
  }
  form.addEventListener('input',function(){disableExport();});
  form.addEventListener('change',function(){disableExport();});
  form.addEventListener('submit',function(e){e.preventDefault();refresh();});
  check.addEventListener('click',refresh);
  btnJSON.addEventListener('click',function(){if(validated)exportFile(JSON.stringify(validated,null,2)+'\n','application/json;charset=utf-8','json');});
  btnCSV.addEventListener('click',function(){if(validated)exportFile(core.toCSV(validated),'text/csv;charset=utf-8','csv');});
})();
