// Reproducible first-hit field record checks. Run: node tests/verify-field-assessment.cjs
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const c=require('../field-assessment-core.js');
const html=fs.readFileSync(path.join(__dirname,'..','field-assessment.html'),'utf8');
const js=fs.readFileSync(path.join(__dirname,'..','field-assessment.js'),'utf8');
const index=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const workflow=fs.readFileSync(path.join(__dirname,'..','.github/workflows/verify-evidence.yml'),'utf8');
const defaultInput={
 site_id:'WATE-LMU1',plot_id:'TRANSECT-A',visit_date:'2026-10-29',observer_id:'CREW2',
 sampling_location:'permanent stake A at park boundary',
 sampling_design:'fixed transect along N-S tape; use every 1 m at same season',
 protocol:'adapted_first_hit',restoration_stage:'follow_up',
 transect_length_m:'20',point_spacing_m:'1',
 native:'12',introduced_invasive:'3',introduced_other:'0',
 litter:'3',rock:'1',bare_soil:'1',unknown:'0',
 source_verified:'no',native_status_source:'',soil_map_unit:'',soil_map_source:'',
 taxa_observed:'Schizachyrium scoparium? (unconfirmed)',field_notes:'Some rills, recently treated',
 surface_condition:'dry',repeat_photo_ref:'IMG_1051.jpg',weather_notes:'light wind'
};
function clone(overrides){return Object.assign({},defaultInput,overrides||{});}
function fail(input,substring){
 const check=c.build(input);
 assert.equal(check.ok,false,'Expected invalid field record');
 assert.equal(check.record,null);
 assert.ok(check.errors.some(e=>e.includes(substring)),'Expected error mentioning '+substring+'; received '+check.errors.join('; '));
}
assert.equal(c.VERSION,'1.0.0');
assert.equal(c.CLASSES.length,7,'The mutually exclusive first-hit categories must be reviewed before change');
const good=c.build(clone());
assert.equal(good.ok,true,good.errors.join('; '));
assert.equal(good.record.first_hit_samples.sample_size_points,20);
assert.equal(good.record.first_hit_samples.counts.native,12);
assert.equal(good.record.first_hit_samples.observed_percent_by_first_hit.native,60);
assert.equal(good.record.first_hit_samples.observed_percent_by_first_hit.introduced_invasive,15);
assert.equal(good.record.first_hit_samples.observed_percent_by_first_hit.bare_soil,5);
assert.equal(Object.values(good.record.first_hit_samples.observed_percent_by_first_hit).reduce((a,b)=>a+b,0),100);
assert.equal(good.record.context.native_status_verified,false);
assert.equal(good.record.context.soil_compaction_measurement,null);
assert.equal(good.record.outputs_not_estimated.sitewide_native_cover_pct,null);
assert.equal(good.record.outputs_not_estimated.biodiversity_integrity_score,null);
assert.equal(good.record.outputs_not_estimated.carbon_flux_tco2e_yr,null);
assert.equal(good.record.outputs_not_estimated.annual_runoff_reduction_gallons,null);
assert.match(good.record.method_warning,/not complete BLM AIM/);
const csv=c.toCSV(good.record);
assert.match(csv,/WATE-LMU1/);assert.match(csv,/sample_size_points/);assert.match(csv,/sample-point first hits only/i);
assert.match(csv,/^schema_version,/);
assert.ok(csv.includes('\r\n'),'CSV rows use portable line ends');
assert.equal(csv.split('\r\n').filter(Boolean).length,2,'Exactly one record per export');
fail(clone({native:''}),'native requires');
fail(clone({native:'-1'}),'native requires');
fail(clone({native:'2.1'}),'native requires');
fail(clone({native:'Infinity'}),'native requires');
fail(clone({native:'0',introduced_invasive:'0',litter:'0',rock:'0',bare_soil:'0',unknown:'0'}),'At least one');
fail(clone({site_id:''}),'site_id');
fail(clone({sampling_design:''}),'sampling_design');
fail(clone({sampling_location:''}),'sampling_location');
fail(clone({observer_id:''}),'observer_id');
fail(clone({visit_date:'2026-02-30'}),'valid calendar date');
fail(clone({transect_length_m:'0'}),'transect_length_m');
fail(clone({point_spacing_m:'-2'}),'point_spacing_m');
fail(clone({protocol:'visual_cover'}),'adapted first-hit');
fail(clone({source_verified:''}),'independently verified');
fail(clone({source_verified:'yes',native_status_source:''}),'classification source');
fail(clone({soil_map_unit:'Unit-X',soil_map_source:''}),'source and date');
const verified=c.build(clone({source_verified:'yes',native_status_source:'voucher checked 2026',soil_map_unit:'Unit-X',soil_map_source:'WSS 2026'}));
assert.equal(verified.ok,true,verified.errors.join('; '));
assert.equal(verified.record.context.native_status_verified,true);
const incomplete=c.build(clone({unknown:'',native:'0'}));
assert.equal(incomplete.ok,false,'Blank unknown cannot be silently read as 0');
const names=[...html.matchAll(/name="([^"]+)"/g)].map(m=>m[1]);
for(const name of Object.keys(defaultInput)){
 assert.ok(names.includes(name),'Missing UI field '+name);
}
for(const id of ['fieldForm','fieldReport','fieldErrors','checkRecord','downloadJSON','downloadCSV'])assert.ok(html.includes('id="'+id+'"'),'Missing form element '+id);
assert.ok(html.includes('FIELD_MONITORING_PROTOCOL.md'));
assert.ok(html.includes('Simplified first-hit sampling'));
assert.ok(html.includes('No soil compaction or infiltration values are calculated'));
assert.ok(index.includes('href="field-assessment.html"'),'Main site must link field form');
assert.ok(workflow.includes('node tests/verify-field-assessment.cjs'),'Workflow must run field QA');
assert.ok(js.includes('core.toCSV')&&js.includes('JSON.stringify'));
assert.ok(js.includes('btnJSON.disabled=true'),'Stale record downloads must be disabled on input');
console.log('PASS: validated plot IDs, 7 exclusive first-hit categories, sample percentages, unknown handling, original source requirement, CSV/JSON data model and navigation.');
