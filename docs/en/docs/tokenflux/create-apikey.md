# Create API Key

You need to create an API key before using TokenFlux.

**Go directly to the creation page: [https://tokenflux.dev/keys](https://tokenflux.dev/keys)**

## Steps

1. Sign in and open the [API keys page](https://tokenflux.dev/keys).
2. Click the `Create Key` button in the upper-right corner.
3. Enter a recognizable name, such as `cherry-studio` or `cc-switch`.
4. Check the model, protocol, and client restrictions under [Choosing a Group](#choosing-a-group), then pick a group. The dropdown shows each group's multiplier and current capacity.
5. Create the key, copy the generated value, and store it safely (you can also view or copy it later in the key list).

<div style="text-align: center;">
  <img src="/images/create-apikey/create-dialog.png" alt="TokenFlux create key dialog with a name entered and the group dropdown open, showing multipliers and capacity" />
</div>

## Choosing a Group

Find the target model in the [model marketplace](https://tokenflux.dev/models) and check:

| Check               | Selection criteria                                                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Model               | The group includes the full model ID you intend to call                                                                                                                        |
| Protocol            | The group supports the client's API; check the [client guide](/en/docs/quickstart#client-options) and [API Endpoints](/en/docs/tokenflux/endpoints), not just the model vendor |
| Client restrictions | The group description allows your client; client-restricted groups are not suitable for other tools                                                                            |
| Price and capacity  | Check the group's final unit prices, multiplier, and current capacity; see [Billing](/en/docs/tokenflux/billing) for calculations                                              |

An ordinary key belongs to one group. For several groups, create separate keys or use a [composite key](/en/docs/tokenflux/composite-key) and select models with prefixes. Subscription plan names are not group names.

## Key Security

Create separate keys for different clients so you can identify and disable them individually. Do not commit keys to a repository, embed them in a public web frontend, or share them. If a key leaks, disable it immediately on the keys page, create a replacement, and update the client configuration.

## Next Steps

- [API Endpoints](/en/docs/tokenflux/endpoints) - the API address to enter in your client
- [Quickstart](/en/docs/quickstart) - choose an integration path based on your workflow
- [Cherry Studio Guide](/en/docs/chatbot/cherry-studio) - desktop AI chat client
- [RikkaHub Guide](/en/docs/chatbot/rikkahub) - Android AI chat client
- [CC-Switch Guide](/en/docs/agents/cc-switch) - configuration manager for Claude Code and Codex
