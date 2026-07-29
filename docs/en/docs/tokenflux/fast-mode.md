# Fast Mode

Fast mode requests a higher-priority capacity tier upstream, which means shorter queuing and faster responses. You can now force it on directly at the API key level, with no client-side changes.

This is especially handy for the `Codex` desktop app: its interface has no Fast toggle, so previously the only way was a plugin that rewrote requests. Setting the key policy to force it on achieves the same thing, with **no plugin required**.

::: warning Roughly 2x the cost
Fast mode uses the upstream priority pricing tier, so charges are about **2x** those of regular mode. Make sure that is what you want before enabling it.
:::

## How to Set It

1. Open the [API keys page](https://tokenflux.dev/keys).
2. Create a new key, or click `Edit` on an existing one.
3. Find `Fast mode policy` and pick an option.
4. Save.

<div style="text-align: center;">
  <img src="/images/fast-mode/policy-select.png" alt="Fast mode policy dropdown in the TokenFlux key form, with follow request, force Fast on, and force Fast off options" />
</div>

## The Three Options

| Option | Behavior |
| --- | --- |
| `Follow request` (default) | Passes through whatever the client sent, adding and removing nothing |
| `Force Fast on` | Sends requests as Fast whether or not the client asked for it |
| `Force Fast off` | Strips any Fast flag the client included |

`Force Fast off` removes only the Fast flag. It leaves other priority settings such as `flex`, `auto`, `default`, and `scale` untouched.

## Scope

The setting applies to **every request made with that key**, not just Codex. Regular chat completions, Responses, and Anthropic-format requests are all covered.

Changes take effect **immediately**. Even on long-lived WebSocket connections, the new policy is picked up on the next turn - no reconnect or client restart needed.

## When Force On Does Not Apply

`Force Fast on` has prerequisites. When they are not met it is **silently skipped**: no error, and the request goes out in regular mode.

- The key is not currently routed to an OpenAI or Anthropic account
- The Anthropic account uses Bedrock, Vertex, or OAuth credentials (only API key credentials are supported)
- The current model does not support the priority tier
- A platform administrator has configured a global Fast filter or block policy

::: tip Administrator policy wins
The platform-wide Fast policy takes precedence over per-key settings. If an administrator configured filtering or blocking, `Force Fast on` cannot bypass it.
:::

## Related Links

- [Create API Key](/en/docs/tokenflux/create-apikey) - how keys are created
- [Codex Guide](/en/docs/agents/codex) - Codex integration setup
- [Billing](/en/docs/tokenflux/billing) - billing unit and group multipliers
