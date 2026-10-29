/* Nature Value Map — adapted top-hit monitoring record, version 1.0.0.
 * This is a field-data recording protocol inspired by BLM line-point intercept.
 * It is NOT the full BLM/AIM standardized vegetation cover protocol. */
(function (root, factory) {
  var api=factory();
  if (typeof module==='object' && module.exports) module.exports=api;
  else root.NVMFieldAssessment=api;
})(typeof globalThis!=='undefined'?globalThis:this,function () {
  'use strict';
  var VERSION='1.0.0';
  var CLASSES=[
    {key:'native',title:'Native plant first hit'},
    {key:'introduced_invasive',title:'Introduced invasive plant first hit'},
    {key:'introduced_other',title:'Other introduced plant first hit'},
    {key:'litter',title:'Litter/dead vegetation first hit'},
    {key:'rock',title:'Rock or biological soil crust first hit'},
    {key:'bare_soil',title:'Bare soil first hit'},
    {key:'unknown',title:'Unknown or unidentifiable first hit'}
  ];
  function trim(x){return String(x==null?'':x).trim();}
  function integerCount(raw){
    if(raw==null || trim(raw)==='') return null;
    var n=Number(raw);
    return Number.isSafeInteger(n)&&n>=0?n:null;
  }
  function positiveOrNull(raw){
    if(trim(raw)==='')return null;
    var n=Number(raw);
    return Number.isFinite(n)&&n>0?n:null;
  }
  function validate(input){
    var errors=[];
    var required=['site_id','plot_id','visit_date','sampling_location','sampling_design','observer_id'];
    required.forEach(function(k){if(!trim(input[k]))errors.push(k+' is required for repeatable sampling.');});
    if(trim(input.visit_date)&&!(/^\d{4}-\d{2}-\d{2}$/.test(input.visit_date))){errors.push('visit_date must be YYYY-MM-DD.');}
    else if(trim(input.visit_date)){
      var parsed=new Date(input.visit_date+'T00:00:00Z');
      if(!Number.isFinite(parsed.getTime())||parsed.toISOString().slice(0,10)!==input.visit_date)errors.push('visit_date must be a valid calendar date.');
    }
    if(trim(input.transect_length_m)!=='' && positiveOrNull(input.transect_length_m)===null)errors.push('transect_length_m must be a positive number or blank.');
    if(trim(input.point_spacing_m)!=='' && positiveOrNull(input.point_spacing_m)===null)errors.push('point_spacing_m must be a positive number or blank.');
    var counts={},total=0;
    CLASSES.forEach(function(c){
      var n=integerCount(input[c.key]);
      counts[c.key]=n;
      if(n===null)errors.push(c.key+' requires a non-negative whole-number point count (enter 0 if observed zero).');
      else total+=n;
    });
    if(total===0)errors.push('At least one first-hit observation is required.');
    if(trim(input.protocol)!=='adapted_first_hit')errors.push('Only the documented adapted first-hit sampling protocol is supported.');
    if(input.source_verified!=='yes' && input.source_verified!=='no')errors.push('Record whether plant origin/status was independently verified (yes/no).');
    return {ok:errors.length===0,errors:errors,counts:counts,total:total};
  }
  function build(input){
    var check=validate(input);
    if(!check.ok) return {ok:false,errors:check.errors,record:null};
    var counts=check.counts,total=check.total;
    var percent={};
    CLASSES.forEach(function(c){percent[c.key]=Math.round((counts[c.key]/total)*10000)/100;});
    var record={
      schema_version:VERSION,
      source_type:'user_reported_field_observation',
      method:'adapted_first_hit',
      method_warning:'Simplified single first-hit category per sampling point, not complete BLM AIM line-point intercept and not sitewide cover inference. Native-status labels may be unverified.',
      visit:{
        site_id:trim(input.site_id),plot_id:trim(input.plot_id),visit_date:input.visit_date,
        observer_id:trim(input.observer_id),sampling_location:trim(input.sampling_location),
        sampling_design:trim(input.sampling_design),
        transect_length_m:positiveOrNull(input.transect_length_m),
        point_spacing_m:positiveOrNull(input.point_spacing_m),
        restoration_stage:trim(input.restoration_stage)||'unspecified',
        weather_notes:trim(input.weather_notes)||null,
        repeat_photo_ref:trim(input.repeat_photo_ref)||null
      },
      first_hit_samples:{
        sample_size_points:total,
        counts:counts,
        observed_percent_by_first_hit:percent,
        denominator:'total recorded first-hit points, including unknown',
        interpretation:'Percentages describe sampled first-hit locations only. They are not total plant cover by canopy stratum, native richness, ecosystem health, or a parcel-wide change.'
      },
      context:{
        native_status_verified:input.source_verified==='yes',
        native_status_source:trim(input.native_status_source)||null,
        soil_map_unit:trim(input.soil_map_unit)||null,
        soil_map_source:trim(input.soil_map_source)||null,
        observed_surface_condition:trim(input.surface_condition)||'not_observed',
        soil_compaction_measurement:null,
        field_notes:trim(input.field_notes)||null,
        taxa_observed_unverified:trim(input.taxa_observed)||null
      },
      outputs_not_estimated:{
        sitewide_native_cover_pct:null,
        biodiversity_integrity_score:null,
        quantified_ecosystem_service_usd:null,
        annual_runoff_reduction_gallons:null,
        carbon_flux_tco2e_yr:null,
        ecosystem_restoration_gain:null
      }
    };
    return {ok:true,errors:[],record:record};
  }
  function csvEscape(v){
    if(v===null||v===undefined)return '';
    var s=String(v);
    return /[,"\n\r]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;
  }
  function toCSV(record){
    var data={
      schema_version:record.schema_version,
      site_id:record.visit.site_id,plot_id:record.visit.plot_id,visit_date:record.visit.visit_date,
      observer_id:record.visit.observer_id,protocol:record.method,
      sampling_location:record.visit.sampling_location,sampling_design:record.visit.sampling_design,
      transect_length_m:record.visit.transect_length_m,point_spacing_m:record.visit.point_spacing_m,
      restoration_stage:record.visit.restoration_stage,sample_size_points:record.first_hit_samples.sample_size_points
    };
    CLASSES.forEach(function(c){data['count_'+c.key]=record.first_hit_samples.counts[c.key];});
    CLASSES.forEach(function(c){data['pct_'+c.key]=record.first_hit_samples.observed_percent_by_first_hit[c.key];});
    Object.assign(data,{
      native_status_verified:record.context.native_status_verified,
      native_status_source:record.context.native_status_source,
      soil_map_unit:record.context.soil_map_unit,soil_map_source:record.context.soil_map_source,
      surface_condition:record.context.observed_surface_condition,
      taxa_observed:record.context.taxa_observed_unverified,
      weather_notes:record.visit.weather_notes,repeat_photo_ref:record.visit.repeat_photo_ref,
      field_notes:record.context.field_notes
    });
    var keys=Object.keys(data);
    return keys.map(csvEscape).join(',')+'\r\n'+keys.map(function(k){return csvEscape(data[k]);}).join(',')+'\r\n';
  }
  return {VERSION:VERSION,CLASSES:CLASSES,validate:validate,build:build,toCSV:toCSV};
});
