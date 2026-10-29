# Nature Value Map — Numerical publication standard

**Policy date:** 2026-10-29. **Scope:** Every numeric claim used in public maps, exported comparisons, explanatory captions, or research case studies. Primary goal: scientific traceability and clear separation of estimated ecosystem services from demonstrated local operational costs.

## Core principles

1. **Citations are necessary but insufficient.** A study with a similar dollar figure does not validate a claim. The source must actually estimate the same endpoint, reference scenario, ecosystem, temporal basis, geographical context, and dollar year.
2. **Differentiate results:** (a) field-measured or invoiced observations, (b) results of an identified and reproducible model, (c) published regional benefit-transfer benchmarks, (d) illustrative planning assumptions, and (e) historical claims whose calculations cannot be audited. Do not promote a lower tier by adding more unrelated citations.
3. **Measure the change, not just the restored total.** For restoration, incremental benefit equals value under restoration scenario minus value under a documented without-restoration baseline, comparing **the same services under compatible methods**, and accounting for restoration maturity and the time horizon. Do not treat all value of a healthy prairie as newly created by converting an existing vegetated area.
4. **Separate cash and nonmarket outcomes.** Municipal mowing costs, installation expenses, and management savings belong in an operational budget. Monetized services (e.g. recreation, existence, hazard-risk reduction) are research-based social-benefit estimates, not cash paid to the city. Never call a combined number city revenue or realized savings.
5. **Avoid double counting and false precision.** Do not add broad ecosystem service totals to narrower overlapping components. Do not mix source dollar years without documented conversion. A qualitative study cannot produce a per-acre dollar default. A modeled research range is not a statistical confidence interval unless the authors establish it.
6. **Refuse unsupported calculations.** An absent turf benchmark stays blank; no zero assumed unless scientifically warranted. No invented gallons of runoff, tonnes of carbon, number of species, or arbitrary habitat-condition multiplier.
7. **Preserve uncertainty.** Each claim should explain the applicability restrictions, expected direction and magnitude of error where possible, model assumptions, and whether the original research was peer-reviewed or instead a validated government/university method.

## Required evidence fields for every public numeric claim

| Field | Minimum required |
| --- | --- |
| Source identity | Author, date, title, primary publication/official model and persistent URL |
| Exact support | Table, page or machine-readable output and whether value is a direct transcription, calculation or an inference |
| Scientific status | Peer-reviewed empirical, independently validated model, technical/government analysis, local cost record, or illustrative assumption |
| Endpoint | Physical metric, nonmarket monetary valuation, market price, or budget cashflow; never mix silently |
| Context | Site ecosystem/management regime, reference condition, geography, study scale, spatial resolution |
| Normalization | Units (e.g., 2021 USD/acre/year or 2025 USD/acre/mowing), original dollar year and explicit conversion if used |
| Comparison | No-action/baseline scenario, treatment scenario, stage of establishment and same-services method |
| Uncertainty | Study range/CI classification, sensitivity assumptions, unmodeled items and restrictions |
| Reproducibility | Formula/model version, input values, transformations and automated test where practical |
| Publication decision | Reference only, conditional scenario, local estimate, observed outcome, or exclude |

## Source-specific decisions (October 2026)

**Texas A&M AgriLife / AECOM, *Ecosystem Service Values for Texas* (August 2025):** Retain its published grassland/prairie **$1,941/acre/year in 2021 USD** as a *Texas literature-derived reference*, not site-measured value or claimed restoration increment. Table 3 (printed p.22) lists contributing studies and source-service amounts. Do not silently substitute the study's broader urban/wetland values for maintained turf or detention-pond edge.

https://agrilife.org/gift/files/2025/08/Ecosystem-Service-Values-for-Texas_FINAL-August-2025.pdf

**Kyle February 18, 2025 City Council statement:** The **$40–$70 per acre per mowing cycle** figure can be offered as a clearly labeled *reported local scenario range*, not an audited contractor market mean. The **$55 midpoint** is arithmetic only; mow counts are editable assumptions. For actual claimed savings, require documented historical cost and frequency, new mowing/management expenses, and attribution to the site.

https://kyletx.new.swagit.com/videos/335169

**Janke, Tyndall & Bradbury (2021), Journal of Fish and Wildlife Management:** The 10-year Corn Belt modeled lawn/pollinator costs are **peer-reviewed comparison context only** and must not be prefilled as a local Hays County quote.

https://doi.org/10.3996/JFWM-20-075

**Waterleaf Park (2026 promotional poster):** The original creator's **$2,245/acre/year ecosystem value, $894/acre herbicide+seed cost, $720/acre/year mowing cost, $700/acre/year avoided mowing, and $7,941/acre three-year 'return'** are *historical reported estimates lacking validated underlying source calculations*. They are not approved as scientifically validated inputs or a realized cash benefit. A different publication with a similar figure cannot fix the absence of project-specific underlying calculations. Preserve only in a clearly labeled historical appendix with attribution, limitations and arithmetic reconciliation, not the live user calculator. The internal 5.01-acre seeding log documents an operational activity, not the financial or ecological results.

The poster's 3.6-acre claim and $23,823 whole-project 3-year total do not reconcile arithmetically with its $7,941/ac reported total (3.6 × 7,941 = 28,587.60). This discrepancy must remain explicit if the poster is discussed.

## How to make a defensible comparison

For a selected area, show:

1. **Documented maintenance expenditure** or *user-adjustable hypothetical mowing scenario*, labeled as such.
2. **Installation and continuing restoration management expenses** if verifiable; otherwise show as unavailable/user entered.
3. **Published ecosystem-service reference amounts**, with service breakdowns and limitations, not incremental gains.
4. **Incremental ecological outcomes** only if baseline and restored scenarios are evaluated in comparable research or configured physical models.
5. **Net present value or benefit-cost ratio** only when the streams of future benefits/costs, monetary year, discounting, counterfactual, overlaps and exclusions are explicitly defined.

A range should reflect a defensible source range or scenario sensitivity, not an invented confidence interval. Low-cost/expensive scenarios are allowed if each assumption is explicit and users can change it.

## Governing methods and review requirements

- US EPA (2024), *Guidelines for Preparing Economic Analyses*, Third Edition, especially chapters 5, 6, 7.4, and 11: https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P101CYXL.TXT
- USGS-hosted peer-reviewed overview: Richardson et al. (2015), *The role of benefit transfer in ecosystem service valuation*: https://pubs.usgs.gov/publication/70148580

**Release gate:** A future change to monetary defaults requires (i) original-study readback, (ii) baseline and benefit-overlap review, (iii) explicit approval status in EVIDENCE_REGISTER.md, (iv) reproducible calculation/test, and (v) review of the exact public wording. If these cannot be met, omit the point estimate and explain why.

**This standard does not assert that every existing category is site-valid.** National fallback and other conditional land cover coefficients remain references pending independent suitability review.
