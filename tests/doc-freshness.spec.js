import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  VERIFICATION_FUTURE_TOLERANCE_DAYS,
  ageInDays,
  listVerifiedDocuments,
  readVerifiedAt,
  readVerificationStatus,
} from '../scripts/verification-status.js'

const docsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'docs')
const documents = listVerifiedDocuments()

function readLocalisedVerifiedAt(path) {
  return readVerifiedAt(readFileSync(resolve(docsRoot, path), 'utf8'))
}

describe('client guide verification dates', () => {
  it('finds client guides to check', () => {
    expect(documents.length).toBeGreaterThan(0)
  })

  it('records a verification date or an explicit unverified status on every client guide', () => {
    const missing = documents
      .filter(doc => doc.verifiedAt === null && doc.verificationStatus !== 'unverified')
      .map(doc => doc.path)

    expect(missing).toEqual([])
  })

  // 未完成真实调用时允许发布教程，但不得同时显示核验日期或成功范围。
  it('keeps unverified guides free of verification claims in both locales', () => {
    for (const doc of documents) {
      const source = readFileSync(resolve(docsRoot, doc.path), 'utf8')
      const english = readFileSync(resolve(docsRoot, `en/${doc.path}`), 'utf8')
      expect(readVerificationStatus(english)).toBe(doc.verificationStatus)
      if (doc.verificationStatus === 'unverified') {
        for (const content of [source, english]) {
          expect(readVerifiedAt(content)).toBeNull()
          expect(content).not.toMatch(/^verifiedWith:/m)
        }
      }
    }
  })

  it('uses ISO dates that are not in the future', () => {
    const invalid = []

    for (const { path, verifiedAt } of documents) {
      if (verifiedAt === null) {
        continue
      }

      if (!/^\d{4}-\d{2}-\d{2}$/.test(verifiedAt)) {
        invalid.push(`${path} -> ${verifiedAt}（应为 YYYY-MM-DD）`)
        continue
      }

      const age = ageInDays(verifiedAt)

      if (age === null) {
        invalid.push(`${path} -> ${verifiedAt}（不是合法日期）`)
      } else if (age < -VERIFICATION_FUTURE_TOLERANCE_DAYS) {
        invalid.push(`${path} -> ${verifiedAt}（日期在未来）`)
      }
    }

    expect(invalid).toEqual([])
  })

  it('keeps the English mirror on the same verification date', () => {
    const mismatched = []

    for (const { path, verifiedAt } of documents) {
      const localised = readLocalisedVerifiedAt(`en/${path}`)

      if (localised !== verifiedAt) {
        mismatched.push(`${path} 为 ${verifiedAt}，en/${path} 为 ${localised ?? '未登记'}`)
      }
    }

    expect(mismatched).toEqual([])
  })
})
