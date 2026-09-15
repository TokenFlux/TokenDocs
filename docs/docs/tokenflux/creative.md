# 创作台

[创作台](https://tokenflux.dev/creative)是 TokenFlux 的网页图像工具，在浏览器里直接完成生成和编辑，不需要安装客户端，也不需要配置 API Key。

## 三种模式

底部输入框右侧的模式按钮切换工作方式。

| 模式       | 行为                             |
| ---------- | -------------------------------- |
| `文生图`   | 直接根据提示词生成图片           |
| `图生图`   | 以画布中选中的图片为参考进行编辑 |
| `局部重绘` | 涂抹选中图片的区域并重新绘制     |

## 选择模型

点击输入框左侧的 `选择模型`，从列表中选择图像模型。可用模型和各档价格以[模型广场](https://tokenflux.dev/models)为准。

<div style="text-align: center;">
  <img src="/images/creative/step-01-select-model.png" alt="创作台的模型下拉列表，红框标出 gpt-image-2" />
</div>

## 生成图片

1. 确认模式为 `文生图`。
2. 在输入框里描述画面。

   <div style="text-align: center;">
     <img src="/images/creative/step-02-enter-prompt.png" alt="在创作台输入框中填写生成提示词" />
   </div>

3. 点击右下角的发送按钮。

   <div style="text-align: center;">
     <img src="/images/creative/step-03-send.png" alt="红框标出创作台右下角的发送按钮" />
   </div>

4. 生成完成后，图片出现在画布上。

   <div style="text-align: center;">
     <img src="/images/creative/step-04-result.png" alt="创作台画布上生成的字画，写着 TokenFlux 蒸蒸日上" />
   </div>

提交前，发送按钮左侧显示本次的费用和当前选中的模型。任务在左下角显示排队和生成状态，期间可以继续提交其他任务。

## 编辑图片

`图生图` 以画布中选中的图片为参考，适合在原图基础上改文字、换风格或补充细节。

1. 在画布上点击要编辑的图片，出现选择框。
2. 把模式切换为 `图生图`。

   <div style="text-align: center;">
     <img src="/images/creative/step-05-edit-mode.png" alt="创作台的模式菜单，红框标出图生图选项" />
   </div>

3. 在输入框里写清楚要改的地方。

   <div style="text-align: center;">
     <img src="/images/creative/step-06-edit-prompt.png" alt="在创作台输入框中填写修改提示词" />
   </div>

4. 点击发送。

   <div style="text-align: center;">
     <img src="/images/creative/step-07-edit-result.png" alt="编辑后的字画，文字变为 TokenFlux 蒸蒸日上喵" />
   </div>

编辑结果作为新图片放到画布上，原图保留。

## 局部重绘

`局部重绘` 只重画涂抹到的区域，适合替换画面里的某个元素。

1. 在画布上点击要修改的图片，出现选择框。
2. 把模式切换为 `局部重绘`。

   <div style="text-align: center;">
     <img src="/images/creative/step-08-inpaint-mode.png" alt="创作台的模式菜单，红框标出局部重绘选项" />
   </div>

3. 用画笔涂抹要重绘的区域，紫色轨迹就是要重画的部分。工具栏可以调整画笔粗细、撤销上一笔或清除全部涂抹。

   <div style="text-align: center;">
     <img src="/images/creative/step-09-inpaint-brush.png" alt="在创作台画布上用画笔涂抹，紫色区域覆盖要重绘的部分" />
   </div>

4. 在输入框里写清楚涂抹区域要变成什么。

   <div style="text-align: center;">
     <img src="/images/creative/step-10-inpaint-prompt.png" alt="在创作台输入框中填写局部重绘提示词" />
   </div>

5. 点击发送。

   <div style="text-align: center;">
     <img src="/images/creative/step-11-inpaint-result.png" alt="局部重绘后的字画，涂抹区域被替换成一只仙鹤" />
   </div>

局部重绘目前由 OpenAI 分组的图片模型提供。

## 生成参数

`参数` 按钮调整本次生成的输出规格。

| 参数     | 可选值                              |
| -------- | ----------------------------------- |
| 图片尺寸 | `1K`、`2K`、`4K`                    |
| 画面比例 | `1:1`、`4:3`、`3:4`、`16:9`、`9:16` |
| 画质     | `低`、`中`、`高`、`自动`            |
| 背景     | `自动`、`不透明`、`透明`            |

尺寸和画质会影响单价，以发送按钮左侧的费用为准。

## 画布与素材

顶部工具栏：

- `上传图片`：把本地图片放到画布，可作为图生图或局部重绘的参考图。
- `下载选中图片`：导出当前选中的图片。
- `框选画布对象`：拖拽框选多张图片。
- `移除选中图片`：从画布上删除选中对象。

右上角的历史记录按钮列出本次生成和编辑的任务，左下角显示当前排队或生成中的任务。

左上角 `设置` 提供两个清理入口：`清空画布` 只清除画布内容，`清空本机创作数据` 会连同本机保存的提示词和历史一起清除。

## 计费

创作台按任务计费。提交前显示费用。

## 隐私与数据

画布上的图片会保存在本机浏览器里，清除浏览器数据会一并丢失。

## 相关入口

- [模型广场](https://tokenflux.dev/models) — 可用图像模型和各档价格
- [计费说明](/docs/tokenflux/billing) — 计费单位与扣费顺序
- [排障](/docs/troubleshooting) — 请求失败时按状态码定位
