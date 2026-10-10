# FAQ

For failed requests or a client that cannot connect, see [Troubleshooting](/en/docs/troubleshooting). For groups, account pools, inference credits, and other terms, see [Core Concepts](/en/docs/concepts).

## How do I get in touch about enterprise integration?

An enterprise group is now open. For enterprise integration, API integration, or partnership enquiries, join QQ group `794504445`.

## Why do model detection sites report a high fake rate?

Model detection sites and leaderboards are not fully reliable. Some suffer from paid rankings, sample bias, or opaque detection methods. Models called through aggregators such as OpenRouter are also frequently misclassified as "fake" by these tools.

Treat the results as a reference only, not as the sole basis for judging whether a model is genuine.

## Which group covers image generation?

For image generation through the API, choose a group based on the model you need:

| Group           | Example models                                                 |
| --------------- | -------------------------------------------------------------- |
| `ChatGPT Image` | `gpt-image-2`, `gpt-image-2.5-flare`, `gpt-image-2.5-sunburst` |
| `Google Image`  | `gemini-3.1-flash-image`, `nano-banana-pro`                    |
| `Grok Image`    | `grok-imagine-image-2.0`                                       |

Select the corresponding group when creating an API key. Check the [model marketplace](https://tokenflux.dev/models) for the full model list and current multipliers. In the web [Creative Studio](/en/docs/tokenflux/creative), select a model directly; no API key is needed.

A group without image generation returns 403 `Image generation is not enabled for this group`, see [Error Codes](/en/docs/errors#group-capabilities).

## How can I generate images?

- **Web Creative Studio**: Visit the [TokenFlux Creative Studio](https://tokenflux.dev/creative) directly. Generate images online with no API setup or client downloads required.
- **Android**: [RikkaHub](/en/docs/chatbot/rikkahub) has a dedicated image generation entry; see the "Image Generation" section on that page.
- **Desktop**: [Cherry Studio](/en/docs/chatbot/cherry-studio) - after connecting, pick an image model from the model list and send a prompt in the chat window.
