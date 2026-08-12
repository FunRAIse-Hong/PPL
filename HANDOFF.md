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
| `index.html` | **主線，已上線** | https://funraise-hong.github.io/PPL/ ，Supabase 版，多人、跨裝置 |
| `supabase-setup.sql` | 已執行 | 建表 + RLS + grants（`user_settings` 段落 2026-08-12 新增，需在 SQL Editor 補跑） |
| `magic-link.sh` / `Makefile` | 工具 | `make link <email>` 免寄信產生登入連結（需 service_role key）；`make serve` 本機預覽 |

---

## 3. 架構決策（以及為什麼）

### 為什麼選 Supabase

需求是「未來分享給別人用，每個人只看得到自己的紀錄」。Supabase 的 **RLS（Row Level Security，資料列層級權限）** 在**資料庫端**做隔離，不是靠前端判斷 —— 這是唯一可靠的做法。

- 前端只拿得到 `anon key`，這把金鑰**設計上就是公開的**
- 安全性完全由 RLS 提供。**RLS 沒開 = 資料全裸**，這是本專案唯一的安全防線
- 靜態 HTML 直接連 Supabase，**不需要自架後端**

### 為什麼不用 Notion 當後端

Notion API 需要 secret key，不能放前端。要藏就得自架伺服器，那不如直接用 Supabase。
（2026-08-12：Notion 整合已整個取消，包括原本考慮的單向匯出。）

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

## 4. Supabase 設定步驟（已完成，留作參考）

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

## 7. 待辦（依優先順序）

### P0 — 讓它真的能用（2026-08-11 完成）
- [x] Supabase 專案建立與 SQL 執行
- [x] 填入 URL / publishable key，部署到 GitHub Pages（repo 轉公開；帳號是個人免費方案，非企業版）：https://funraise-hong.github.io/PPL/
- [x] **驗證 RLS**：匿名寫入被 42501 擋下、匿名讀取回空陣列
- [x] 實機測試：離線佇列全流程實測通過

### P1 — 現場使用體驗（2026-08-11 完成）
- [x] **離線容錯**：儲存失敗且離線時暫存到 localStorage（`ppl_pending`），恢復連線（`online` 事件或下次開啟）自動補送
- [x] RIR 欄位：**決定不加 UI**。多一欄多一分填寫負擔，與 30 分鐘目標衝突；schema 保留，未來要加隨時可加
- [x] 組間休息計時器：填完重量（change 事件）自動起跳 70 秒倒數，右下角浮動顯示，結束震動提示，點擊可關閉

### P2 — 加值（2026-08-12 完成）
- [x] 動作進度圖表：每個動作卡片內的 sparkline（每次訓練最重一組，最近 10 次）
- [x] ~~匯出到 Notion~~ 已取消，Notion 整合不做
- [x] 動作清單可自訂：`user_settings.days` jsonb（隱藏預設動作、新增自訂動作），UI 在動作列表下方「編輯動作清單」

---

## 8. 請不要做的事

- **不要為了「未來可能有很多使用者」先做複雜架構。** 目前實際使用者是 1 人。Supabase 免費額度到 5 萬 MAU
- **不要把 RLS 拿掉或改成前端過濾。** 這是唯一的安全防線
- **不要在前端放任何 secret key**（Supabase anon key 除外）
- **不要把器械圖和「怎麼認」的說明簡化掉。** 那是 Hong 明確要求的功能，不是裝飾
- **不要繼續投入時間在 Claude 對話沙箱版本的持久化。** 已經證實走不通，換環境是正解

---

## 9. 給接手者的一句話

這個專案在工具本身花掉的時間，已經遠超過它對訓練成果的貢獻。**優先把 P0 做完讓它能用，然後就停手。**

真正決定 90 天結果的是 Hong 每週三次進健身房、每次比上次多推 2.5 公斤，不是這個 App 有幾個功能。如果某個功能不能直接幫他「更快看到上次的數字」或「更快填完今天的數字」，那它大概不該做。
