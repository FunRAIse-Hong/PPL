# PPL 訓練記錄 App — 交接文件

> 給接手的 Claude Code。這份文件包含專案背景、目前進度、架構決策、**踩過的坑**，以及待辦事項。
> 「踩過的坑」那一節請務必先讀完再動手，裡面每一條都是實際撞牆換來的。

---

## 1. 專案目標

使用者（以下稱 Hong）有一個 90 天身體改變目標，訓練條件如下：

- 每週工作日中午練 **3 次**，每次**實際運動最多 30 分鐘**
- 騎 UBike 往返健身房，當作暖身與收操
- **只做器械**（machine-based），不用自由重量
- 課表是 **PPL（Push / Pull / Legs，推/拉/腿）**，一天一個分項

App 的唯一核心任務：**讓他在健身房現場，30 秒內看到「上次這個動作推多少」，然後填下今天的數字。**

其他功能都是次要的。這個 App 存在的理由是支撐 **Progressive Overload（漸進超負荷）** —— 沒有上次的數字可比，這個 App 就沒有價值。

---

## 2. 目前檔案

| 檔案 | 狀態 | 說明 |
|---|---|---|
| `ppl-log-supabase.html` | **主線，待部署** | Supabase 版，多人、跨裝置。這是要繼續發展的版本 |
| `supabase-setup.sql` | 完成，未執行 | 建表 + RLS + grants。使用者尚未在自己的專案跑過 |
| `ppl-training-log.html` | 舊版，僅供參考 | 跑在 Claude 對話沙箱裡的版本，持久化功能壞掉（見第 5 節）。**不要繼續維護，但裡面的器械 SVG 圖和動作資料值得沿用** |

---

## 3. 架構決策（以及為什麼）

### 為什麼選 Supabase

需求是「未來分享給別人用，每個人只看得到自己的紀錄」。Supabase 的 **RLS（Row Level Security，資料列層級權限）** 在**資料庫端**做隔離，不是靠前端判斷 —— 這是唯一可靠的做法。

- 前端只拿得到 `anon key`，這把金鑰**設計上就是公開的**
- 安全性完全由 RLS 提供。**RLS 沒開 = 資料全裸**，這是本專案唯一的安全防線
- 靜態 HTML 直接連 Supabase，**不需要自架後端**

### 為什麼不用 Notion 當後端

Notion API 需要 secret key，不能放前端。要藏就得自架伺服器，那不如直接用 Supabase。

**但 Notion 仍有角色**：Hong 已經有一個 Notion 訓練資料庫在用（見第 7 節），適合當**個人報表 / 長期趨勢檢視**。可以考慮做單向匯出（Supabase → Notion），但**不要**讓 Notion 成為 App 的資料來源。

### 資料模型：一列 = 一組

```
workout_logs
  id, user_id, log_date, day_key(A/B/C), exercise, set_no, weight, reps, rir, note
  unique (user_id, log_date, day_key, exercise, set_no)
```

- 選「一列一組」而不是「一列一次訓練」，是為了讓「同一動作的重量趨勢」能直接用 SQL 查出來
- 唯一鍵讓重複儲存不會產生重複資料
- 目前儲存策略是 **先刪除該日該分項的列，再整批寫入**（不是 upsert）。簡單且冪等（idempotent），資料量小完全夠用

---

## 4. Supabase 設定步驟（使用者尚未完成）

1. supabase.com 開新專案（免費方案）
2. SQL Editor 執行 `supabase-setup.sql` 全部
3. Project Settings → API 取得 `URL` 與 `anon public key`，填入 HTML 最上方兩個常數
4. Authentication → URL Configuration → 把部署網址加入 **Redirect URLs**（不加的話 magic link 會導錯）
5. 部署到 Cloudflare Pages（或企業版 GitHub Pages，他們是 Enterprise，私有 repo 可以發布）

**驗收**：用兩個不同 Email 登入，各自建立紀錄，確認彼此看不到對方的資料。

---

## 5. 踩過的坑 — 請務必讀完

### 5.1 Claude 對話沙箱（artifact）的限制

舊版 `ppl-training-log.html` 跑在 Claude 對話的 iframe 沙箱裡，遇到以下問題。**如果之後又要做沙箱版本，這些會再遇到一次**：

- **`window.storage` 持久化 API 失敗**，錯誤：`Storage set failed: Unexpected response type`。試過帶 `shared` 參數、不帶參數兩種寫法，都失敗。這是環境問題，程式端修不了
- **不能對 `fetch` 傳 `AbortSignal`**，錯誤：
  `Failed to execute 'postMessage' on 'Window': AbortSignal object could not be cloned`
  → 沙箱的 fetch 是經由 `postMessage` 代理的，參數必須可被結構化複製（structured clone）。純物件、字串、數字可以，**瀏覽器宿主物件不行**
  → 逾時要用 `Promise.race` 實作，不要用 `AbortController`
- **`localStorage` / `sessionStorage` 在 artifact 中不支援**，不要用
- 經由 Anthropic API + Notion MCP 連接器同步，**60 秒沒有回應而逾時**。最終未能確認是否可行

**結論：離開沙箱、部署成真正的網頁，以上問題全部消失。** 這是選擇 Supabase 版本的主因之一。

### 5.2 Supabase 的兩個時效性陷阱

- **2026/5/30 之後建立的新專案**，必須明確加 Postgres grants 才能透過 PostgREST 存取資料表。`supabase-setup.sql` 裡已經包含：
  ```sql
  grant usage on schema public to authenticated;
  grant select, insert, update, delete on public.workout_logs to authenticated;
  ```
  漏掉這段會出現「表存在但 API 讀不到」的詭異狀況
- **免費專案超過 7 天無請求會自動休眠**，需手動到後台喚醒。Hong 一週練三次不會遇到，但**分享給偶爾才用的人可能會中招**。若要處理，可用 GitHub Actions 定時 ping

### 5.3 部署

- GitHub Pages 免費個人版**只支援公開 repo**；但 Hong 用的是企業版（Enterprise Cloud），私有 repo 可以發布
- 注意：**repo 私有 ≠ 網站私有**。發布出去的網站本身是公開的
- 前端程式碼本來就藏不住，所以**不要把任何 secret 放進去**。anon key 例外（它本來就該公開）

---

## 6. UI 慣例（沿用，不要隨意改掉）

### 器械識別

Hong 明確反映過「**看名字不知道是哪台，廠牌不同名稱也不同**」。因此每個動作都有：

1. **SVG 線稿示意圖**（`ICONS` 物件）。慣例：
   - 灰色 `#4A5462` = 機器結構
   - 淺灰 `#98A2B0` = 人
   - `var(--day)` = **會動的部位與出力方向箭頭**
   - viewBox 統一 `0 0 130 100`
2. **一句「怎麼認」**（`ex.id` 欄位）。格式固定為：**坐的方向 → 墊子位置 → 出力方向**。這三件事不因廠牌改變，比機器名稱可靠
3. **替代動作**（`ex.alt` + `ex.why`）。`why` 要解釋動作模式為什麼可以互換（水平推/垂直拉等）

**特別標註過兩個容易搞混的**，不要在重構時弄丟：
- 蝴蝶機 / 反向蝴蝶機常是**同一台**，差在面向哪邊坐
- 髖外展（Hip Abduction）旁邊常有外型幾乎一樣的**髖內收（Hip Adduction）**，墊子在大腿內側

### 其他慣例

- 次數欄**預設帶 10**，只有重量要填。沒填重量的組不算數
- 每個動作顯示「上次最重的那一組」，輸入時即時顯示 `+2.5 kg` / `持平` / `-X kg` 的差異標籤 —— **這是整個 App 的核心互動**
- 三個分項用配重片顏色區分：推 A 藍 `#1E63D8`、拉 B 黃 `#F0B429`、腿 C 綠 `#17A05B`
- 深色底、大輸入框，因為使用情境是健身房裡單手操作手機

---

## 7. Hong 現有的 Notion 資料庫（已存在，可整合）

- 位置：Notion「📖 Codex」頁面 → Hit the gym
- Data source ID：`1f4265a4-a4fd-438b-b1bc-07182962bcc9`
- 欄位：`紀錄`(title) / `日期`(date) / `分項`(select 推 A、拉 B、腿 C) / `動作`(select，12 個選項) / `重量` / `次數` / `組數` / `總量`(formula) / `RIR` / `備註`
- 已建立「依動作看進度」檢視（依動作分組、日期新到舊）
- 建立日期格式需用：`"date:日期:start": "YYYY-MM-DD"`、`"date:日期:is_datetime": 0`

**目前是空的或近乎空的**，因為同步功能未能驗證成功。

---

## 8. 待辦（依優先順序）

### P0 — 讓它真的能用
- [ ] 協助 Hong 完成 Supabase 專案建立與 SQL 執行
- [ ] 填入 URL / anon key，部署到 Cloudflare Pages
- [ ] **驗證 RLS**：用兩個帳號實測資料隔離。跑 `select relname, relrowsecurity from pg_class where relname='workout_logs';` 確認為 `true`
- [ ] 實機測試：手機填 → 電腦開 → 資料在

### P1 — 現場使用體驗
- [ ] **離線容錯**：健身房地下室常沒訊號。目前斷線儲存會直接失敗。建議做暫存佇列，恢復連線後補送
- [ ] RIR 欄位目前 schema 有、UI 沒有。決定要不要加（加了會增加填寫負擔，Hong 的時間很緊）
- [ ] 組間休息計時器（60–75 秒），這是 30 分鐘內完成的關鍵

### P2 — 加值
- [ ] 動作進度圖表（同一動作的重量隨時間變化）
- [ ] 匯出到 Notion（單向，當報表用）
- [ ] 動作清單改成可自訂（目前 12 個動作寫死在 `DAYS` 常數裡）

---

## 9. 請不要做的事

- **不要為了「未來可能有很多使用者」先做複雜架構。** 目前實際使用者是 1 人。Supabase 免費額度到 5 萬 MAU
- **不要把 RLS 拿掉或改成前端過濾。** 這是唯一的安全防線
- **不要在前端放任何 secret key**（Supabase anon key 除外）
- **不要把器械圖和「怎麼認」的說明簡化掉。** 那是 Hong 明確要求的功能，不是裝飾
- **不要繼續投入時間在 Claude 對話沙箱版本的持久化。** 已經證實走不通，換環境是正解

---

## 10. 給接手者的一句話

這個專案在工具本身花掉的時間，已經遠超過它對訓練成果的貢獻。**優先把 P0 做完讓它能用，然後就停手。**

真正決定 90 天結果的是 Hong 每週三次進健身房、每次比上次多推 2.5 公斤，不是這個 App 有幾個功能。如果某個功能不能直接幫他「更快看到上次的數字」或「更快填完今天的數字」，那它大概不該做。
