# Nature Value Map — Runoff model evidence protocol (v1, 2026-10-29)

**Status:** data-intake + unit conversion only. Nature Value Map does **not** run SWMM or EPA's Stormwater Calculator, download observed rainfall, estimate infiltration, certify a property, predict avoided flooding, or assign an economic value to runoff reduction.

## Authoritative model basis

1. US EPA, [National Stormwater Calculator (SWC)](https://www.epa.gov/water-research/national-stormwater-calculator), updated May 18, 2026. Web application version **3.4.0** (August 2022). Its hydrology engine is EPA SWMM. EPA describes hydrology analysis for **sites under 12 acres**, although its explanatory material also discusses screening-level uses for sites with uniform soils of larger size. **Conservative public policy here: block SWC-labeled entries for areas 12 acres or more** and refer complex/big projects to properly configured SWMM or another documented model.
2. US EPA, [SWMM hydrology and model documentation](https://www.epa.gov/water-research/storm-water-management-model-swmm). SWMM requires appropriate hydrology and drainage/network assumptions; this site does not implement it.
3. US EPA, [National Stormwater Calculator web app user guide (2022), version 3.4.0](https://www.epa.gov/system/files/documents/2022-08/National%20Stormwater%20Calculator%20Web%20App%20User%20Guide-Version%203.4.0.pdf), results screen reports **average annual runoff (inches)** based on multi-year hourly rainfall history and user-selected site settings.
4. USGS, [Rain and Precipitation](https://www.usgs.gov/water-science-school/science/rain-and-precipitation), **1 acre-inch ≈ 27,154 US gallons**. The conversion is geometric, not an infiltration or retention model.
5. USDA NRCS [Web Soil Survey](https://www.nrcs.usda.gov/resources/data-and-reports/web-soil-survey). Soil map units and their limitations are relevant to model preparation but do not verify a site's infiltration, compaction, or hydraulic conductivity.

## Accepted inputs for a comparative display

Users must supply *both* externally produced values for **average annual runoff depth** in **inches per year**, not rainfall depth, instantaneous discharge or peak runoff. The application accepts:

- Positive finite site acreage, ideally from verified GIS/delineation;
- Model identifier (EPA SWC web 3.4.0 or other documented hydrologic model, including SWMM);
- Original model run/report reference and version or identifying metadata, not a bare screenshot without parameters;
- Baseline average annual runoff (in/year, nonnegative);
- Restored scenario average annual runoff (in/year, nonnegative);
- Affirmation that results use the same site footprint, relevant climate/rainfall record, and comparable analysis parameters, with intended treatment changes documented.

The site performs only:

\[
\text{Runoff depth difference (in/year)}
  = \text{baseline (in/year)}-\text{restored (in/year)}
\]

\[
\text{Equivalent annual volume difference (US gallons/year)}
  = \text{depth difference (in/year)}\times\text{site acres}\times 27{,}154\ \frac{\text{gallons}}{\text{acre-inch}}
\]

Positive values indicate **less modeled runoff**, negative values **more modeled runoff**. Values are rounded only for display, so they are not a measure of certainty or a field observation. These are **user-reported model outputs**; the tool does not verify whether a model was actually run or whether the assumptions are appropriate.

## What reviewers should check before promoting a result

- Both scenarios describe the exact same **nonoverlapping, correctly measured area**, date and relevant site inputs; model/software version recorded.
- Historical precipitation duration and location are the same; climate scenario choices match and are documented.
- Appropriate soils, impervious cover, slope, land cover, drainage connectivity, irrigation and vegetation states are represented.
- Native-restoration impacts are represented as **justified land-cover or hydrologic parameter changes**, not an assumed fixed infiltration percentage.
- For infiltration/soil restoration, field-compaction and soil observations validate assumptions where possible.
- Sensitivity analysis covers soil uncertainty, climate, rainfall record, initial conditions and establishment/maintenance state.
- Model output identifies annual runoff depth, **not peak flow**, streamflow or rainfall depth. Stormwater retention is not automatically the same as groundwater recharge, preserved water supply or flood losses avoided.
- A separate economic valuation is required before claiming money saved from flooding or water quality. AECOM statewide flood and water service dollar components must not be added to modeled avoided water damages without checking overlap.

## Publication label

**"User-reported external-model comparison; unverified by Nature Value Map."**

No parcel-level hydrologic claim may be called independently modeled or scientifically confirmed merely because the input validation passed. For official use, retain the complete run file or report with independently checked parameters and version, plus uncertainties and any measured validation.

## Known limitations

- SWC is optimized for comparing particular LID practices (rain gardens, infiltration basins, etc.); it is **not a validated native-prairie-versus-mown-turf calibration** by default.
- A user with a completely external documented hydrology model can provide depths from larger sites; this app does not certify that model's suitability.
- The site does not verify spatial location/soil map via API or estimate local groundwater recharge from a runoff difference.
- Model output record can be saved separately by the user; at present inputs are **not exported or permanently recorded**.
