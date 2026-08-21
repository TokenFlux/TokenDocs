# Billing

TokenFlux uses `🍥` inference credits as the billing unit. **Prices shown in the [model marketplace](https://tokenflux.dev/models) are the final billing prices.**

## How Prices Are Calculated

A request is billed as input, output, and cache, each with its own unit price.

### Group Multiplier

Different API key groups may have different multipliers. The multiplier is applied to the model's base price, and the marketplace already shows the adjusted price, which is what you pay.

<div style="text-align: center;">
  <img src="/images/billing/model-pricing.png" alt="Group multiplier badge in the model marketplace, with per-model input and output prices that already include the multiplier" />
</div>

One account pool can back several groups whose multipliers and client restrictions differ, as with the three groups on the `ChatGPT Pro` pool. Check [Core Concepts](/en/docs/concepts#groups-that-need-attention) and the group description in the model marketplace before choosing.

A group is a property of an API key and is unrelated to the subscription plans below (Lite, Plus, Pro, and so on). The names are similar but the two are different things.

**Example**

Suppose a model's base prices are:

- Input: `2.5🍥`
- Output: `15🍥`
- Cache: `0.25🍥`

With a group multiplier of `1.3`, the final prices are:

- Input: `3.25🍥` (2.5 × 1.3)
- Output: `19.5🍥` (15 × 1.3)
- Cache: `0.325🍥` (0.25 × 1.3)

These are the prices shown in the model marketplace. Check the [model marketplace](https://tokenflux.dev/models) for actual model prices and group multipliers.

## Purchase Methods

Both are bought on the [top-up/subscription page](https://tokenflux.dev/purchase).

### Subscription

Usually cheaper, valid for 30 days. Eight tiers, from lowest to highest: `Lite`, `Lite+`, `Plus`, `Plus+`, `Pro`, `Pro+`, `Max`, `Max+`. Daily limits, monthly limits, and prices are listed on the purchase page.

Buying the same subscription again does not add a parallel one; it extends the duration, and the later purchase takes effect once the current one expires.

Several different plans can be active at once. The allowance expiring soonest is consumed first, and the account balance is charged only when no plan is available.

### Usage-Based

Billed by actual usage, with no time limit.

## Payment and Fees

Top-ups are processed through Stripe. Alipay and other former channels have all been migrated.

Each transaction carries a **fixed fee of 2.7 CNY**. The variable fee (2.2% of the transaction total) has been waived. The fixed fee does not scale with the amount, so larger single top-ups spread that cost further.

## Plan Name Mapping

::: details Former and current names
Plan names were standardised. Only the names changed - prices, allowances, entitlements, and active services are unaffected. Existing plans display under the new names automatically.

| Former name | Current name |
| ----------- | ------------ |
| Basic       | Lite         |
| Standard    | Lite+        |
| Pro         | Plus         |
| Max         | Plus+        |
| Ultra       | Pro          |
| Elite       | Pro+         |
| Enterprise  | Max          |
| Ultimate    | Max+         |

:::

## Related Pages

- [Core Concepts](/en/docs/concepts) - groups, account pools, and billing order
- [Model marketplace](https://tokenflux.dev/models) - prices for every model
- [Top-up/Subscription](https://tokenflux.dev/purchase) - buy inference credits
- [Invoices](/en/docs/tokenflux/invoice) - how invoices are handled
- [Referral Rewards](/en/docs/tokenflux/referral) - earn credits by inviting others
