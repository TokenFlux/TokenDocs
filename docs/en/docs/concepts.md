# Core Concepts

Groups, account pools, and inference credits come up throughout these docs. This page explains what they are and where a request can be rejected.

## Terminology

| Term | Meaning |
| --- | --- |
| Inference credit `🍥` | The billing unit. Account balance and subscription allowances are both measured in it |
| Group | A set of models with its own multiplier and capacity |
| Multiplier | The factor a group applies to a model's base price |
| Account pool | The upstream accounts behind a group |
| Scope | Whether a key belongs to you or to a team, which decides who pays |
| Composite key | One key bound to several groups, selected by prefix |

## Groups

A group decides three things: which models you can call, what you are charged, and which upstream accounts serve the request.

You must pick a group when creating an API key. The dropdown shows each group's multiplier and current capacity. A regular key binds to exactly one group; use a [composite key](/en/docs/tokenflux/composite-key) when you need several at once.

The multiplier applies to a model's base price, but the prices shown in the [model marketplace](https://tokenflux.dev/models) already include it. That is the final billing price - do not multiply again.

::: tip Groups Are Not Plans
A group is a property of an API key. A subscription plan (Lite / Plus / Pro and so on) is a property of your account. They are unrelated.
:::

### Groups That Need Attention

One account pool can back several groups. Take the `ChatGPT Pro` pool:

| Group | Difference |
| --- | --- |
| `ChatGPT Pro` | Codex only |
| `ChatGPT Pro (不限客户端)` | No client restriction |
| `ChatGPT Pro (负载均衡)` | Load balanced, most stable |

Read the group description in the model marketplace before picking one - the names are similar but the restrictions are not.

## Account Pools

An account pool is the set of upstream accounts behind a group. The `Pro` pool includes Pro models and may get higher priority when the service is under load. Otherwise it is no different from the `Plus` pool.

Account type affects which features are available. Forcing [Fast Mode](/en/docs/tokenflux/fast-mode) on requires hitting an OpenAI or Anthropic platform account, and Anthropic accounts must use API key credentials - Bedrock, Vertex, and OAuth credentials are skipped silently.

## API Keys

A key has two independent properties.

**Scope** decides who pays, and cannot be changed after creation.

| Scope | Paid by | Available groups come from |
| --- | --- | --- |
| Personal | You | Your own group entitlements |
| Team | The team owner | The owner's group entitlements |

**Type** decides how the group is selected.

| Type | Groups bound | Model ID format |
| --- | --- | --- |
| Regular | 1 | `model-id` |
| [Composite](/en/docs/tokenflux/composite-key) | Up to 20 | `prefix/model-id` |

## How Cost Is Calculated

A request is billed as input, output, and cache, each at the rate of the group the request actually hit. For composite keys, that is the group matched by the prefix.

Subscriptions are consumed before balance: the allowance expiring soonest is used first, and the account balance is charged only when no subscription is available.

[Fast Mode](/en/docs/tokenflux/fast-mode) uses the upstream high-priority tier and costs roughly twice the regular rate.

## Where a Request Can Be Rejected

When a request fails, check in this order:

| Stage | What to check |
| --- | --- |
| Key | Exists, not disabled, not expired. Team keys also require both the member and owner accounts to be active and the team not suspended |
| Group resolution | Composite keys need a prefix on the model ID, and the prefix must exist in the mapping, otherwise `COMPOSITE_KEY_*` is returned |
| Model permission | Whether the model belongs to that group |
| Endpoint support | Composite keys do not support WebSocket / Realtime endpoints |
| Quota | Account balance, subscription allowance, and a team member's daily / weekly / monthly limit - any shortfall rejects the request |
| Upstream | Only at this point is the request sent to the model provider |

TokenFlux also does not offer embedding models.

## Related Pages

- [Create API Key](/en/docs/tokenflux/create-apikey) - pick a group and generate a key
- [Billing](/en/docs/tokenflux/billing) - multipliers, subscriptions, and top-ups
- [Composite Key](/en/docs/tokenflux/composite-key) - use several groups from one key
- [API Endpoints](/en/docs/tokenflux/endpoints) - the address your client needs
