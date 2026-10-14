---
verifiedAt: '2026-10-14'
verifiedWith: 'Android 16; RikkaHub 2.5.6; OpenAI provider setup, model listing, gpt-6-astra chat, single-image generation with gpt-image-2.'
---

# RikkaHub Guide

`RikkaHub` is an Android AI chat client that supports multiple OpenAI-compatible interfaces, suitable for daily AI conversations on mobile devices.

## Installation

RikkaHub currently supports Android only and **does not support iOS**.

You can install it with either method:

- Download the APK from the [RikkaHub download page](https://rikka-ai.com/download) and install it manually.
- Search for `RikkaHub` on Google Play and install it.

## Connect to TokenFlux

RikkaHub can connect to TokenFlux through its OpenAI-compatible provider support.

1. Follow [Create API Key](/en/docs/tokenflux/create-apikey) to generate an API key.
2. Open `RikkaHub`, tap the left **sidebar**, and go to **Settings**.
3. Choose **Providers**, add a new provider, and select `OpenAI` as the type.
4. Fill in the following configuration:

   ```text
   Name: TokenFlux
   Provider type: OpenAI
   Base URL: https://tokenflux.dev/v1
   API Key: TokenFlux API key
   API Path: /chat/completions
   ```

   > **Note:** The Base URL must end with `/v1`. RikkaHub appends paths such as `/chat/completions` automatically, so do not add duplicate path segments at the end. This configuration uses the default Chat Completions mode.

5. After adding the provider, open it and select the **Models** tab at the bottom. Tap the **box icon to the left** of "Add New Model" to open the available model list, then tap "+" beside the model you want. The "Add New Model" button on the right is for entering a model ID manually.
6. Return to the chat page, tap the model button at the lower left of the input area, and select the added model under the `TokenFlux` provider.

## Verify the Setup

Fetching the model list also requires an API key. Enter and save the key before fetching the list in step 5.

Once the list loads, send `Reply with OK only` in the chat page. After receiving a reply, check the [usage logs](https://tokenflux.dev/usage) to confirm the request used the provider and model you added.

If the list is empty or fails to load, check the key, its group, and the Base URL, then [Test the Key and Endpoint on Their Own](/en/docs/troubleshooting#test-the-key-and-endpoint-on-their-own) to rule out client issues.

## Next Steps

After completing configuration, you can start model conversations directly in `RikkaHub`.

## Image Generation

> Prerequisite: The key's group includes your target image model, and you have imported that model using the steps above. See [Which group covers image generation?](/en/docs/faq#which-group-covers-image-generation) for group selection.

1. Go to **Settings -> Providers -> your provider -> Models**, open the image model, set **Model Type** to **Image**, and confirm.

   <div style="text-align: center;">
     <img src="/images/rikkahub/step-1-edit-model-type.png" alt="RikkaHub setting an image-generation model type to Image" />
   </div>

2. Return to the home page, expand the left **sidebar**, open **Menu** at the bottom, then choose **Image Generation**.
3. Tap the model button at the lower left of the image-generation page and choose the image model under the corresponding provider.

   <div style="text-align: center;">
     <img src="/images/rikkahub/step-3-select-model.png" alt="RikkaHub selecting a model on the image generation page" />
   </div>

4. Check the count and size in the settings beside the model button, enter a prompt, and generate. The size options are a generic client list; choose a value your model supports.

For example, with `gpt-image-2` in the `ChatGPT Image` group, set the count to 1 and the size to `1024x1024`. Check generation charges in the [usage logs](https://tokenflux.dev/usage).

## More Related Content

- [Balance and Billing](/en/docs/tokenflux/billing)
