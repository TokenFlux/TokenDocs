# 流式生图

生图等待较久后超时，可尝试流式请求，通过 SSE 接收图片和保活心跳。使用 [当前 API 地址](/docs/tokenflux/endpoints)，并确认所选渠道和客户端支持流式生图。

## 请求示例

在原请求中加入 `stream=true`。`partial_images=0` 表示只接收最终图片；设为 `1` 至 `3` 可请求预览图，实际数量可能少于指定值。详见 OpenAI 官方 [生成接口](https://developers.openai.com/api/reference/resources/images/methods/generate) 和 [编辑接口](https://developers.openai.com/api/reference/resources/images/methods/edit)。

以下请求会产生费用。模型 ID 换成 Key 支持的模型；复合 Key 需带分组前缀。`curl -N` 关闭输出缓冲。

### 文生图

```bash
curl -N https://tokenflux.dev/v1/images/generations \
  -H "Authorization: Bearer $TOKENFLUX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-2",
    "prompt": "一只坐在窗边的橘猫，水彩风格",
    "n": 1,
    "stream": true,
    "partial_images": 0
  }'
```

### 图片编辑

```bash
curl -N https://tokenflux.dev/v1/images/edits \
  -H "Authorization: Bearer $TOKENFLUX_API_KEY" \
  -F "model=gpt-image-2" \
  -F "image=@input.png" \
  -F "prompt=将背景替换为浅灰色，保持商品外观" \
  -F "n=1" \
  -F "stream=true" \
  -F "partial_images=0"
```

## 接收结果

响应为 `text/event-stream`，每个事件以空行结束：

| 接口                     | 预览图事件                       | 最终图片事件                 |
| ------------------------ | -------------------------------- | ---------------------------- |
| `/v1/images/generations` | `image_generation.partial_image` | `image_generation.completed` |
| `/v1/images/edits`       | `image_edit.partial_image`       | `image_edit.completed`       |

编辑接口的简化响应，Base64 为占位符：

```text
:

event: image_edit.completed
data: {"type":"image_edit.completed","b64_json":"<最终图片的 Base64>"}

```

用 SSE 解析器组装完整事件，再解析 `data` 中的 JSON。一次网络读取可能只有半个事件，也可能包含多个事件，不能直接对数据块或整条响应调用 `response.json()`。网页端可用 `fetch` 配合 SSE 解析器发送 POST 请求并读取响应。

收到最终图片事件后，从 `b64_json` 解码保存图片。预览图各自独立，不要拼接 Base64。冒号开头的行是心跳注释，应忽略；只有心跳、预览图或 HTTP 200 都不能确认成功，还需处理流内 `error` 和断线。

## 仍然超时怎么办

网关可发送 `:\n\n` 注释保活，格式遵循 [SSE 标准](https://html.spec.whatwg.org/multipage/server-sent-events.html#authoring-notes)。`stream=true` 不会自动产生心跳，也不会缩短生成时间。部分渠道需等上游响应头返回后才能开始保活，期间仍可能超时。

先用单张图确认能收到心跳和最终图片。客户端需留足总等待时间；自建代理需关闭响应缓冲。提高客户端超时无法延长中间代理的空闲超时。

断线后仍可能继续生成并结算，重试前先核对使用记录。持续超时或客户端不支持 SSE 时，按 [排障](/docs/troubleshooting#怎么反馈) 提供信息。
