# Nature Value Map — Mowing and restoration cost reproducibility protocol (v1, 2026-10-29)

## Two independent cost input approaches

1. **Simple per-acre/cut scenario.** One user-adjustable mowing rate (defaults to $55/ac/cut, the arithmetic midpoint of the City of Kyle's **reported $40–$70/ac/cut range**) multiplied by **user-entered acres × annual cuts**. The midpoint is *not a peer-reviewed, city-audited or measured market average*.
2. **Itemized user cost model.** Optionally replace the simple rate with six inputs for one mowing pass of the **entire selected site**:
   - Total crew labor-hours, summing all workers (hours per site-pass);
   - Fully loaded labor $/hour (specify benefits and payroll burden if using actual data);
   - Equipment operating hours per site-pass;
   - Equipment $/hour, documenting whether fuel, depreciation, maintenance, rentals, insurance and repairs are included;
   - Fuel/supplies per site-pass that are **not** already included in the equipment rate;
   - Other non-overlapping mobilization/transport/etc. expenses per site-pass.

\[
\text{Mowing expense per site-pass}=(h_L\times c_L)+(h_E\times c_E)+c_F+c_O
\]

\[
\text{Implied unit cost}=\frac{\text{site-pass cost}}{\text{mapped acres}}
\]

\[
\text{Gross annual mowing difference} =
\text{site-pass cost}\times(\text{current annual cuts}-\text{proposed annual cuts})
\]

If the user activates itemization, **all six inputs are required** (zeros are allowed where truly appropriate), the selected acreage must be positive, and the cost of one cut must be positive and finite. Otherwise financial outcomes are withheld; missing inputs cannot be silently replaced with zero.

**Limitations:** Costs may differ between current and proposed mowing depending on vegetation height, mobilization, mowing width, season and frequency. The current model uses the **same per-pass costs in both regimes**, a simplifying scenario assumption. To make a more defensible budget estimate, independently record current and proposed per-pass inputs or actual invoices and use an analysis that captures different costs, production rates and year-to-year changes.

## Restoration treatment and accounting

Proposed mowing costs and *other* recurring restoration management costs are distinct. The annual other-management input excludes mowing already counted separately, such as selective mow strips or yearly field cuts. Itemize herbicide, seed/plants, site preparation, irrigation, invasive removal, inspections, supplemental planting and labor as applicable.

The present ten-year output is an **undiscounted illustrative cost difference**, not a present value, economic benefit/cost ratio or realized savings figure:

\[
10\times(\text{annual current mowing}-\text{annual proposed mowing}-\text{annual OTHER management})-\text{one-time installation}
\]

It assumes constant cycles, staffing and unit costs for ten years, without inflation, discounting, establishment failure, replacement and dynamic management. Do not add ecosystem nonmarket valuation dollars to the city's operational cash savings.

## Cost evidence needed

Actual cost claims require dated receipts or work orders, total treated area, completed cycles, crew hours, loaded labor rate, equipment type and hours, fuel/repairs inclusion, overhead, vehicle mobilization, weed follow-up and year(s) of expenditure. A quote is a quote, not proof of completed expense. City-wide averages should not be treated as site-specific invoices.

Original local reported mowing statement: [Kyle City Council meeting, February 18, 2025](https://kyletx.new.swagit.com/videos/335169).
Peer-reviewed comparison context: [Janke, Tyndall & Bradbury (2021)](https://doi.org/10.3996/JFWM-20-075), Corn Belt lawn-conversion economics, with different regional costs and a discounted time horizon.
Economic methods: [EPA Guidelines for Preparing Economic Analyses, 3rd ed. (2024)](https://www.epa.gov/environmental-economics/guidelines-preparing-economic-analyses-3rd-edition).

## Future priority

A next version should support different current/proposed site-pass prices, year-specific cost schedules, user-defined horizon, price-year normalization and explicit NPV. Do not automatically create these additional outputs without completing the assumptions and validation tests.
