# Client Guide Maintenance Policy

Client software updates continuously, and interfaces and configuration parameters may change over time. This document outlines the maintenance and verification mechanisms for integration guides, as well as feedback channels for outdated content.

## Last Verified

Every client integration guide carries a "Last verified" date at the top. It means that on that day someone followed the guide against the real client and confirmed the steps and screenshots still match.

The "Last updated" line in the footer is a different thing: it comes from the Git commit time, so fixing a typo refreshes it. To judge whether the content keeps up with the client, read "Last verified".

## Verification Cycle

The target is at least one verification every 30 days. Each pass checks:

| Item               | What is checked                                                    |
| ------------------ | ------------------------------------------------------------------ |
| Installation       | Whether the commands, package names, and download links still work |
| Setting names      | Client redesigns frequently rename or move settings                |
| Screenshots        | Whether they match the current interface                           |
| Verification steps | Whether the commands in the guide still return what they should    |

Major client releases trigger a verification pass without waiting for the cycle.

## Scope

This policy covers the [Agents](/en/docs/agents/claude-code) and [ChatBot](/en/docs/chatbot/cherry-studio) integration guides.

Billing, error codes, and API endpoint pages carry no verification date. They track changes to TokenFlux itself and are updated alongside them.

## Reporting Stale Content

When a guide no longer matches reality, use any of these:

- "Edit this page on GitHub" at the bottom of the page
- An issue on the [repository](https://github.com/TokenFlux/TokenDocs), naming the client and version
- The template in [Troubleshooting](/en/docs/troubleshooting#how-to-report-a-problem)

Please include the client version. The same guide can behave completely differently across versions.

## Related Pages

- [Quickstart](/en/docs/quickstart) - pick an integration path by client
- [Troubleshooting](/en/docs/troubleshooting) - locate a problem by symptom
