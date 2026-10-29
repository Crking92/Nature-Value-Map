# Nature Value Map — Hays County biodiversity and habitat monitoring protocol

**Status:** Scientific field-data design and publication gates. No biodiversity dollars, universal host counts or "habitat quality %" are automatically created.

## Core question

For a given measured landscape, what **changed** in native plant composition, vegetation structure, specialist resources and observed insects/wildlife after restoration, compared with the existing no-action trajectory? A native plant label alone is not a calibrated biodiversity index.

## External methodological basis

1. [NatureServe Ecological Integrity Assessment](https://www.natureserve.org/products/ecological-integrity-assessment): a multi-metric framework based on ecosystem composition, vegetation structure/function, soil, hydrology and landscape context. Its metrics depend on ecosystem type and reference condition. Avoid inventing an all-site **0–100** score from four casual checkbox observations.
2. [BLM Describing Indicators of Rangeland Health (2024)](https://www.blm.gov/noc/blm-library/technical-reference/describing-indicators-rangeland-health): a standardized descriptive protocol for 17 indicators. This protocol **does not itself rate departure from a reference** or translate indicators to ecosystem-service dollars.
3. [BONAP North American Plant Atlas (NAPA)](https://www.bonap.net/NAPA/): county-level native/range screening for specific taxa; map records do not prove an individual property hosts a native wild-type plant or whether local insect host networks are present. Record names, synonym handling, county, and source revision date (the NAPA site lists 2014 material).
4. Narango, Tallamy & Marra (2018), [PNAS](https://doi.org/10.1073/pnas.1809259115): evidence from an **eastern U.S. residential bird/arthropod study** linking greater native plant biomass with improved chickadee reproduction. This is **not** proof of a universal Hays County threshold, bird response, insect abundance or annual dollar value.

## Repeatable Hays County field workflow

1. **Site and sampling unit:** record georeferenced area and photos, site ID, ecoregion/soil context, land-use history, date and recent weather. Record baseline state **before conversion**, then continue in comparable seasons and years. Avoid cherry-picking flower peaks against dormant turf.
2. **Vegetation species and abundance:** identify species or flag uncertain taxa, record scientific name, confidence, native-range verification status (BONAP NAPA county plus other taxonomic/voucher sources), cultivated selections/provenance where known, estimated cover by stratum/quadrat, bare ground, litter, dominance, and invasive species.
3. **Habitat resources:** record woody/herb/grass layers, seasonality of flowering/seedheads, available larval hosts for **verified local insects**, contiguous habitat, shelter and disturbance. Plant count does not equal number of specialist insects supported.
4. **Insects and wildlife:** establish fixed timed counts/transects or repeated standardized photo/observation windows, weather/time-of-day and observer effort. Define specific taxa/guilds, separate direct observations from anticipated host relationships. Include non-detections and observation effort.
5. **Experimental design:** compare treatment vs reference/control sites where feasible, account for different starting conditions and weather, replicate when possible; separate natural seasonal changes from management effects.
6. **Annual field review:** show actual measured native cover, invasive cover, verified species richness, flowers by season, and observed target insects, with sample effort and uncertainty/limitations. Do not translate to a universal ecosystem-dollar score.

## Recommended dataset fields

| Record | Required columns | Why |
| --- | --- | --- |
| Site | site_id, polygon_ref, county, ecoregion, soils, baseline_management, treatment, seeded_date | Defines the habitat and comparison |
| Plant survey | site_id, visit_date, quadrat_id, scientific_name, taxon_confidence, native_status_source, native_status, source_provenance, cover_pct, life_form, flowering | Species and abundance, not just checklist |
| Wildlife survey | site_id, visit_date, protocol_id, duration_min, weather, observer_count, taxon_name, count, observed_or_inferred | Makes repeat visits comparable |
| Ecological reference | study_id, tested_location, sampled_species, endpoint, effect_size, uncertainty, study_design, DOI | Prevents unsupported transfer to local host counts |
| Review | site_id, reviewer, date, classification_questions, limitations, future_survey | Documents uncertainty and decisions |

Where a field is unknown, record **unknown**, not zero.

## Publication decisions

- **Ready to present:** raw documented counts/richness *from a field survey* with site, time and effort; known plant host relationships **when original evidence is linked**; county native-range status as a screening result with limitations.
- **Not ready:** estimated number of insects fed, arbitrary "native plant benefit" scores, an assumed percentage of wildlife improvement, generalized dollar value of host plants without an accepted benefit valuation.
- **Requires independent review:** model assigning locally measured habitat-quality index or quantified biodiversity benefit for mixed sites. NatureServe's methods may inform a tailored local rubric, but an expert must define reference ecosystems and validation before claims are published.

**In particular:** do not assume all native cultivars have zero value, nor that each cultivated form has the same value as a locally wild-type plant. Record provenance and use species-/trait-specific research where available.
