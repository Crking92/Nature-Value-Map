# Nature Value Map — reproducible Hays County site-assessment demonstration

This directory contains **machine-readable source records**, not a scientific study's results.

- [Waterleaf evidence data](waterleaf-evidence.json) holds externally published City of Kyle reports, internally logged operational observations labeled **not publicly auditable**, and intentionally empty result fields.
- [Blank site template](site-template.json) contains required fields for another site, with unknown inputs set to \`null\`, not zero.
- [Public walk-through](../assessment.html) explains why a restored native meadow cannot be assigned runoff, carbon, wildlife, or financial benefits from area alone.

The publicly reported **5 acres assessed** in 2025 is different from **5.01 acres logged as seeded** across two management units, and the promotional poster's **3.6 acres used for an estimated financial illustration**. They must not be treated as identical polygons without source maps.

## To add a new verified number

1. Record a direct original source, date, table/page or model output, author and type of evidence.
2. Identify the **actual outcome** (e.g., reported acres assessed vs surveyed treatment acreage vs gallons of runoff compared with baseline).
3. Preserve units, date/year, spatial extent, model/version, uncertainty and source-to-claim relation.
4. Distinguish **documented activity** from **verified measured effect**. A seeding log can show that work was recorded, not that biodiversity increased.
5. If output is quantified, obtain an original public source or verified export, the external method and appropriate qualified scientific review. Update this directory's schema and \`tests/verify-assessment.cjs\` deliberately; never just fill a previously blank output with a plausible number.
6. Keep internal/personal staff information out of public files. If a work record cannot be released, describe it as internally logged and not publicly auditable.

## Verification

Run \`node tests/verify-assessment.cjs\`; GitHub Actions checks the source/grade consistency, absence of invented environmental outputs, preserved area distinctions and webpage citations. Such checks cannot establish that a source is scientifically valid or the site's ecological outcome was measured.

The [Nature Value Map publication standard](../PUBLICATION_STANDARD.md), [runoff model protocol](../RUNOFF_MODEL_PROTOCOL.md), [carbon protocol](../CARBON_EVIDENCE_PROTOCOL.md) and [biodiversity monitoring protocol](../HABITAT_MONITORING_PROTOCOL.md) govern additional metrics.
