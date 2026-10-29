// Evidence integrity tests for public site assessments. Run: node tests/verify-assessment.cjs
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'site-assessments/waterleaf-evidence.json'),'utf8'));
const blank=JSON.parse(fs.readFileSync(path.join(root,'site-assessments/site-template.json'),'utf8'));
const html=fs.readFileSync(path.join(root,'assessment.html'),'utf8');
const main=fs.readFileSync(path.join(root,'index.html'),'utf8');
const register=fs.readFileSync(path.join(root,'EVIDENCE_REGISTER.md'),'utf8');
const sourceMap=new Map(data.sources.map(s=>[s.id,s]));
assert.equal(data.schema_version,'1.0.0');
assert.equal(data.project_id,'waterleaf-park-kyle-tx');
assert.equal(data.place.county,'Hays');
assert.equal(data.place.geometry_verified,false,'Do not falsely certify exact area geometry');
assert.equal(data.place.polygon,null,'No treatment polygon has been verified');
assert.equal(sourceMap.size,data.sources.length,'Duplicate source IDs');
for(const claim of data.claims){
 const source=sourceMap.get(claim.source_id);
 assert.ok(source,'Every claim needs a source');
 assert.ok(['publicly_documented_report','internally_logged_unverified_externally'].includes(claim.grade),'Claim grade must identify evidence status');
 assert.ok(claim.limitation,'Every claim needs applicability limitation');
 if(claim.grade==='publicly_documented_report'){
   assert.equal(source.kind,'public_municipal_report');
   assert.ok(/^https:\/\/www\.cityofkyle\.gov\/media\/.+\.pdf$/.test(source.url),'Public claims need exact official City source');
   assert.ok(Number.isInteger(source.printed_page)&&source.printed_page>0,'Original table/page is required');
 }
 if(claim.grade==='internally_logged_unverified_externally'){
   assert.equal(source.kind,'internal_record_not_publicly_auditable');
   assert.equal(source.url,null,'Do not invent public source link for internal workbook');
 }
}
const claim=id=>data.claims.find(c=>c.id===id);
assert.equal(claim('assessed_area').value,5);
assert.equal(claim('assessed_area').unit,'acre');
assert.equal(claim('assessed_area').source_id,'kyle_aug_2025');
assert.equal(claim('logged_seeded_area').value,5.01);
assert.equal(claim('logged_seed_weight').value,109);
assert.equal(claim('logged_seeded_area').grade,'internally_logged_unverified_externally');
assert.ok(claim('logged_seeded_area').limitation.includes('NOT identical'),'Prevent conflating assessed, seeded and financial scopes');
assert.equal(Object.keys(data.outputs).length,5);
assert.ok(Object.values(data.outputs).every(x=>x===null),'Unverified Waterleaf ecological/financial outcomes must remain absent');
assert.ok(Object.values(blank.outputs).every(x=>x===null),'Blank template cannot include invented benefits');
assert.ok(Object.values(blank.model_inputs).every(x=>x===null),'Blank template cannot have made-up data');
assert.ok(Object.keys(data.model_inputs).every(k=>Object.hasOwn(blank.model_inputs,k)),'Blank template must accept same evidence inputs');
assert.ok(Object.keys(data.outputs).every(k=>Object.hasOwn(blank.outputs,k)),'Template output shape mismatch');
assert.ok(html.includes('Waterleaf Park: What can we actually prove?'),'Public walkthrough absent');
assert.ok(html.includes('Not established'),'Missing evidence must be visibly withheld');
assert.ok(html.includes('5.01 acres')&&html.includes('5 acres'),'Public page must distinguish treated versus assessed');
assert.ok(html.includes('not publicly auditable')||html.includes('not independently accessible'),'Internal workbook limitation must be visible');
assert.ok(html.includes('not incremental value from the documented restoration'),'Benchmark must not be interpreted as actual gain');
assert.ok(html.includes('site-assessments/waterleaf-evidence.json'),'Must link reproducible source register');
assert.ok(main.includes('href="assessment.html"'),'Main page must link the reviewed walkthrough');
assert.ok(register.includes('assessment.html'),'Evidence register must link walkthrough');
console.log('PASS: sourced Waterleaf activities, private-record caveats, public walkthrough, empty outcomes, blank schema, and navigation.');
