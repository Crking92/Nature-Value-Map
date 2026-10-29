# Nature Value Map — evidence register (2026-10-29)

**Publishing policy:** The figures below are reported study benchmarks, not measured Hays County outcomes. No values should be presented as site-specific predictions without site conditions, validated models and review. Never average unrelated land covers or different monetary years without normalizing and checking overlapping services.

| Category | Annual value, USD/acre | Dollar year | Original source | Site use |
| --- | ---: | --- | --- | --- |
| Prairie / native meadow | $1,941 | 2021 | Texas A&M/AECOM 2025 | Texas-wide grassland reference; NOT a property measurement |
| Wetland | $18,948 | 2021 | Texas A&M/AECOM 2025 | For functional wetlands only; no automatic pond-edge assignment |
| Upland woodland | $12,589 | 2021 | FEMA 2022, reproduced in AECOM 2025 | National fallback only |
| Creekside forest | $37,199 | 2021 | FEMA 2022, reproduced in AECOM 2025 | National riparian-forest fallback only |
| Non-native grass restoration | $930 | 2023 | EcoMetrics 2024 | La Salle County right-of-way case study only; excluded from map benchmark calculations |
| Maintained turf | **Not established** | — | No directly applicable verified reference | Never substitute $930 from a right-of-way |
| Other rural green space | $10,632 | 2021 | FEMA 2022, reproduced in AECOM 2025 | Broad national fallback |
| Urban green open space | $19,992 | 2021 | Texas A&M/AECOM 2025 | Broad urban reference, not lawn or prairie proxy |

Original references:
- Texas A&M AgriLife / AECOM 2025: https://agrilife.org/gift/files/2025/08/Ecosystem-Service-Values-for-Texas_FINAL-August-2025.pdf
- EcoMetrics 2024: https://nri.tamu.edu/media/3986/ecometrics-analysis.pdf
- Kyle Council 2025 mowing statements: https://kyletx.new.swagit.com/videos/335169

**Mowing input:** $40–$70 per acre per cycle as stated in Kyle's 2025 meeting. Website starts at $55, only the arithmetic midpoint. Mow frequencies of 15 and 2 per year are **illustrative**, not documented local averages.

**Unresolved:** The $1,224 native figure in the original EcoMetrics report differs from a $1,196 figure published in a related summary. This project does not average or quietly substitute them. All combined ecosystem-service totals require an overlap check and dollar-year normalization.

**Validation rules:** Mixed percentages must total 100; all values must be finite and nonnegative; a 0 value must remain zero; unknown costs must remain unknown; user observations cannot numerically scale dollar estimates; 2023 case study figures cannot be added to 2021 reference totals.


## Source-table component audit — Texas A&M/AECOM 2025

All values below are **2021 USD/acre/year** and taken from the report's **Table 3 / Appendix B (prairie)** and **Table 1 / Appendix B (wetland and urban green)**. Components are already included in the reported total; do not add them again.

| Monetized service | Prairie | Wetland | Urban green space |
| --- | ---: | ---: | ---: |
| Aesthetic value | — | 921 | 9,820 |
| Climate regulation | 236 | 289 | 2,891 |
| Flood/storm hazard reduction | 363 | 4,349 | 104 |
| Food provisioning | 129 | 1,988 | — |
| Habitat | 286 | 3,792 | 5,872 |
| Recreation/tourism | 95 | 1,271 | 1,305 |
| Water supply | 190 | 5,937 | — |
| Water quality | 330 | 401 | — |
| Soil quality | 312 | — | — |
| **Reported total** | **1,941** | **18,948** | **19,992** |

**Prairie evidence counts:** climate 2; flood 1; food 1; habitat 1; recreation 1; water supply 2; water quality 1; soil 1. Counts are original report's contributing studies, not independent replications of local Hays County sites.

Wetland study values have high ecological and geographic heterogeneity; urban green space combines market-adjacent aesthetic and nonmarket values. A dash means not monetized in the selected synthesis, not proof of zero ecological benefit.

## Independent contextual research (not automatically applied to site values)

- Paudel & States (2023), peer-reviewed review on grassy lawns and floral meadows: https://doi.org/10.1016/j.ufug.2023.127932 . Do not extract an all-in local turf value from qualitative comparisons.
- Janke, Tyndall & Bradbury (2021), Corn Belt pollinator habitat economics: https://doi.org/10.3996/JFWM-20-075 . Ten-year annualized modeled costs in **2020 USD**, with discounting: pollinator habitat $54–$167/ac/year; hired lawn $326–$1,034/ac/year. Not a Texas implementation quote or a directly comparable result to our undiscounted scenario tool.
- EPA SWC, runoff screening for sites under 12 acres: https://www.epa.gov/water-research/national-stormwater-calculator . Not an automatic runoff-output widget.
- COMET-Planner, regional conservation-practice GHG estimates, not site-measured: https://comet-planner.com/ .
- NRCS Texas payment schedules: https://www.nrcs.usda.gov/state-offices/texas/payment-schedule . Program payments are not installation invoices. Cities are not eligible to use EQIP financial assistance in the way qualifying agricultural producers can.

## Publication and scientific limitations

No Hays County-specific turf ecosystem-dollar default, no unmeasured carbon tonnes or runoff gallons, and no statistical CI on the low/high synthetic benefit-transfer ranges. Ineligible land-cover cases remain blank. Research context is always distinguished from verified model inputs.


## 2026-10-29 independent transcription/eligibility audit

See [SOURCE_AUDIT_2026-10-29.md](SOURCE_AUDIT_2026-10-29.md) for original table/page references, component-by-component reconciliation, FEMA rounding discrepancies, source-quality limitations, and publication rules. All values remain published **references**, not measured property outcomes. Automated regression verification: `node tests/verify-values.cjs`.


## Hays County applicability review (October 2026)

Read [HAYS_APPLICABILITY_2026.md](HAYS_APPLICABILITY_2026.md) for Blackland Prairie versus Edwards Plateau soil context, 2026 peer-reviewed regional swale/detention studies, and a **FY2025 NRCS statewide modeled $225.38/ac range-planting scenario for 150 acres**. These do not replace site assessment or actual Kyle restoration invoices. The site-setting input is not GIS verified and does not modify source rates. An engineered drainage setting with a natural wetland or riparian classification withholds that benchmark.


## Preliminary local example: Waterleaf Park meadow conversion

See [Waterleaf Park case-study source audit](CASE_STUDIES/WATERLEAF_PARK_PRELIMINARY.md). A City of Kyle poster reports **3.6 acres**, **$894/ac** herbicide/seed, **$720/ac/year** mowing and **$2,245/ac/year** ecosystem services. City weekly reports confirm 2025 planning and no-till native seeding, but do not independently verify the poster's per-acre costs, ecological-dollar estimate or treated area. The poster's **$23,823** three-year project total conflicts with its **3.6 acres × $7,941/ac = $28,587.60** arithmetic. It must **not** be used as a website default or as an audited realized financial return. See the case-study document for corrections and source links.


### Follow-up — logged Waterleaf seeding (private operational record, October 2026 review)

The internal land-management tracking workbook records **1.86 acres / 40 lb** of Custom Mix 2025 at Waterleaf LMU 1 and **3.15 acres / 69 lb** at Waterleaf LMU 2 on November 18, 2025: **5.01 acres / 109 lb combined**. These are logged seeding quantities, not proof that the poster's 3.6-acre *financial example* covers all the same land. Source is not publicly inspectable; do not treat it as an audited public record. The June 28, 2026 original flyer filename suggests a hypothetical **$20/ac retained mowing pass** explaining $720 versus $700, but the underlying mowing worksheet is still missing. The project-wide dataset named *COK Parks Mowing Data 2024–2026* has not been retrieved. More detail: [Waterleaf case study](CASE_STUDIES/WATERLEAF_PARK_PRELIMINARY.md).


## October 2026 stronger release gate for unverified local financial claims

Read [Numerical Publication Standard](PUBLICATION_STANDARD.md). The Waterleaf poster's figures are **historical reported estimates without independently reproducible calculation support** and do **not** qualify as local calibration or live calculator defaults. Related project work logs corroborate recorded seeding activity, not an ecosystem-dollar return. A coincidentally matching research estimate must not be used to backfill an unverified project claim. Restoration incremental benefits require a valid comparable baseline; known research benchmarks are not incremental gains by themselves.


## October 2026 defensibility safeguard in user experience

Area-scaled study-dollar figures now require an explicit research-use acknowledgement. This is a **communication and input-use safeguard, not scientific certification**. The same engineered-drainage exclusion applies to wetland/riparian references in single and mixed cover, and no mixed-area percentages are prefilled. The published per-acre source figures and service breakdown remain visible without showing a parcel-level total. See [METHODS_GAPS_AND_RESEARCH_PLAN.md](METHODS_GAPS_AND_RESEARCH_PLAN.md) for site-specific model prerequisites, USGS land-cover accuracy and claim eligibility.


## Runoff and operational cost evidence modules (October 2026)

- [Itemized mowing and restoration cost protocol](COST_MODEL_PROTOCOL.md): optional user-input labor, equipment hours/cost, fuel/supplies and mobilization per cut of a whole site. Avoid double counting. Incomplete inputs withhold results. Does not independently audit receipts or establish a local average.
- [Runoff modeling intake protocol](RUNOFF_MODEL_PROTOCOL.md): reads user-entered outputs from externally configured EPA Stormwater Calculator or another identified hydrologic model. No runoff estimate is generated from land-cover category alone. Reports a **geometric conversion** of the annual runoff-depth difference, in gallons/year; the source is **1 acre-inch ≈ 27,154 US gallons** (USGS). No water-service dollar claim is inferred.
- All ecological-dollar reference rates remain unchanged. There are still no defensible universal current-turf ecological dollars, carbon tonnes per acre, Hays County insect counts, or site-specific runoff defaults.


## Planned carbon and biodiversity evidence standards

[Carbon and greenhouse gas evidence protocol](CARBON_EVIDENCE_PROTOCOL.md) and [Hays County biodiversity monitoring protocol](HABITAT_MONITORING_PROTOCOL.md) describe the reference data and independent validation required before carbon, native-plant, specialist-host or wildlife outcomes can be quantified. They do **not** introduce generic quantitative values, financial benefits, automatic local cover classifications, or a habitat-quality percentage.


## Public Hays County evidence walkthrough — Waterleaf Park

[Open the Waterleaf assessment walkthrough](assessment.html) and its [machine-readable evidence record](site-assessments/waterleaf-evidence.json). The 2025 City of Kyle weekly reports publicly document **5 acres assessed**, treatment of invasive King Ranch bluestem and no-till native seeding; they **do not measure** restoration effects. Separate internal records report **5.01 acres seeded / 109 lb**, but are labeled **not publicly auditable** and not assumed to have the same footprint as the promotional **3.6-acre** financial example. The record's hydrology, carbon, biodiversity and financial outcomes are explicitly **null (unknown)**, not zero. Validated site-specific model inputs and field observations are still required. Automatic test: `node tests/verify-assessment.cjs`.
