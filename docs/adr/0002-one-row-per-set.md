# ADR-0002: 一列一組的資料模型，儲存採 delete-then-insert

日期：2026-08（HANDOFF 時期決策，2026-08-12 整理成 ADR）
狀態：Accepted

## 決策

```
workout_logs
  id, user_id, log_date, day_key(A/B/C), exercise(text), set_no, weight, reps, rir, note
  unique (user_id, log_date, day_key, exercise, set_no)
```

儲存策略：先刪除該人該日該分項的所有列，再整批寫入（不是 upsert）。

## 理由

- 一列 = 一組（而非一列 = 一次訓練），讓「同一動作的重量趨勢」能直接用 SQL / 一次 select 查出——進度 sparkline 就靠這個
- 唯一鍵讓重複儲存不產生重複資料
- delete-then-insert 簡單且冪等，天然處理「這次比上次少填一組」的情況；資料量小完全夠用
- `exercise` 存中文名稱文字（非外鍵），自訂動作因此零 schema 變更就能記錄

## 後果

- 動作改名會讓歷史紀錄對不上（目前不支援改名，只有隱藏/新增）
- `rir`、`note` 欄位保留但 UI 不用（填寫負擔 > 價值）
