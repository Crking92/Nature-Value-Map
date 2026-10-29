# Nature Value Map — source-by-source numerical QA (2026-10-29)

**Scope:** Audit the numerical claims published in `app.js` against original source tables. This review verifies **transcription, units, year and arithmetic**. It does **not** establish measured ecosystem-service value for a parcel in Hays County. The public map's visual/layout defects are deferred.

## Publication definitions

- **Verified citation:** reported number and currency/year/units match the named original source.
- **Conditional benchmark:** source is correctly transcribed but applying it to the user's actual land cover requires ecosystem classification and geographic/methodology justification.
- **Case-study only:** a narrow study may be quoted in context, but cannot be used as a general default.
- **Not established:** leave blank; never fill using a convenient number from an unrelated class.
- **User-supplied assumption:** scenario input is not an independently verified observation, quote or audited local average.

## Source audit

| App class / key | Source value (USD/acre/year) | Dollar year | Where verified | Publication decision |
|---|---:|---|---|---|
| Prairie/grassland `native_prairie` | 1,941 | 2021 | AECOM 2025, Table 3, printed p. 22 / PDF p. 26; Appendix B-3, PDF p. 46 | **Conditional benchmark**; mature grassland reference, not guaranteed for newly seeded native meadow |
| Wetland `wetland` | 18,948 | 2021 | AECOM 2025, Table 2, printed p. 15 / PDF p. 18; Appendix B-2, PDF p. 45 | **Conditional benchmark**; heterogeneous coastal and inland wetland literature, not every detention pond edge |
| Forest `forest` | 12,589 | 2021 | FEMA 2022, reproduced in AECOM 2025 Appendix A-1, PDF p. 43 | **Conditional national fallback**; includes 7,531/ac/year existence value |
| Riparian `riparian_forest` | 37,199 | 2021 | FEMA 2022, reproduced in AECOM 2025 Appendix A-1, PDF p. 43 | **Conditional national fallback**; source calls this broad category 'Riparian', not specifically 'every creekside woodland' |
| Non-native grass restoration `non_native_grass` | 930 | 2023 | EcoMetrics 2024, executive summary / original comparison table | **Case-study only**, La Salle County oil/gas right-of-way; not a lawn proxy |
| Regularly mowed turf `turf_estimate` | **not established** | — | No verified matching all-in local $/acre/year source | **Do not impute** EcoMetrics $930 or the urban open-space value |
| Rural green open space `rural_green_open_space` | 10,632 | 2021 | FEMA 2022, reproduced in AECOM 2025 Appendix A-1, PDF p. 43 | **Conditional national fallback**; not a substitute for identified prairie |
| Urban green open space `urban_green_open_space` | 19,992 | 2021 | AECOM 2025, Table 4, printed p. 27 / PDF p. 31; Appendix B-4, PDF p. 47 | **Conditional benchmark**; broad developed vegetated land-cover type with substantial aesthetic value; not a lawn proxy |

**Important page numbering:** PDF indices in source displayers are sometimes zero-based. 'PDF p. 26' here means the 26th physical page **plus one** relative to a zero-based screenshot index of 25. These source references are best checked by printed page/table number.

Primary source: https://agrilife.org/gift/files/2025/08/Ecosystem-Service-Values-for-Texas_FINAL-August-2025.pdf

Case study: https://nri.tamu.edu/media/3986/ecometrics-analysis.pdf

## Verified ecosystem-service decomposition

AECOM Table 3 prairie: climate 236; flood/storm hazard reduction 363; food 129; habitat 286; recreation/tourism 95; water supply 190; water quality 330; soil quality 312 = **1,941** (2021 USD/acre/year). AECOM derived this synthesis from two selected source publications, with most individual service lines supported by **one** source; it is **not** eight separately measured local experiments. A missing monetized item, such as pollination, is not a zero ecological value.

AECOM Table 2 wetland: aesthetics 921; climate 289; flood 4,349; food 1,988; habitat 3,792; recreation 1,271; water supply 5,937; water quality 401 = **18,948**. Appendix B-2 shows a reported literature-derived low/high **6,119–31,342**, **not a statistical confidence interval**.

AECOM Table 4 urban green: aesthetics 9,820; climate 2,891; flood 104; habitat 5,872; recreation 1,305 = **19,992**. Appendix B-4 reports **2,391–28,647** as literature-derived range, not a statistical confidence interval. Aesthetics contributes 9,820/19,992, approximately **49%** of the total; avoid suggesting this number is only ecological function.

FEMA Appendix A-1 national fallback per-acre 2021 USD published totals: **Forest 12,589; Riparian 37,199; Rural Green Open Space 10,632**. Adding the source's individually **rounded** components gives **12,590 forest** and **37,200 riparian**, each **$1 above** its officially published total. This is a rounding discrepancy, not permission to revise an official total. Rural components add to **10,632** exactly.

## Non-comparable data and known limitations

- EcoMetrics right-of-way values: **930 non-native / 1,224 native, 2023 USD**; the separate Texas A&M news item reports a different native value of **1,196**. Keep original case-study result attributed and note the unresolved report-summary disagreement. Never average this pair with the 2021 AECOM prairie benchmark.
- AECOM's synthesis averages service-level studies before adding categories. It explicitly warns about geographic transfer, inconsistent land-cover classes, double counting, and time to full ecological functioning. Its values mix peer-reviewed and gray literature; the AECOM synthesis itself is a commissioned **technical report**, not automatically a peer-reviewed paper.
- Current mixed-cover calculator requires disjoint land cover percentages totaling 100% and only internally compatible 2021-USD values. It **cannot independently prove** the user's chosen covers are actually present or non-overlapping; results are exploratory.
- The habitat checklist is **not a validated scoring system** and must never multiply source dollars.
- No project-specific runoff gallons, stored carbon mass, avoided flood damages, native insect counts, or Hays County turf ecosystem-dollar total may be created without suitable local measurements or validated model data.
- Do not add avoided mowing cost to ecosystem-value references as one combined cash-like 'net value': cost flows, nonmarket benefits and currency years must be treated distinctly.

## Kyle mowing costs

In the February 18, 2025 City Council presentation, conservation management discussed mowing at **approximately $40–$70 per acre per cut**. This is a city-stated cost range, not an independently audited market-price distribution. The website starts at $55 as a **chosen midpoint**, not a measured average. The 15-versus-2 annual cycles are **illustrative**, not a local city schedule.

Source: https://kyletx.new.swagit.com/videos/335169

## Resulting scientific action list

1. Keep transcribed publication figures unchanged and display the original year, units and applicability warning.
2. Do not promote conditional reference values to **site-specific predictions**. Give priority to locally classified/verified habitat.
3. Seek local invoices, contracts, acreage and management years for restoration costs, especially installation, re-seeding, selective mowing and invasive-species follow-up.
4. For physical effects, use an appropriate model and report units, assumptions, calibration, and uncertainty; do not infer numbers from the all-in economic benchmark.
5. Before changing default economic values, retain exact publication title, page/table, type of benefit, study location, monetary year and a reproducible comparison method.

The automated checks in `tests/verify-values.cjs` compare the shipped JS numbers against these independently transcribed source totals. They establish **regression integrity**, not external peer review.
