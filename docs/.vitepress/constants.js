// 文档中反复出现的常量集中在这里。
//
// 正文里的地址和模型 ID 仍然是字面量写死的：它们大多位于代码块内，模板插值
// 不生效，而且会破坏 .md 镜像。这里的作用不是消除重复，而是把「哪些值是对的」
// 固定下来，由 tests/doc-constants.spec.js 校验，改名时更新此处即可让 CI 点出
// 全部待改文件。

/** 应用站点，控制台与模型广场所在。 */
export const APP_ORIGIN = 'https://tokenflux.dev'

/** 允许在文档中出现的应用站点路径。新增页面入口时在此登记。 */
export const APP_PATHS = [
  '/',
  '/affiliate',
  '/api/v1/marketplace/models',
  '/creative',
  '/dashboard',
  '/health',
  '/keys',
  '/models',
  '/orders',
  '/purchase',
  '/register',
  '/team',
  '/usage',
  '/v1',
  '/v1/chat/completions',
  '/v1/messages',
  '/v1/models',
  '/v1/responses',
]

export const OPENAI_BASE_URL = `${APP_ORIGIN}/v1`
export const ANTHROPIC_BASE_URL = APP_ORIGIN
export const CONSOLE_URL = `${APP_ORIGIN}/dashboard`
export const MODELS_URL = `${APP_ORIGIN}/models`

/** 已废弃的接入地址，只允许出现在下方登记的迁移说明中。 */
export const DEPRECATED_ORIGINS = []

export const DEPRECATED_ORIGIN_ALLOWED_IN = []

/**
 * 文档示例中允许出现的模型 ID。
 *
 * 模型改名后先更新此表，CI 会列出所有仍在使用旧 ID 的文件。
 */
export const SAMPLE_MODEL_IDS = [
  'claude-sonnet-4',
  'gemini-2.5-pro',
  'gemini-3.1-flash-image',
  'gpt-5.6-luna',
  'gpt-5.6-sol',
  'gpt-5.6-terra',
  'nano-banana-pro',
]

/** 形似模型 ID 但并非可配置模型，跳过校验。 */
export const NON_MODEL_IDENTIFIERS = [
  // 错误信息示例中的占位模型名，见 errors.md 的分组能力限制一节
  'gpt-5',
]

/**
 * 易变事实的收敛约束。
 *
 * 同一个数字或名称散落在多处时，改动必然漏改。这些内容各自只保留一处权威出处，
 * 其余页面改为链接。`maxFiles` 为 2 表示中英文各一份。
 */
export const SINGLE_SOURCE_FACTS = [
  { name: 'Stripe 固定手续费', pattern: '2\\.7', maxFiles: 2 },
  { name: '订阅档位名称', pattern: 'Lite\\+', maxFiles: 2 },
  { name: 'ChatGPT Pro 分组差异', pattern: 'ChatGPT Pro \\(负载均衡\\)', maxFiles: 2 },
  // Claude Max 出现在核心概念、Claude Code 与 CC-Switch 三处，中英各一份。
  // 再多说明约束又开始散开，应改为链接到核心概念。
  { name: 'Claude Max 分组约束', pattern: 'Claude Max', maxFiles: 6 },
  { name: '企业对接 QQ 群号', pattern: '794504445', maxFiles: 2 },
]

/** 允许在文档中出现的外部域名，用于挡住笔误和未经确认的站点。 */
export const ALLOWED_EXTERNAL_HOSTS = [
  '127.0.0.1',
  'aka.ms',
  'cherry-ai.com',
  'claude.ai',
  'get.microsoft.com',
  'git-scm.com',
  'github.com',
  'opencode.ai',
  'persistent.oaistatic.com',
  'pi.dev',
  'raw.githubusercontent.com',
  'rikka-ai.com',
  'tokenflux.dev',
  'www.codebuddy.cn',
  'www.workbuddy.ai',
  'www.workbuddy.cn',
]
