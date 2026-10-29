# Nature Value Map — public calculation methods (2026-10-29)

**Purpose:** independent Hays County-first educational and planning tool. These are research-derived estimates, NOT measurements of individual properties, cash revenue, assessed real-estate values, or guaranteed conservation outcomes.

## 1. Ecosystem-service reference

For an eligible land-cover category: **mapped acres × published category benchmark in 2021 USD per acre per year**.

The tool does **not** apply its informal habitat-observation checklist to dollar estimates. It does not calculate site-specific physical metrics without suitable observations and validated models. No published reference for maintained turf is assumed.

Mixed cover: calculate the sum across separate, non-overlapping categories only when percentages total 100% and every nonzero category uses a compatible 2021-USD reference. Never count the same physical acreage in two categories. National fallback and broad urban/rural values require special scrutiny. Displayed sums remain planning references, not validated site-specific totals.

The study benchmark may include existence, recreation, aesthetics, and other nonmarket values; it does not necessarily measure only physical biological functions. Do not add the constituent benefits again, or combine the entire benchmark with other ecosystem-dollar totals that include overlapping services.

## 2. Mowing

**Current annual mowing** = mapped acres × user-entered $/acre/cut × current annual cuts.

**Proposed annual mowing** = mapped acres × user-entered $/acre/cut × proposed annual cuts.

**Mowing-only annual difference** = current − proposed annual mowing.

Kyle's publicly stated range is **$40–$70 per acre per mowing cycle**, from the City Council meeting of February 18, 2025. The starting $55 input is the arithmetic midpoint (an illustration, not a verified mean). Default annual frequencies are fictional examples and must be adjusted. Smaller or landscaped properties may have different per-acre costs.

**Undiscounted 10-year scenario difference** = 10 × (mowing-only annual difference − mapped acres × annual restoration management cost/acre) − mapped acres × one-time restoration installation cost/acre.

An output is withheld until the user supplies *both* restoration cost inputs. A positive result is a modeled scenario difference, not a measured project return. This simplified model excludes discounting, variable time horizons, inflation, disposal, irrigation, risk, replacement plantings and any other costs not entered. Independent third-party maintenance costs are not asserted to be equivalent to Kyle's municipal costs.

## 3. Evidence handling and limitations

- Texas A&M AgriLife / AECOM (2025): published statewide benefit-transfer synthesis; ecological valuation numbers normalized to **2021 USD**. https://agrilife.org/gift/files/2025/08/Ecosystem-Service-Values-for-Texas_FINAL-August-2025.pdf
- FEMA (2022): national fallback categories, reproduced by AECOM in the source above. Not locally validated for arbitrary Hays County parcels.
- EcoMetrics (March 2024): La Salle County native vs. non-native grass right-of-way restoration case study using **2023 USD**; not a turf benchmark. https://nri.tamu.edu/media/3986/ecometrics-analysis.pdf
- City of Kyle (February 18, 2025) Council presentation: local mowing cost statement of approximately $40–$70 per acre per cycle. https://kyletx.new.swagit.com/videos/335169

The habitat checklist is descriptive and not a calibrated ecological score. This release should not claim per-parcel runoff gallons, carbon tons, pollinator numbers, or a validated percentage of full ecosystem function.

## 4. Next research priorities

1. Obtain Hays County contracts/invoices for mowing, site installation, establishment, invasive control, inspection, and management.
2. Validate site-specific vegetation/soil typology and any quantitative habitat quality scoring.
3. Find compatible, defensible turf ecosystem-service estimates; until then the turf-dollar result stays unavailable.
4. Separate physical measurements and economic valuations by ecosystem service to prevent double counting.
5. Review and document uncertainties, applicability and corrected source figures before promoting references into parcel-specific estimates.

A full per-category register is in [EVIDENCE_REGISTER.md](EVIDENCE_REGISTER.md).


## 5. Reading the ecosystem-service breakdown (new)

The site lists **published annual economic reference values per acre** from Texas A&M AgriLife/AECOM (2025), Table 3 and Appendix B for grasslands/prairies, and Table 1 and Appendix B for wetlands and urban green open space. These are not separate additional benefits; components already sum to the category's published total.

Prairie component transcriptions (2021 USD/acre/year): climate regulation 236 (2 studies), flood-risk reduction 363 (1), food provisioning 129 (1), habitat 286 (1), recreation/tourism 95 (1), water supply 190 (2), water quality 330 (1), soil quality 312 (1). **Arithmetic validation:** sum 1,941.

Wetland components from Table 1: aesthetics 921, climate 289, flood 4,349, food 1,988, habitat 3,792, recreation 1,271, water supply 5,937, water quality 401. **Sum: 18,948.** Treat highly cautiously for Hays County inland sites because the synthesis draws on heterogeneous wetland types and locations.

Urban green open space components from Table 1: aesthetics 9,820, climate 2,891, flood 104, habitat 5,872, recreation 1,305. **Sum: 19,992.** Broad category; do not use as substitute for manicured turf or native prairie. Note the large proportion associated with aesthetic valuation.

These sources combine multiple underlying valuation techniques and include nonmarket benefits. The source study counts for prairie are as reported in AECOM Table 3, **not** sample sizes or statistical confidence intervals. Absence of a monetized service (e.g. no pollination line item) does not mean there is no biological benefit.

Other national fallback classes (woodland, riparian forest, rural green space) have no published-component drilldown in this release. No components are fabricated.

## 6. Peer-reviewed comparison and physical model pathways

- Paudel, S. & States, S.L. (2023). *Urban green spaces and sustainability: Exploring the ecosystem services and disservices of grassy lawns versus floral meadows*. Urban Forestry & Urban Greening 84:127932. https://doi.org/10.1016/j.ufug.2023.127932 — reviews ecological trade-offs; **no Hays-specific all-in turf $/acre/year value** established for this map.
- Janke, A.K., Tyndall, J.C. & Bradbury, S.P. (2021). *Financial Analysis of Converting Rural Lawns to Pollinator Habitat in the Corn Belt*. Journal of Fish and Wildlife Management 12(1):151–162. https://doi.org/10.3996/JFWM-20-075 — modeled, discounted 10-year annualized conversion $54–$167/ac/year vs hired lawn $326–$1,034/ac/year, **2020 USD, Corn Belt**. Not used as a Hays County project quote or prefilled cost.
- EPA National Stormwater Calculator: https://www.epa.gov/water-research/national-stormwater-calculator — estimates runoff based on mapped site conditions, historic precipitation and low-impact-development choices. EPA describes **under 12 acres** for hydrology analysis (screening use); do not invent gallons/acre or blindly extrapolate to larger parks.
- USDA/Colorado State COMET-Planner: https://comet-planner.com/ — regional approximate mitigation estimates for suitable conservation-practice scenarios, by location, land use, implementation and acreage. Not universal urban turf conversion, not site-specific carbon measurement.
- USDA NRCS Texas payment schedules: https://www.nrcs.usda.gov/state-offices/texas/payment-schedule — financial assistance amounts for eligible conservation practices; **not proof of actual municipal landscape-restoration expenditures**. Costs continue to require local quotes, invoices or clearly labeled user assumptions.

### Next evidence-gathering criteria

For a Hays County restoration cost: document project acreage, preparation method, seed/plants and labor, machinery, erosion control, irrigation, management frequency, maintenance timeline, reported dollar year and whether work is in-house or contracted. Separate establishment costs from recurring costs.

For physical modeling: document site geometry, surface composition, soils/infiltration, slope, water inputs, target conservation practice, model version, unit basis, scenario assumptions, and credible uncertainty. Keep modeled physical results separate from economic benefit transfers to avoid monetizing the same service twice.


### Additional mowing-rate sensitivity and input provenance

The map now displays a **mowing-only difference range** calculated as acres × (current cuts − proposed cuts) × $40–$70 per acre per cut. Endpoints are sorted if the proposed cut frequency exceeds the current frequency. This is a **scenario sensitivity range**, not a statistical confidence interval, and excludes restoration costs. The main editable $55 example remains user-defined.

A user can label restoration cost inputs as a planning assumption, an externally supplied quote/bid, or an invoice/work order and optionally enter a source note. These labels are **user reported, not independently verified** by the site. The annualized Janke (2021) Midwestern peer-reviewed study is contextual evidence only and is never automatically inserted into Hays County scenario inputs.


## Data QA and source traceability

The [2026-10-29 source audit](SOURCE_AUDIT_2026-10-29.md) records original page/table provenance, monetary years, applicability restrictions and component-sum checks for all eight classes. To detect unreviewed data changes, run `node tests/verify-values.cjs` after touching any value or component. This verifies the website against reviewed source transcriptions; it does **not** turn benefit transfers into site measurements or scientifically validate land-cover selection.


## Hays County transferability (October 2026)

See [HAYS_APPLICABILITY_2026.md](HAYS_APPLICABILITY_2026.md). The optional site setting is **self-reported, not verified from GIS or field inspection** and does not modify a published rate, but withholds an incompatible wetland or riparian dollar figure for a user-described engineered drainage setting. NRCS Texas FY2025 Range Planting Practice 550 Scenario 4 gives **$225.38/ac** for a typical **150-acre** statewide modeled example, not a Kyle quote or default. It uses predominantly native (minimum 75% native) vegetation, not a strict local-native planting specification. The 2026 regional swale studies inform land-cover classification, not local economic values.


## Source validation before any new public number

The [Numerical Publication Standard](PUBLICATION_STANDARD.md) governs future releases. Every value needs original-source table/units/year, ecosystem applicability, baseline comparison when describing gains, and overlap/uncertainty review. The $1,941 2021-dollar prairie benchmark is **not** a Waterleaf annual incremental benefit. Waterleaf poster financial figures were reported estimates and are excluded from model defaults pending a reproducible actual-cost and site-benefit study. Municipal cash savings and social ecosystem benefits remain distinct.


## October 2026 safeguards — exploratory references versus site claims

The website now **withholds area-scaled ecosystem-dollar figures until the user explicitly acknowledges** that these are generic published planning references, not measurements and not added ecosystem-service gains from restoration. The underlying study's per-acre reference and sources remain visible without acknowledgment; switching land-cover categories or between single and mixed modes clears acknowledgment. This confirmation documents understanding only and **does not certify** the site or convert a transferred study value into a reliable parcel estimate.

Mixed-cover percentages start blank, must total 100% and must represent disjoint areas. Previously, mixed-cover calculations could bypass the engineered-drainage wetland/riparian safeguard; the same safeguard is now applied to every nonzero mixed-cover row. No wetlands or riparian reference is transferred to user-described engineered drainage through either path.

The 10-year cost result is explicitly an **undiscounted hypothetical cash-cost difference**, not benefit-cost analysis or net present value. Other restoration-management input explicitly excludes mowing already entered in the proposed mowing line. To use actual invoices in an economic comparison, normalize expenses to the same price year and apply an explained discounting method. The main 2021 USD ecosystem references must not be added to different-year cash expenses.


## October 2026: itemized operational costs and external-model runoff outputs

The [Mowing and restoration cost reproducibility protocol](COST_MODEL_PROTOCOL.md) defines the optional labor/equipment/materials ledger. It uses **user-entered cost data**, not verified Kyle contracts. Every component must be present and the combined site-pass price must be finite and positive. This calculated unit rate replaces the $55/ac/cut illustration only when itemization is explicitly enabled. This method treats each mowing pass of the selected area as having the same cost; there is no evidence that current and proposed passes will always have equal effort.

The [Runoff model evidence protocol](RUNOFF_MODEL_PROTOCOL.md) describes an **external-model result intake**, not hydrologic simulation. The site subtracts two user-provided **annual runoff depths (inches/year)** and converts the difference to gallons over the selected area using **1 acre-inch ≈ 27,154 US gallons** ([USGS](https://www.usgs.gov/water-science-school/science/rain-and-precipitation)). Inputs require a model identifier, source/version, positive acreage and a user confirmation of comparable climate/area assumptions. The result is always labeled **user-reported and unverified**, with no dollar value, flooding claim or groundwater-recharge inference. For EPA Stormwater Calculator-labeled outputs, 12 acres or more is blocked under our conservative interpretation of EPA's stated hydrology scope; another documented model can be used where appropriate.

Automated functional regression tests now cover the six itemized cost fields, source omission, model comparability, negative delta, site area and absence of inputs. They verify software calculations only, not model suitability or scientific validation.


## Explorer 2.0: Progressive access to evidence (October 2026)

The default landing page is intentionally short: start with an editable area (or preset), explore a land-cover reference, then vary **hypothetical mowing frequency** using sliders. The most prominent monetary result is a *mowing-only cost difference*, not total project savings, ecological benefit, or a verified property valuation. The City of Kyle's $40–$70/ac/cut estimate and its $55 mathematical midpoint remain explicitly labelled as reported scenario inputs.

The geographic map, source-by-source ecosystem service decomposition, land-cover mixing, site setting, ten-year restoration expenses and external runoff-model output comparison are placed inside **optional expandable sections**. They retain all their existing scientific safeguards. A map drawing, when used, overrides a typed area; changing the manual acreage or choosing a preset clears the drawn geometry. If third-party map scripts fail, the arithmetic and educational explorer must remain usable from manual acreage alone.

Visitors can copy their **scenario assumptions and mowing-only result**, together with caveats and a link to the research methods. Clipboard operations require user action and are not stored on a server. Land-cover selection is for reading an original study's *category benchmark*, and is not proof that current or proposed management produces that value.

Automated checks: \`node tests/verify-homepage.cjs\` verifies progressive-disclosure structure, source controls and calculation DOM IDs; \`tests/verify-values.cjs\` and \`tests/verify-scenarios.cjs\` retain the numerical gates. These are software checks; user-experience and accessibility testing with real people remains a future release requirement.


## Address or place lookup and zoom controls (October 2026)

The optional map includes explicit zoom-in, zoom-out, and Kyle-home controls, plus a form for searching U.S. addresses, parks or place names. The geocoding provider is [Esri ArcGIS World Geocoder](https://developers.arcgis.com/rest/geocode/find-address-candidates/) in **non-stored** mode. It is used only after the visitor submits the form, with up to five candidates returned. Multiple potential matches require an explicit selection. Search text is sent directly to Esri; this website has no search analytics, geocoding database, address storage, or search-result caching.

A geocoded address is **only a map-navigation location**. It is not a property boundary or surveyed parcel location, and it cannot be used to infer acreage. Selecting a search match clears any previously drawn map geometry to prevent stale-area calculations; the user must draw a new polygon or enter acreage. Search can fail, be unavailable, be approximate, or return an ambiguous result. The calculator remains usable without map or search service availability.

The OSM/Leaflet basemap retains proper OSM tile attribution. Explicit zoom controls are kept separate from land-selection drawing tools. Wheel zoom remains disabled to prevent accidental zoom while scrolling the page; map dragging, touch gestures, and zoom buttons remain available.

**Operational caveat:** The anonymous public ArcGIS geocoding endpoint can change availability, access policy, and request limits, so a high-traffic deployment may require a configured authenticated alternative. This implementation does not offer autocomplete or make repeated geocoding requests for each keystroke. The address search adds no scientific confidence to land-cover or valuation assumptions.
