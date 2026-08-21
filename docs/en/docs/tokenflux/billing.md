# Billing

This site uses `🍥` inference credits as the billing unit. **Prices shown in the model marketplace are the final billing prices**, so no extra calculation is required.

## Billing Methods

This site supports two purchase methods:

- **Subscription purchase**: usually cheaper, valid for 30 days.
- **Usage-based purchase**: billed by actual usage, with no time limit.

Go to the [top-up/subscription page](https://tokenflux.dev/purchase) to choose the purchase method that fits your needs.

## How Prices Are Calculated

Model billing has three parts: input, output, and cache. Each part has its own unit price.

### Group Multiplier

Different API key groups may have different multipliers. The group multiplier is based on the original model price, but the model marketplace already shows prices after multiplier adjustments. That displayed price is what you actually pay.

<div style="text-align: center;">
  <img src="/images/billing/model-pricing.png" alt="Group multiplier badge in the model marketplace, with per-model input and output prices that already include the multiplier" />
</div>

One account pool can back several groups whose multipliers and client restrictions differ, as with the three groups on the `ChatGPT Pro` pool. Check [Core Concepts](/en/docs/concepts#groups-that-need-attention) and the group description in the model marketplace before choosing.

::: tip Groups are not subscription plans
This refers to **API key groups**, which are distinct from the subscription plan names below (Lite, Plus, Pro, and so on). Do not confuse the two.
:::

**Example**

Assume a model's original prices are:

- Input: `2.5🍥`
- Output: `15🍥`
- Cache: `0.25🍥`

When the group multiplier is `1.3`, the final billing prices are:

- Input: `3.25🍥` (2.5 × 1.3)
- Output: `19.5🍥` (15 × 1.3)
- Cache: `0.325🍥` (0.25 × 1.3)

These adjusted prices are the prices shown in the model marketplace and the final prices you pay. For specific model prices and group multipliers, see the [model marketplace](https://tokenflux.dev/models).

## Purchase Options

### Subscription Purchase

Subscriptions are usually cheaper, but they are valid for 30 days.

There are eight tiers, from lowest to highest: `Lite`, `Lite+`, `Plus`, `Plus+`, `Pro`, `Pro+`, `Max`, `Max+`. Daily limits, monthly limits, and prices for each tier are listed on the [top-up/subscription page](https://tokenflux.dev/purchase).

When purchasing the same subscription repeatedly:

- It does not create multiple parallel copies of the same subscription.
- It effectively extends the duration.
- The later purchase takes effect after the previous subscription expires.

You can hold several different plans at once. Quota from the plan expiring soonest is consumed first; when no plan quota is available, the account balance is used.

#### Plan Renaming

Plan names have been standardized to make the tiers clearer. **Only the names changed** - prices, quotas, entitlements, and active services are unaffected. Existing subscriptions display the new names automatically, with nothing for you to do.

| Old name | New name |
| --- | --- |
| Basic | Lite |
| Standard | Lite+ |
| Pro | Plus |
| Max | Plus+ |
| Ultra | Pro |
| Elite | Pro+ |
| Enterprise | Max |
| Ultimate | Max+ |

### Usage-Based Purchase

Usage-based purchases have no time limit and are billed by actual usage.

Go to the [top-up/subscription page](https://tokenflux.dev/purchase) to complete the purchase.

## Payment and Fees

Top-ups are now processed entirely through Stripe. Previous payment channels such as Alipay have been migrated to Stripe.

### Stripe Fees

Stripe fees originally consisted of two parts:

- **Fixed fee**: 2.7 CNY per transaction.
- **Variable fee**: 2.2% of the transaction total.

To give back to users, we have waived the 2.2% variable fee. After this adjustment, only the fixed fee of 2.7 CNY per transaction is charged.

### Top-up Recommendation

Because the platform pays Stripe a fixed fee of 2.7 CNY per transaction regardless of the amount, we recommend that you:

- Top up a larger amount at once to reduce the number of transactions.
- Avoid splitting into multiple small top-ups, to lower your overall top-up cost and improve fund efficiency.

## Related Links

- [Model Marketplace](https://tokenflux.dev/models) - view prices for all models
- [Top-up/Subscription](https://tokenflux.dev/purchase) - purchase inference credits
- [Invoices](/en/docs/tokenflux/invoice) - learn how invoices are handled
- [Referral Rewards](/en/docs/tokenflux/referral) - invite friends and earn rewards
