# Nature Value Map — research readiness and independent scientific verification plan

**Review:** October 29, 2026. The goal is a transparent public educational tool for Hays County that can withstand careful review of **what a source actually establishes**, not a claim that every site can be valued to the dollar. No economic, ecological, or statistical result is guaranteed "foolproof."

## Immediate determination

The existing **2025 Texas A&M AgriLife/AECOM** table supports a **2021-dollar grassland/prairie literature-derived reference of $1,941 per acre per year**. It does **not** measure a parcel, value every native planting, or demonstrate $1,941 in *added* benefit after restoration. The origin is a technical benefit-transfer synthesis combining a small number of selected source studies; some service rows use one contributing study, others two. See its Table 3, page 22 and Appendices.

https://agrilife.org/gift/files/2025/08/Ecosystem-Service-Values-for-Texas_FINAL-August-2025.pdf

**EPA Guidelines for Preparing Economic Analyses, 3rd edition (December 2024)** specify policy-case baseline definition, selection of comparable study cases, defensible value transfer, identification of uncertainty and double-counting review. This governs our use of research. Chapter 7 §7.4 provides a four-step transfer procedure. https://www.epa.gov/environmental-economics/guidelines-preparing-economic-analyses-3rd-edition

## Claim-to-method register

| Possible public result | Currently defensible | What the site must not claim | What would make a site-specific result possible |
| --- | --- | --- | --- |
| **Published Texas prairie valuation** | $1,941/ac/year, 2021 USD, conditional literature benchmark; source components publicly inspectable | Annual cash income, measured Kyle property value or full incremental gain after restoration | Verified grassland class and baseline/with-project analysis matching service definitions; site-comparable studies or calibrated models |
| **Wetland or riparian value** | $18,948 wetland Texas synthesis or $37,199 FEMA riparian national fallback as highly conditional original-study references only | Every pond, ditch, creekside row of trees or detention basin has these values | Functional wetland/riparian delineation, geology/hydrology/floodplain, validated receptor and applicable values |
| **Maintained turf economic services** | **No defensible general annual per-acre figure currently selected** | Zero benefit or substitute $930 EcoMetrics right-of-way | Same-endpoint baseline studies in Hays-like landscapes, compatible monetary years and non-overlapping endpoints |
| **Mowing cost** | Kyle Council-reported $40–$70/acre/cut range as an explicitly editable scenario assumption; $55 is just midpoint | Audited local average, guaranteed savings, or single-site actuals | Itemized verified mowing frequency, area, labor/equipment/fuel/overhead costs, corresponding post-conversion work |
| **Restoration installation/management** | User-entered assumptions, quotes/invoices explicitly labeled as user-reported | Automatically insert an NRCS hypothetical statewide range-planting cost or unknown city estimate | Local dated project invoices and what they include; site treatment area; continued care by year |
| **Runoff reduction** | Link to EPA National Stormwater Calculator; no default parcel gallons | Uniform gallons/acre for prairie or 'wetland' with unknown soils | Site cover and soils/hydrologic group, infiltration/compaction, slope, rainfall, impervious fraction, representative with/without project model and uncertainty |
| **Carbon** | Qualitative ecosystem benefit and links to appropriate models | Universal carbon tonnes/ac/year or equating existing stock with annual sequestration | Stock and flux separation, soil/biomass observations, land-use practices, model version and geographic transfer validity |
| **Biodiversity/food webs** | Scientifically grounded statements about habitat/host plants, with individually linked research where supported | A fixed number of insects or universal $/ac for native plants | Field observations, locally native species verification, time-of-season surveys and comparable experimental evidence; don't monetize by assumption |
| **Urban cooling** | Published studies show potential cooling, but context matters | Every 1 acre reduces temperature by a universal number | Local air/surface measurements, canopy, shade, nearby pavement, time of day, baseline and representative model |

## Data source hierarchy and limitations

**Land-cover:** USGS Annual NLCD Collection 1.2 includes land-cover/confidence products through 2025, with 30-m spatial resolution. USGS's independent reference validation reported approximately **83% overall agreement for broad land-cover classes** for a reference assessment; this is **not** a parcel-specific probability, nor accuracy for distinguishing local native prairie from nonnative turf. Any future automatic land-cover suggestion must expose class, mapping date, resolution, validation limitations, and require manual confirmation. Primary USGS sources:
- https://www.usgs.gov/centers/eros/news/new-reference-and-validation-data-available-annual-nlcd
- https://www.usgs.gov/centers/eros/science/about-annual-nlcd
- https://www.mrlc.gov/data/type/land-cover-confidence

**Soils and ecosystem setting:** USDA NRCS Web Soil Survey and Ecological Site Descriptions are geographically relevant frameworks for comparing Blackland Prairie/Edwards Plateau sites, but their mapped units do not prove property-scale native vegetation or current compaction. https://www.nrcs.usda.gov/getting-assistance/technical-assistance/ecological-sciences/ecological-site-descriptions

**Runoff:** The EPA National Stormwater Calculator (web version 3.4.0) uses EPA SWMM and site soils, climate and land cover. EPA identifies analysis for small/medium sites (less than 12 acres) and describes its principal use as screening, not independent flood-damage appraisal. Large or complex watersheds need a more appropriate setup. https://www.epa.gov/water-research/national-stormwater-calculator

**Mowing/restoration:** Janke, Tyndall & Bradbury (2021) is a peer-reviewed 10-year financial analysis of Corn Belt rural lawn conversion; its costs are **2020-dollar Midwestern modeled scenarios** and not actual Kyle expenditures. https://doi.org/10.3996/JFWM-20-075 . Detailed cost categories can inform future site input forms but should not silently populate Texas quotes.

**Botanical verification:** For local native-species comparison, use county-level range checks where appropriate (including BONAP/NAPA), verify taxonomic identity and native provenance, and distinguish local wild-type species from introduced cultivars. A county occurrence record by itself does not establish ecological services for an entire site. Reference/validation and local surveys are separate evidence types.

## No arbitrary averages

Before averaging studies: match ecological endpoint, unit (per year, per event, per hectare), ecosystem state, geography, baseline and price year; inspect sample overlap, selection bias, valuation method and whether one total contains the other service. If incompatible, keep separate contexts rather than forcing a mean. A modeled high/low is not an independently measured confidence interval.

## Independent review checklist

1. Claim is recorded with original, stable source and exact table/page.
2. Study quality (peer-reviewed empirical, peer-reviewed methods review, official technical model, historical claim) is distinguished.
3. Study geographically/ecologically matches the target, or transfer limitations are explicit.
4. Existing land cover, baseline and treated conditions are specified for *incremental* claims.
5. Monetary values have units, original dollar year, method and affected public/beneficiaries.
6. Model formula, inputs, scenario date and code version are available and reproducible.
7. No additional services overlap with a bundled source total.
8. Unmeasured services are omitted and explained rather than set to zero.
9. At least two independent reviewers ideally audit numeric transcriptions, methods, outputs and final language.
10. Repeatable automated tests reject unsupported cases after future code updates.

## Release candidates and remaining blockers

- **Ready as published reference:** Source table transcriptions including their precise units/years; do not imply site-specific validity.
- **Ready as illustrative scenario:** Mowing arithmetic, with fully user-visible adjustable assumptions; 10-year output is **undiscounted** and is not a formal benefit-cost analysis.
- **Withhold:** Unverified Waterleaf poster's ecological return, default turf ecosystem value, automatically computed carbon/runoff values, and generic restoration savings lacking itemized expense records.
- **Requires next scientific review:** Geographic evidence-screening rubric and regional peer-reviewed studies for physical outcomes. Annual NLCD and USDA soils can inform site-classification prompts, but not instantly certify ecology.

The automated test file \`tests/verify-scenarios.cjs\` checks calculator behavior, including the former mixed-cover engineered drainage loophole. Neither tests nor acknowledgement by a user independently validate actual site conditions.


## Implemented first-stage empirical-data intake (October 2026)

**Itemized mowing estimate:** users can supply per-pass crew-hours, loaded hourly labor, equipment hours/rate, fuel not already included and other nonoverlapping mobilization expenses. Source is the user's entries, not an independently authenticated invoice. See [cost reproducibility protocol](COST_MODEL_PROTOCOL.md).

**External hydrology model output comparison:** accepts existing/proposed annual runoff depth from a documented external model, requires comparable site/climate assumptions and performs only an acre-inch volume conversion. It is **not a SWMM integration**, not a new native meadow hydrology study, and not a verified or measured runoff reduction. See [runoff model protocol](RUNOFF_MODEL_PROTOCOL.md).

**Next scientific phase:** independently review site-specific rainfall/soils and model results; build distinct current/proposed mowing rates and price-year normalization. The research prerequisites for carbon stock versus flux and native vegetation/host-plant monitoring are now documented in [CARBON_EVIDENCE_PROTOCOL.md](CARBON_EVIDENCE_PROTOCOL.md) and [HABITAT_MONITORING_PROTOCOL.md](HABITAT_MONITORING_PROTOCOL.md). These are not yet numeric calculators.


## Implemented reproducibility example — Waterleaf Park (October 2026)

A [public evidence walkthrough](assessment.html) and [structured source data](site-assessments/waterleaf-evidence.json) show an actual Kyle restoration initiative while withholding site outcome numbers not supported by comparable field data, budget records or model runs. The [blank site template](site-assessments/site-template.json) records unknown data as `null` and requires future reviewer evidence. The separate [site guide](site-assessments/README.md) explains the controlled update process. No field-measured runoff or quantified ecosystem restoration gain has been claimed or inferred from the City's activity reports.
