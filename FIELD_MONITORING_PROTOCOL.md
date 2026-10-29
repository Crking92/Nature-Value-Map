# Nature Value Map — Hays County repeatable vegetation and soil field recording

**Version 1.0 · October 29, 2026 · Demonstration monitoring protocol, not a certified BLM AIM or NatureServe EIA implementation.**

## Scientific foundations

- [BLM Monitoring Manual for Grassland, Shrubland and Savanna Ecosystems, 2nd ed.](https://www.blm.gov/noc/blm-library/technical-reference/monitoring-manual-grassland-shrubland-and-savanna-ecosystems) documents photo points and line-point intercept. Full BLM line-point intercept records species and layers, **not just the first encountered category**.
- [USDA NRCS Field Book for Describing and Sampling Soils v4.0 (2024)](https://www.nrcs.usda.gov/resources/guides-and-instructions/field-book-for-describing-and-sampling-soils) describes standardized soil/site observations, not a shortcut to measuring compaction, infiltration or hydraulic properties.
- [US Forest Service Photo Point Monitoring Handbook (2002)](https://doi.org/10.2737/PNW-GTR-526) requires repeatable photo-point location, orientation, weather/season and technique.
- [NatureServe Ecological Integrity Assessment](https://www.natureserve.org/products/ecological-integrity-assessment) relates condition to vegetation, soils, hydrology and landscape/reference context. Our first-hit counts are not an official NatureServe index.

## Simplified first-hit sampling

The field page supports **one mutually exclusive first-hit category per sampled point**: native live plant; introduced invasive live plant; other introduced live plant; litter/dead vegetation; rock/biological crust; bare soil; or unknown. Establish a repeatable transect or sample grid, apply one consistent vertical pin rule at each point, and tally the **first encountered category from above**. If a plant cannot reliably be classified as native or introduced, use unknown. If no live plant is encountered, record the visible first encountered substrate, or unknown when uncertain. Record your rule application in notes.

**Do not call this full BLM line-point intercept sampling.** This adaptation deliberately omits multiple intercepted plant strata, species identity at every interception, separated ground and canopy contacts, vegetation height and soil stability. It is a simple monitoring record, not an all-in ecological score, whole-site botanical inventory or validated biodiversity metric.

## Repeatable crew procedure

1. Assign stable site and plot/transect IDs and a relocatable point description. Keep detailed GPS/maps securely offline if needed. Document orientation, number of sampling points and spacing, and non-biased plot placement.
2. Record date, observer/team code, field condition, treatment stage, season and photo reference. Repeat at the same points or with a documented design. A seasonal change is not automatically a restoration effect.
3. Classify every sampled point into exactly one of the seven categories. Counts are whole numbers, and **all categories must have explicitly entered counts**. Enter 0 only if actually observed zero hits; leave blank to indicate not measured.
4. Native-status labels are provisional until checked against botanical references or vouchers. The form requires a source when verification is claimed. BONAP county-range data may assist screening but does not prove origin or wild-type provenance of every observed plant.
5. If recording an NRCS soil map unit, preserve source and date. Visual dry/moist or disturbed soil is **not** a calibrated infiltration or compaction measurement.
6. Repeat comparable seasons and sampling effort; document disturbances, rain, management and uncertainties. For ecological gain claims, use baseline plus follow-up and ideally control/reference plots, with an appropriate sampling/statistical design and independent review.
7. Validate then export JSON (complete schema) or CSV (single visit row) to the user's device. **The website does not upload, store or automatically sync these observations.**

## Calculation and interpretation

**Observed first-hit proportion (percent) = 100 × category first-hit count / total first-hit sampling points**, including unknowns in the denominator. The module performs no acreage extrapolation. It does not calculate uncertainty intervals or attempt to prove that sample points represent an entire park.

**Unknown ≠ zero.** Blank inputs cannot produce a field record; claimed zero must be explicitly entered. Missing site-specific ecosystem-service dollars, runoff improvements, carbon flux, soil hydraulic measures, calibrated sitewide native cover and habitat quality remain unestimated.

## Scientific review conditions

Before interpreting time-series changes as ecological gains, document treatment geometry and history, consistent methodology and timing, sufficient and representative sampling effort, native-status identification, baseline comparison, relevant confounders (rain, mowing, disturbances), uncertainty, and qualified review. No first-hit observation by itself proves additional water retention, ecological service value, carbon change, or wildlife benefit.

This module is intended for Hays County crew repeatability and educational site-monitoring preparation, **not legal wetland delineation or scientific certification**.
