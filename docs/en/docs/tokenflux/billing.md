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

#### Pro Subscription Group

The `Pro` subscription group currently applies only to `Codex App` and `Codex CLI`. If you use any other integration method, do not choose the Pro group.

#### Data Sharing Group

The `Data Sharing` group offers lower prices in exchange for selling de-identified request, response, and related call data. By using this group, you agree that the relevant data may be submitted to partners or data buyers after de-identification for data analysis, model improvement, evaluation, or other purposes clearly stated on the product page.

If a group involves data sharing or data sale, TokenFlux will clearly disclose it in the model marketplace, purchase page, API key group description, or other product descriptions. It will not be enabled through default groups, hidden options, or vague descriptions.

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

When purchasing the same subscription repeatedly:

- It does not create multiple parallel copies of the same subscription.
- It effectively extends the duration.
- The later purchase takes effect after the previous subscription expires.

### Usage-Based Purchase

Usage-based purchases have no time limit and are billed by actual usage.

Go to the [top-up/subscription page](https://tokenflux.dev/purchase) to complete the purchase.

## Related Links

- [Model Marketplace](https://tokenflux.dev/models) - view prices for all models
- [Top-up/Subscription](https://tokenflux.dev/purchase) - purchase inference credits
- [Invoices](/en/docs/tokenflux/invoice) - learn how invoices are handled
<!-- - [Referral Rewards](/en/docs/tokenflux/referral) - invite friends and earn rewards -->
