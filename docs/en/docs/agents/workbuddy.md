# WorkBuddy Guide

`WorkBuddy` is Tencent's desktop AI agent workspace. It supports local file workflows, Skills, MCP, automations, and custom models. Its OpenAI-compatible custom model support can connect to `TokenFlux`.

## Download and Install

1. Open the [official WorkBuddy download page](https://www.codebuddy.cn/work/). You can also start from the [China website](https://www.workbuddy.cn/) or the [international website](https://www.workbuddy.ai/).
2. Choose the build that matches your device:
   - Apple Silicon Mac: choose `arm64`.
   - Intel Mac: choose `x64`.
   - Windows: choose the Windows installer.
3. On macOS, open the downloaded DMG and drag `WorkBuddy.app` into `Applications`. On Windows, follow the installer prompts.
4. On first launch, WorkBuddy prepares its local runtime. Keep the network available and wait for the welcome screen instead of force-quitting the app.

<div style="text-align: center;">
  <img src="/images/workbuddy/01-preparing-environment.png" width="800" alt="WorkBuddy preparing its runtime during the first launch" />
</div>

When preparation finishes, the welcome screen appears. Click **Log in** to continue.

<div style="text-align: center;">
  <img src="/images/workbuddy/02-welcome-login.png" width="987" alt="WorkBuddy welcome screen with the login button outlined in red" />
</div>

## Sign In

WorkBuddy opens the Tencent CodeBuddy sign-in page in your browser.

1. Read the user agreement and privacy policy.
2. Personally select the agreement checkbox and click **Agree**.
3. Authenticate with WeChat, phone, email, or SSO. Available methods can vary by region and account type.
4. Return to WorkBuddy after the browser reports a successful sign-in.

<div style="text-align: center;">
  <img src="/images/workbuddy/03-browser-sign-in.png" width="1274" alt="Tencent CodeBuddy sign-in page with the agreement checkbox and Agree button outlined in red" />
</div>

## Connect TokenFlux

### 1. Prepare an API Key

Follow [Create API Key](/en/docs/tokenflux/create-apikey), then check the [model marketplace](https://tokenflux.dev/models) for the exact model IDs available to that key's group.

### 2. Open Custom Model Settings

After signing in to WorkBuddy, open:

1. The avatar or account menu.
2. **System Settings**.
3. **Models**.
4. **Add Model**.

<div style="text-align: center;">
  <img src="/images/workbuddy/04-system-settings.png" width="925" alt="WorkBuddy System Settings window with Models outlined in red in the sidebar" />
</div>

The **Models** page displays the local configuration path and the **Add Model** button.

<div style="text-align: center;">
  <img src="/images/workbuddy/05-model-settings.png" width="925" alt="WorkBuddy Models settings page with the Add Model button outlined in red" />
</div>

The Models page displays the actual local configuration path. WorkBuddy Desktop normally uses `~/.workbuddy/models.json`; the [official model configuration guide](https://www.workbuddy.ai/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Model) also documents migration compatibility with existing `~/.codebuddy/models.json` configurations.

### 3. Enter the Model Configuration

Select **Custom** at the bottom of the provider list. WorkBuddy's custom entry currently requires an OpenAI-compatible API, which TokenFlux provides.

<div style="text-align: center;">
  <img src="/images/workbuddy/06-provider-selection.png" width="538" alt="Selecting the red-outlined Custom option from the provider list in WorkBuddy" />
</div>

Then complete the form:

| Field | Recommended value |
| --- | --- |
| Provider | `Custom` |
| Endpoint | `https://tokenflux.dev/v1/chat/completions` |
| Mainland China endpoint | `https://token.memoh.net/v1/chat/completions` |
| API Key | Your TokenFlux API key |
| Model Name | The exact model ID from the marketplace, such as `gpt-5.6-sol` |
| Tool Calling | Enable it; `gpt-5.6-sol`, used in this guide, supports tool calling |
| Image Input | Enable it so WorkBuddy can send images to the model |
| Reasoning | Enable it to use the reasoning capability of `gpt-5.6-sol` |
| Custom Protocol | Leave disabled to use the OpenAI Chat Completions-compatible protocol |

<div style="text-align: center;">
  <img src="/images/workbuddy/07-tokenflux-configuration.png" width="538" alt="WorkBuddy custom model form configured for TokenFlux and gpt-5.6-sol with required fields outlined in red" />
</div>

::: tip Enter the complete endpoint
In WorkBuddy 5.3.5, the field did not append the request path when it lost focus. To avoid version-specific behavior, enter the complete endpoint ending in `/chat/completions` as shown above.
:::

::: warning Leave Custom Protocol disabled for TokenFlux
When enabled, WorkBuddy skips standard OpenAI Chat Completions path validation. It is intended for non-standard gateway or proxy routes and is not required for TokenFlux's standard OpenAI-compatible endpoint.
:::

When using a [composite key](/en/docs/tokenflux/composite-key), include the group prefix in the model name, for example `GPT/gpt-5`. The prefix and model ID must exactly match the composite-key mapping.

### 4. Save and Verify

1. Click **Save**. The model is written to the local configuration file shown on WorkBuddy's Models page.

<div style="text-align: center;">
  <img src="/images/workbuddy/08-save-model.png" width="538" alt="WorkBuddy custom model form with the Save button outlined in red" />
</div>

2. After saving, confirm that `gpt-5.6-sol` appears under **Saved Models**.

<div style="text-align: center;">
  <img src="/images/workbuddy/09-saved-model.png" width="925" alt="The gpt-5.6-sol card outlined in red in WorkBuddy's Saved Models list" />
</div>

3. Return to a new task, open the model selector, and choose `gpt-5.6-sol` under **Custom Models**.

<div style="text-align: center;">
  <img src="/images/workbuddy/10-select-custom-model.png" width="268" alt="The gpt-5.6-sol custom model outlined in red in WorkBuddy's model selector" />
</div>

4. Send a minimal test message. The captured run used `你好` ("Hello"); it completed in 6 seconds, and the response footer identified `gpt-5.6-sol` as the active model.

<div style="text-align: center;">
  <img src="/images/workbuddy/11-validation-result.png" width="704" alt="WorkBuddy successfully responding with gpt-5.6-sol, with the model name in the response footer outlined in red" />
</div>

5. Once basic chat succeeds, test a tool-enabled task, such as asking WorkBuddy to create and read a text file in a temporary directory.

## Troubleshooting

### The saved model does not appear

Reopen the model selector or create a new task. Enterprise administrators can disable personal custom models, so enterprise users may need an administrator to enable the policy.

### A request returns 401 or authentication failed

Check that the API key is complete, active, and contains no spaces or line breaks. Do not place the key in the Model Name or Endpoint field.

### A request returns model not found

The Model Name must exactly match an ID available to the key's group in the [model marketplace](https://tokenflux.dev/models). Composite keys also require the correct prefix.

### The agent does not call tools

Edit the model and enable **Tool Calling**, then confirm that the upstream model actually supports tool calls. A client-side switch cannot add tool support to an incompatible model.

## Related Links

- [API Endpoints](/en/docs/tokenflux/endpoints)
- [Create API Key](/en/docs/tokenflux/create-apikey)
- [Composite Key](/en/docs/tokenflux/composite-key)
- [Official WorkBuddy download page](https://www.codebuddy.cn/work/)
- [Official WorkBuddy model configuration guide](https://www.workbuddy.ai/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Model)
