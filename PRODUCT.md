# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

只有 Hong 一個人（已確認 2026-08-14）。朋友偶爾登入純屬順便，不是設計對象；所有 UX 決策以 Hong 本人的健身流程為準。

## Product Purpose

90 天身體改變計畫的訓練記錄工具。唯一核心任務：在健身房現場，30 秒內看到「上次這個動作推多少」，然後填下今天的數字，支撐 Progressive Overload。以這 90 天為主要時間軸（已確認），不預先為長期多年使用設計。

## Operating Context

- 每週工作日中午練 3 次、每次實際運動最多 30 分鐘、只做器械
- 課表是 PPL（Push / Pull / Legs），一天一個分項
- 現場單手操作手機、組間休息時填數字 → 手機優先、深色底、大輸入框
- 填完重量自動起跳 70 秒組間休息倒數

## Capabilities and Constraints

- 靜態單檔 `index.html`，GitHub Pages 部署（push main 即上線），資料在 Supabase（RLS 是唯一安全防線）
- `workout_logs` 一列 = 一組（ADR-0002）；`user_settings.days` jsonb 存自訂動作
- RIR 欄位 schema 有、UI 刻意不做（減少填寫負擔）
- 器械 SVG 線稿＋「怎麼認」說明＋替代動作是明確要求的功能，不是裝飾，不可簡化掉
- 任何寬度都維持一列一卡，明確不要多欄並排
- Repo 公開，不放任何 secret（publishable key 除外）
- 不為「未來很多使用者」做複雜架構

## Brand Commitments

名稱「PPL 訓練記錄」。

**視覺路線（2026-08-14 重設計時確認）**：走「健身 App 標準式」正統路線，不玩梗、不反諷，工藝對標 Apple Fitness 與 Hevy。設計目標：清楚、目標感強——開場即「今天的目標清單」。

寶可夢御三家意象降為**少量彩蛋**（已確認）：分項 emoji 🔥💧🌿 與「進化了！」等成就微文案可保留，道館／收服／制霸類主文案退場。分項色 A=`#FF8A3D`、B=`#5C9EFF`、C=`#82D94F` 仍是全 App 的強調色系統。

## Evidence on Hand

- 真實訓練資料在 Supabase `workout_logs`（僅本人可見）
- 領域詞彙、UI 慣例、運維注意全在 `CONTEXT.md`；架構決策在 `docs/adr/`
- 沒有任何使用者見證、案例或行銷素材，未來也不需要（單人工具）

## Product Principles

1. 任何不能讓「看上次數字」或「填今天數字」更快的功能，大概都不該做
2. 少填一欄勝過多一個功能（RIR 之例）
3. 健身房現場可用性 > 美觀：單手、深色、大字、大按鈕
4. 熱血是手段不是目的——回饋文案（進化了！）服務於「想超過上次」的動機
