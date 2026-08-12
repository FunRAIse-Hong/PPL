# PPL 訓練記錄 App

先讀 `CONTEXT.md` — 專案目標、領域詞彙、UI 慣例、運維注意、請不要做的事。
架構決策在 `docs/adr/`。線上版：https://funraise-hong.github.io/PPL/

## Agent skills

### Issue tracker

Issues live in GitHub Issues (FunRAIse-Hong/PPL), operated via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` + `docs/adr/` at the repo root (created lazily). See `docs/agents/domain.md`.
