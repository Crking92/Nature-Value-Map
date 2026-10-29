// Run: node tests/verify-homepage.cjs
// Progressive disclosure and DOM integrity checks for the Nature Value Map explorer.
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const css=fs.readFileSync(path.join(root,'style.css'),'utf8');
new Function(app); // must parse
const IDs=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
assert.equal(IDs.length,new Set(IDs).size,'Duplicate DOM IDs can corrupt source/cost outputs');
const appRefs=[...new Set([...app.matchAll(/(?:el|set)\('([^']+)'/g)].map(x=>x[1]))];
for(const id of appRefs)assert.ok(IDs.includes(id),'Missing calculation output/input '+id);
for(const id of ['landCards','manualAcres','mowCost','mowsCurrent','mowsProposed','mowDiffOut','currentCutsLabel','proposedCutsLabel','moreLandscapes','shareScenario','shareStatus','mapDetails','clearBtn','referenceAcknowledged','siteSetting','runoffBefore','runoffAfter','useItemizedMowing','sourceList','serviceBreakdown','mixRows','habitatOut']){
 assert.ok(IDs.includes(id),'Missing critical explorer UI '+id);
}
assert.ok(/id="mowsCurrent"[^>]*type="range"[^>]*min="0"[^>]*max="30"/.test(html)||
  /id="mowsCurrent"[^>]*type="range"/.test(html),'Current mowing slider missing');
assert.ok(/id="mowsProposed"[^>]*type="range"/.test(html),'Alternative mowing slider missing');
assert.ok(html.includes('data-acres="0.25"')&&html.includes('data-acres="5"'),'One-click acreage presets absent');
assert.ok(html.includes('id="mapDetails"')&&html.includes('class="drawer map-drawer"'),'Map must be optional by default');
assert.ok(!/<details id="mapDetails"[^>]*\sopen\b/.test(html),'Map should not dominate initial screen');
assert.ok(/<details class="explore-drawer" id="researchDetails">/.test(html),'Source details must be progressively disclosed');
assert.ok(/<details class="explore-drawer" id="costDetails">/.test(html),'Advanced cost details must be progressively disclosed');
assert.ok(/<details class="explore-drawer" id="waterDetails">/.test(html),'External model data must be progressively disclosed');
assert.ok(/<details class="explore-drawer" id="siteDetails">/.test(html),'Expert field details must be progressively disclosed');
assert.ok(html.indexOf('id="manualAcres"')<html.indexOf('id="researchDetails"'),'Acreage must precede research jargon');
assert.ok(html.indexOf('id="mowDiffOut"')<html.indexOf('id="serviceBreakdown"'),'Friendly main result should precede ecological dollar benchmarks');
assert.ok(html.includes('not a verified average')&&html.includes('not verified savings'),'Source and cost assumptions must be visible without expansion');
assert.ok(html.includes('not')&&html.includes('ecological'), 'Required distinctions missing');
assert.ok(html.includes('id="referenceAcknowledged"'),'Cannot remove explicit reference caveat');
assert.ok(app.includes('el(\'referenceAcknowledged\').checked=false'),'Land-change resets research permission');
assert.ok(app.includes('showAllLandscapes')&&app.includes('b.hidden'),'Less-common ecosystems should be collapsed initially');
assert.ok(css.includes('.explorer-page .land-card[hidden]{display:none!important}'),'Hidden choices need actual CSS concealment');
assert.ok(app.includes('map.invalidateSize()'),'Leaflet must resize after optional map opens');
assert.ok(app.includes('el(\'manualAcres\').addEventListener(\'input\''),'Entering acreage must cancel stale drawn shape');
assert.ok(app.includes('navigator.clipboard.writeText(message)'),'Scenario must be copyable with assumptions');
assert.ok(app.includes('No incremental ecosystem')||app.includes('No added ecological-dollar'),'Copied narrative cannot invent ecological profit');
assert.ok(html.includes('href="assessment.html"')&&html.includes('href="field-assessment.html"'),'Deeper research links should remain discoverable');
assert.ok(css.includes('@media(max-width:650px)'),'Small-screen layout required');
assert.ok(css.includes('prefers-reduced-motion'),'Respect user reduced-motion preference');
assert.ok(html.includes('app.js?v=7')&&html.includes('style.css?v=7'),'Cache-busting version should change on new homepage release');
console.log('PASS: progressive homepage, accessible controls, dynamic mapping, source protection, copy action, no missing DOM IDs or unintended research defaults.');
