# Core Concepts

Definitions of groups, account pools, and inference credits, and the stages at which a request can be rejected.

## Terminology

| Term | Meaning |
| --- | --- |
| Inference credit `🍥` | The billing unit; account balance and subscription allowances are both measured in it |
| Group | A set of models with its own multiplier and capacity |
| Multiplier | The factor a group applies to a model's base price |
| Account pool | The set of upstream accounts a group maps to |
| Scope | Whether a key belongs to an individual or a team, which determines who pays |
| Composite key | A key bound to several groups, distinguished by prefix |

## Groups

A group determines the available models, the billing price, and the upstream accounts that serve the request.

An API key must be assigned to a group at creation. A regular key binds to exactly one group; use a [composite key](/en/docs/tokenflux/composite-key) to use several at once.

The multiplier applies to a model's base price. Prices shown in the [model marketplace](https://tokenflux.dev/models) already include it and are the final billing prices.

A group is a property of an API key and is unrelated to the account's subscription plan (Lite, Plus, Pro, and so on).

### Groups That Need Attention

One account pool can map to several groups. Take the `ChatGPT Pro` pool:

| Group | Difference |
| --- | --- |
| `ChatGPT Pro` | Codex only |
| `ChatGPT Pro (不限客户端)` | No client restriction |
| `ChatGPT Pro (负载均衡)` | Load balanced, most stable |

The names are similar but the restrictions are not. Read the group description in the model marketplace before choosing.

## Account Pools

An account pool is the set of upstream accounts a group maps to. The `Pro` pool includes Pro models and may receive higher priority when the service is under load; otherwise it is no different from the `Plus` pool.

Account type affects which features are available. Forcing [Fast Mode](/en/docs/tokenflux/fast-mode) on requires an OpenAI or Anthropic platform account, and Anthropic accounts must use API key credentials; Bedrock, Vertex, and OAuth credentials are skipped silently.

## API Keys

A key has two independent properties.

**Scope** determines who pays and cannot be changed after creation.

| Scope | Paid by | Available groups come from |
| --- | --- | --- |
| Personal | You | Your own group entitlements |
| Team | The team owner | The owner's group entitlements |

**Type** determines how the group is specified.

| Type | Groups bound | Model ID format |
| --- | --- | --- |
| Regular | 1 | `model-id` |
| [Composite](/en/docs/tokenflux/composite-key) | Up to 20 | `prefix/model-id` |

## Cost Calculation

A request is billed as input, output, and cache, each at the rate of the group the request actually hit. For composite keys, that is the group matched by the prefix.

Subscriptions are consumed before balance: the allowance expiring soonest is used first, and the account balance is charged only when no subscription is available.

[Fast Mode](/en/docs/tokenflux/fast-mode) uses the high-priority tier and costs roughly twice the regular rate.

## Where a Request Is Rejected

When a request fails, check in the following order:

| Stage | What to check |
| --- | --- |
| Key | Exists, not disabled, not expired. Team keys also require both the member and owner accounts to be active and the team not suspended |
| Group resolution | Composite keys need a prefix on the model ID, and the prefix must exist in the mapping, otherwise `COMPOSITE_KEY_*` is returned |
| Model permission | Whether the model belongs to that group |
| Endpoint support | Composite keys do not support WebSocket / Realtime endpoints |
| Quota | Account balance, subscription allowance, and a team member's daily / weekly / monthly limit - any shortfall rejects the request |
| Upstream | Only after all of the above does the request reach the model provider |

TokenFlux does not offer embedding models.

For the status code and message behind each case, see [Error Codes](/en/docs/errors).

## Related Pages

- [Troubleshooting](/en/docs/troubleshooting) - locate a problem by symptom when a request fails
- [Create API Key](/en/docs/tokenflux/create-apikey) - pick a group and generate a key
- [Billing](/en/docs/tokenflux/billing) - multipliers, subscriptions, and top-ups
- [Composite Key](/en/docs/tokenflux/composite-key) - use several groups from one key
- [API Endpoints](/en/docs/tokenflux/endpoints) - the address your client needs
