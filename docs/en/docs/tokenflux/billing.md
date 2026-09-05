# Billing

TokenFlux uses `🍥` inference credits as the billing unit. **Prices shown in the [model marketplace](https://tokenflux.dev/models) are the final billing prices.**

## How Prices Are Calculated

Token-billed models charge for input, output, and cache usage. Check both the unit and the applicable context-length tier; `1M Token` in the marketplace means 1,000,000 tokens. Other billing methods, such as image pricing, follow the individual model's price description.

### Group Multiplier

Different API key groups may have different multipliers. The multiplier is applied to the model's base price, and the marketplace already shows the adjusted price, which is what you pay.

<div style="text-align: center;">
  <img src="/images/billing/model-pricing.png" alt="Group multiplier badge in the model marketplace, with per-model input and output prices that already include the multiplier" />
</div>

Multipliers and client restrictions differ from group to group. Check [Core Concepts](/en/docs/concepts#groups-that-need-attention) and the group description in the model marketplace before choosing.

A group is a property of an API key and is unrelated to the subscription plans below (Lite, Plus, Pro, and so on). The names are similar but the two are different things.

**Example**

These hypothetical prices are not a current quote for any model. All prices are in inference credits per 1M tokens:

| Item   | Base price | Group multiplier | Final unit price |
| ------ | ---------- | ---------------- | ---------------- |
| Input  | 2.5        | 1.3              | 3.25             |
| Output | 15         | 1.3              | 19.5             |

Suppose a request has 10,000 input tokens and 2,000 output tokens, with no cache usage or Fast Mode, and all tokens fall within the price tier above:

```text
Input cost = 10,000 / 1,000,000 × 3.25 = 0.0325 inference credits
Output cost = 2,000 / 1,000,000 × 19.5 = 0.039 inference credits
Total = 0.0715 inference credits
```

For actual calculations, use the final prices in the [model marketplace](https://tokenflux.dev/models), which already include the multiplier. For cached requests, check whether the protocol's input count includes cached tokens and which cache read/write prices apply, so overlapping counts are not added twice. Refer to the [usage logs](https://tokenflux.dev/usage) for actual charges.

Inference credits are not CNY amounts. Check the amount payable and the allowance received on the [top-up/subscription page](https://tokenflux.dev/purchase); transaction fees are described below.

## Purchase Methods

Both are bought on the [top-up/subscription page](https://tokenflux.dev/purchase).

### Subscription

Usually cheaper, valid for 30 days. Eight tiers, from lowest to highest: `Lite`, `Lite+`, `Plus`, `Plus+`, `Pro`, `Pro+`, `Max`, `Max+`. Daily limits, monthly limits, and prices are listed on the purchase page.

Buying the same subscription again does not add a parallel one; it extends the duration, and the later purchase takes effect once the current one expires.

Once a subscription allowance is exhausted, you can revoke it directly on the subscription page without contacting an administrator. If queued subscriptions exist, the next one takes effect automatically in sequence.

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
