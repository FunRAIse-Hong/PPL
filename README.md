# PPL 訓練記錄

Push / Pull / Legs 訓練記錄 App。單一靜態 HTML + Supabase（RLS 資料隔離），
核心互動是「看上次的重量 → 填今天的數字」，支撐漸進超負荷。

**線上版**：https://funraise-hong.github.io/PPL/ （Email magic link 登入，每人只看得到自己的紀錄）

## 開發

```bash
make serve                 # 本機預覽 http://localhost:8642
make link you@email.com    # 免寄信產生登入連結（需 export SUPABASE_SERVICE_KEY）
```

專案脈絡見 `CONTEXT.md`，架構決策見 `docs/adr/`。
