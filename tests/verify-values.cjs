// Run: node tests/verify-values.cjs
// Independent transcription tests against AECOM 2025 Tables 1,2,3,4 + Appendix A-1,
// and EcoMetrics 2024. Fails if published app defaults drift without a reviewed update.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');
const anchor = "  var selected = 'native_prairie';";
assert.ok(source.includes(anchor), 'App source extraction anchor changed — revise test');
const isolated = source.slice(0,source.indexOf(anchor))+
  '\n  globalThis.__audit = {CLASSES, SERVICE_COMPONENTS};\n})();';
const sandbox = {};
vm.runInNewContext(isolated,sandbox,{timeout:1000});
const {CLASSES, SERVICE_COMPONENTS} = sandbox.__audit;
const expected = {
  native_prairie: [1941,2021,'gift',true],
  wetland: [18948,2021,'gift',true],
  forest: [12589,2021,'fema',true],
  riparian_forest: [37199,2021,'fema',true],
  non_native_grass: [930,2023,'eco',false],
  turf_estimate: [null,null,null,false],
  rural_green_open_space: [10632,2021,'fema',true],
  urban_green_open_space: [19992,2021,'gift',true],
};
assert.equal(CLASSES.length,Object.keys(expected).length,'Unreviewed land cover added or removed');
for(const c of CLASSES){
  assert.ok(Object.hasOwn(expected,c.id),'Unexpected class: '+c.id);
  const v = [c.value,c.year,c.source,c.eligible];
  assert.deepEqual(JSON.parse(JSON.stringify(v)),expected[c.id],'Valuation mismatch: '+c.id);
}
const expectedServices = {
  native_prairie: { 'Climate regulation':236,
    'Flood and storm hazard reduction':363,'Food provisioning':129,
    'Habitat':286,'Recreation / tourism':95,'Water supply':190,
    'Water quality':330,'Soil quality':312 },
  wetland: { 'Aesthetic value':921,'Climate regulation':289,
    'Flood and storm hazard reduction':4349,'Food provisioning':1988,'Habitat':3792,
    'Recreation / tourism':1271,'Water supply':5937,'Water quality':401 },
  urban_green_open_space: { 'Aesthetic value':9820,'Climate regulation':2891,
    'Flood and storm hazard reduction':104,'Habitat':5872,
    'Recreation / tourism':1305 }
};
for(const [id,services] of Object.entries(expectedServices)){
  assert.deepEqual(
    Object.fromEntries(SERVICE_COMPONENTS[id].map(s=>[s.label,s.value])),
    services, 'Monetized service data diverged: '+id);
  const total = Object.values(services).reduce((a,b)=>a+b,0);
  assert.equal(total,expected[id][0], 'Reported component total divergence: '+id);
}
assert.equal(SERVICE_COMPONENTS.forest,undefined,'Do not fabricate forest study decomposition');
assert.equal(SERVICE_COMPONENTS.turf_estimate,undefined,'Turf monetary decomposition not established');
assert.ok(!source.includes('selectedQuality'),'Unsupported quality multiplier reintroduced');
assert.ok(source.includes('c.year!==2021'),'Incompatible mixed monetary years no longer blocked');
assert.ok(source.includes('install===null||care===null'),'Unknown restoration costs no longer withheld');
const fallbackRounded = {
  forest: [1477,711,199,1672,7531,368,94,435,103],
  riparian_forest: [767,254,199,96,13823,6052,736,2547,6215,6239,272],
  rural_green_open_space: [7505,77,78,2021,350,601],
};
for(const [id,items] of Object.entries(fallbackRounded)){
  const sum=items.reduce((a,b)=>a+b,0);
  const difference=Math.abs(sum-expected[id][0]);
  assert.ok(difference<=1,'FEMA source component mismatch more than published rounding: '+id);
  if(id!=='rural_green_open_space') assert.equal(difference,1,'Expected $1 display rounding delta for '+id);
}
console.log('PASS: 8 category figures, 21 service figures, units and guards, and FEMA rounding context.');
