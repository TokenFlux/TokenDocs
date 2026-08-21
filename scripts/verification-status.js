// 列出客户端接入文档的核验状态，超期的排在前面。
//
// 「最近核验」指有人按文档在真实客户端上走通了一遍，与页脚的「最后更新于」
// 不同：后者只是 git 提交时间，改个错别字也会刷新。
//
// 用法：pnpm docs:verify-status
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docsRoot = resolve(projectRoot, 'docs')

/** 需要定期对着真实客户端核验的目录。 */
export const VERIFIED_DIRECTORIES = ['docs/agents', 'docs/chatbot']

/** 超过这个天数就该重新核验。 */
export const VERIFICATION_MAX_AGE_DAYS = 30

/** 从 frontmatter 读取核验日期，兼容加引号与不加引号两种写法。 */
export function readVerifiedAt(content) {
  const matched = content.match(/^---\r?\n[\s\S]*?^verifiedAt:\s*(\S+)\s*$/m)

  return matched ? matched[1].replace(/^["']|["']$/g, '') : null
}

export function listVerifiedDocuments() {
  const files = []

  for (const directory of VERIFIED_DIRECTORIES) {
    const absolute = resolve(docsRoot, directory)

    for (const entry of readdirSync(absolute, { withFileTypes: true })) {
      if (!entry.isFile() || !entry.name.endsWith('.md')) {
        continue
      }

      const path = relative(docsRoot, join(absolute, entry.name)).replace(/\\/g, '/')
      const content = readFileSync(resolve(docsRoot, path), 'utf8')
      files.push({ path, verifiedAt: readVerifiedAt(content) })
    }
  }

  return files.sort((a, b) => a.path.localeCompare(b.path))
}

/**
 * 核验日期是本地日历日，因此两端都按本地零点比较。
 * 若按 UTC 解析，东八区当天填写的日期会被判成未来。
 */
export function ageInDays(verifiedAt, now = new Date()) {
  const parsed = new Date(`${verifiedAt}T00:00:00`)

  if (Number.isNaN(parsed.getTime())) {
    return null
  }

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  return Math.round((startOfToday.getTime() - parsed.getTime()) / 86_400_000)
}

function main() {
  const documents = listVerifiedDocuments().map(doc => ({
    ...doc,
    age: doc.verifiedAt ? ageInDays(doc.verifiedAt) : null,
  }))

  documents.sort(
    (a, b) => (b.age ?? Number.POSITIVE_INFINITY) - (a.age ?? Number.POSITIVE_INFINITY),
  )

  for (const { path, verifiedAt, age } of documents) {
    const status =
      verifiedAt === null
        ? '未登记'
        : age > VERIFICATION_MAX_AGE_DAYS
          ? `超期 ${age - VERIFICATION_MAX_AGE_DAYS} 天`
          : `剩余 ${VERIFICATION_MAX_AGE_DAYS - age} 天`

    console.log(`${(verifiedAt ?? '—').padEnd(12)} ${status.padEnd(14)} ${path}`)
  }

  const overdue = documents.filter(
    doc => doc.verifiedAt === null || doc.age > VERIFICATION_MAX_AGE_DAYS,
  )

  console.log(
    overdue.length === 0
      ? `\n全部在 ${VERIFICATION_MAX_AGE_DAYS} 天核验周期内。`
      : `\n需要重新核验：${overdue.length} 篇。`,
  )
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main()
}
