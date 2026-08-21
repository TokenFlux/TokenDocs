# FAQ

For failed requests or a client that cannot connect, see [Troubleshooting](/en/docs/troubleshooting). For groups, account pools, inference credits, and other terms, see [Core Concepts](/en/docs/concepts).

## How do I get in touch about enterprise integration?

An enterprise group is now open. For enterprise integration, API integration, or partnership enquiries, join QQ group `794504445`.

## Why do model detection sites report a high fake rate?

Model detection sites and leaderboards are not fully reliable. Some suffer from paid rankings, sample bias, or opaque detection methods. Models called through aggregators such as OpenRouter are also frequently misclassified as "fake" by these tools.

Treat the results as a reference only, not as the sole basis for judging whether a model is genuine.

## Which group covers image generation?

Image generation models live in the `Google Image` group, currently `gemini-3.1-flash-image` and `nano-banana-pro`. Select that group when creating an API key. The full list and multiplier are whatever the [model marketplace](https://tokenflux.dev/models) shows.

A group without image generation returns 403 `Image generation is not enabled for this group`, see [Error Codes](/en/docs/errors#group-capabilities).

## Which client should I use for image generation?

- **Android**: [RikkaHub](/en/docs/chatbot/rikkahub) has a dedicated image generation entry; see the "Image Generation" section on that page.
- **Desktop**: [Cherry Studio](/en/docs/chatbot/cherry-studio) - after connecting, pick an image model from the model list and send a prompt in the chat window.
