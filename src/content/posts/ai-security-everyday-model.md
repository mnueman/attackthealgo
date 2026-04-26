---
title: "AI Security: Securing the Everyday Model"
date: 2026-04-18
tags: ["ai", "detection-eng"]
excerpt: "The model your team shipped last quarter is now a production attack surface. A field guide to threat-modeling LLM features without slowing the org down."
readTime: 11
pinned: true
series: "AI Security"
---

The model your team shipped last quarter is now a production attack surface. Most of the threat-modeling I see still treats LLM features like web forms — input validation, output encoding, done. That misses the point. The model itself is the trust boundary, and the boundary is permeable in ways nobody's tracking.

## What changed in the last 18 months

Three things. **Agents got teeth** — tool use moved from research demo to production, which means a prompt-injected model can now call your APIs. **Context windows got huge**, which means the haystack an attacker hides in is two orders of magnitude bigger. **RAG got popular**, which means user-controlled data is now part of the model's effective system prompt.

## The threat model nobody draws

Start by drawing two boxes: the model, and everything that feeds into the model's context. Then list every source of bytes that ends up in that context window: user messages, tool outputs, retrieved documents, system prompts loaded from config. Each one is a potential injection point.

Now ask: which of those bytes are attacker-controlled, even indirectly? A user pasting a URL into chat, where your agent fetches it. A retrieved document that was uploaded by a different user yesterday. A tool output from an API you don't fully trust.

Most teams I've talked to can't answer this. That's the gap.

## What detection looks like

```python
def detect_indirect_injection(context_window, sources):
    # Flag any retrieved content with imperative second-person language
    suspicious = []
    for chunk in context_window:
        if chunk.source != 'user' and looks_like_instruction(chunk.text):
            suspicious.append(chunk)
    return suspicious
```

It's not a silver bullet. But logging every context assembly with provenance tags is the first move. You can't detect what you can't see.

## What I'd build first

- A context-provenance log for every model call
- Output classifiers for the top 5 things you don't want the model to do
- Rate limits on tool-use calls, separately from model calls
- An "explain your reasoning" forced step before any destructive action

None of this is research. It's just engineering hygiene applied to a new class of system.
