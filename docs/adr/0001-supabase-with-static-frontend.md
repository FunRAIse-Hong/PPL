# ADR-0001: Supabase + 靜態 HTML，不自架後端、不用 Notion 當資料庫

日期：2026-08（HANDOFF 時期決策，2026-08-12 整理成 ADR）
狀態：Accepted

## 決策

單一靜態 `index.html` 直連 Supabase（PostgREST + Auth），部署在 GitHub Pages。
資料隔離完全由 Postgres RLS 在資料庫端執行。

## 理由

- 需求是「分享給別人用，每個人只看得到自己的紀錄」。RLS 在資料庫端做隔離，不靠前端判斷——這是唯一可靠的做法
- 前端只持有 publishable（anon）key，這把金鑰設計上就是公開的
- 靜態 HTML 就夠，不需要自架後端

### 為什麼不用 Notion 當後端

Notion API 需要 secret key，不能放前端；要藏就得自架伺服器，那不如直接用 Supabase。
2026-08-12：Notion 整合（含單向匯出報表）整個取消。

### 登入方式

Email magic link（免密碼）。內建寄信每小時限 2 封——多裝置登入改用 Admin API 直接產生連結（`make link`）。若之後要加 Google/Microsoft OAuth，前端每個 provider 約十行。

## 後果

- 部署 = push 到 main；沒有 CI、沒有 build step
- 免費專案七天無請求會休眠；新表要記得補 grants（見 CONTEXT.md 運維注意）
- Repo 因 GitHub Pages 免費方案限制轉為公開（個人帳號私有 repo 不能開 Pages）
