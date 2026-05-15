# FAQ

## What should I do if connections keep dropping?

If this site or related services keep disconnecting, try using a proxy first and then retry.

## Does this site support embedding models?

No.

## What is the difference between the Pro pool and the Plus pool?

The `Pro` pool includes `Pro` models. When service pressure is high, the `Pro` pool may also have higher access priority.

Other than that, there is no additional difference.

## Why do model detection sites report a high fake-model rate?

Many model detection sites or leaderboards are not fully reliable. Some may have paid ranking issues, biased samples, or opaque detection methods.

Models called through aggregation platforms such as OpenRouter are also often misclassified as "fake models" by these tools.

Treat these results as references only. Do not use them as the sole basis for deciding whether a model is genuine.

## What account type powers image-generation models?

Image-generation models use `Pro` accounts behind the scenes.

## Which client should I use for TokenFlux image generation?

- **Desktop**: We recommend [Cherry Studio](/en/docs/chatbot/cherry-studio). It has a clean interface, simple setup, and can use supported image-generation models directly after TokenFlux is configured.
- **Android**: We recommend [RikkaHub](/en/docs/chatbot/rikkahub). After connecting TokenFlux and importing image-capable models, set the model type to "Image", then open "Image Generation" from the bottom of the sidebar and select the model.

**Quick start:**

- **Cherry Studio**: Follow [Cherry Studio Guide](/en/docs/chatbot/cherry-studio) to install and connect TokenFlux. Select an image-capable model such as `gpt-image-2` in the model list, then send a prompt in the chat interface.
- **RikkaHub**: Follow [RikkaHub Guide](/en/docs/chatbot/rikkahub), then use the "Image Generation" section in that guide to finish setup.
