---
title: "Detection Engineering: Writing Rules That Don't Page You at 3am"
date: 2026-03-22
tags: ["detection-eng", "ir"]
excerpt: "Most SIEM rules are written by people who don't have to respond to them. Here's a framework for writing detections that earn their pages."
readTime: 9
---

The first detection I ever wrote paged me at 4:17 AM on a Saturday for a benign cron job. The second one paged me forty-seven times in an hour. By the third one I'd developed a framework.

## The four-line test

Every rule should answer four questions before it gets deployed:

1. **What attack stage is this catching?** (Initial access, lateral, exfil...)
2. **What's the false-positive cost?** (One alert per week is fine. One per minute is a denial-of-service on yourself.)
3. **What does the responder do with this?** (If the answer is "look at it," the rule isn't done.)
4. **How does this rule decay?** (Most detections rot. Plan the autopsy now.)

## The detection-as-code pattern

Treat your rules like application code. Repo, branches, PRs, tests, CI.

```yaml
# detections/lateral/smb-anomalous-share-access.yml
name: SMB anomalous share access
severity: medium
data_source: windows_security
query: |
  source="WinEventLog:Security" EventCode=5140
  | where ShareName not in ("\\\\*\\IPC$", "\\\\*\\NETLOGON")
  | by SourceUserName, ShareName
  | rare ShareName by SourceUserName, threshold=0.01
response_runbook: runbooks/lateral-smb.md
owner: detection-eng
last_reviewed: 2026-03-15
```

The runbook reference is the part most teams skip. Without it, the rule is just noise generation.

## What "good" looks like

A mature detection engineering team I worked with had three numbers on a dashboard: median time-to-triage, false-positive rate per rule, and rules deprecated this quarter. The third one matters most. If you're not killing rules, you're hoarding tech debt.
