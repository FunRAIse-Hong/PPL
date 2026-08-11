# PPL 訓練記錄 App

先讀 `HANDOFF.md` — 專案背景、架構決策、踩過的坑都在裡面。

## Agent skills

### Issue tracker

Issues live in GitHub Issues (FunRAIse-Hong/PPL), operated via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` + `docs/adr/` at the repo root (created lazily). See `docs/agents/domain.md`.
