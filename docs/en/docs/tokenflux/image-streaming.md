# Streaming Images

For image requests that time out during a long wait, try streaming to receive images and keepalive comments over SSE. Use the [current API address](/en/docs/tokenflux/endpoints) and confirm that your channel and client support streaming images.

## Request examples

Add `stream=true` to the existing request. Set `partial_images=0` for the final image only, or `1` to `3` for previews. Fewer previews may arrive than requested. See the official OpenAI [generation](https://developers.openai.com/api/reference/resources/images/methods/generate) and [editing](https://developers.openai.com/api/reference/resources/images/methods/edit) parameters.

These requests incur charges. Use a model available to your key, including the group prefix for composite keys. `curl -N` disables output buffering.

### Generate an image

```bash
curl -N https://tokenflux.dev/v1/images/generations \
  -H "Authorization: Bearer $TOKENFLUX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-2",
    "prompt": "An orange cat sitting by a window, watercolor style",
    "n": 1,
    "stream": true,
    "partial_images": 0
  }'
```

### Edit an image

```bash
curl -N https://tokenflux.dev/v1/images/edits \
  -H "Authorization: Bearer $TOKENFLUX_API_KEY" \
  -F "model=gpt-image-2" \
  -F "image=@input.png" \
  -F "prompt=Replace the background with light gray, preserving the product" \
  -F "n=1" \
  -F "stream=true" \
  -F "partial_images=0"
```

## Receive results

The response uses `text/event-stream`. A blank line ends each event:

| Endpoint                 | Preview event                    | Final image event            |
| ------------------------ | -------------------------------- | ---------------------------- |
| `/v1/images/generations` | `image_generation.partial_image` | `image_generation.completed` |
| `/v1/images/edits`       | `image_edit.partial_image`       | `image_edit.completed`       |

Simplified editing response with a Base64 placeholder:

```text
:

event: image_edit.completed
data: {"type":"image_edit.completed","b64_json":"<final image Base64>"}

```

Use an SSE parser to assemble complete events, then parse each event’s `data` as JSON. A network read may contain part of an event or several events. Do not call `response.json()` on individual chunks or the entire response. Web clients can use `fetch` with an SSE parser to send POST requests and read the stream.

Decode and save `b64_json` from the final image event. Each preview is a separate image; do not concatenate Base64. Ignore heartbeat comments starting with a colon. Heartbeats, previews, and HTTP 200 alone do not confirm success. Handle in-stream `error` events and disconnects.

## If requests still time out

The gateway can send `:\n\n` keepalive comments following the [SSE standard](https://html.spec.whatwg.org/multipage/server-sent-events.html#authoring-notes). Setting `stream=true` does not create heartbeats or shorten generation time. Some channels must wait for upstream response headers before starting keepalive, so timeouts can still occur during that wait.

Test one image to confirm that heartbeats and the final image arrive. Allow sufficient total time in the client and disable response buffering in any proxy you operate. Increasing the client timeout does not extend an intermediary’s idle timeout.

Generation and billing may continue after a disconnect. Check usage records before retrying. For persistent timeouts or clients without SSE support, report the issue through [Troubleshooting](/en/docs/troubleshooting#how-to-report-a-problem).
