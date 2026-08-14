---
name: PPL 訓練記錄
description: 近黑底、單色分項、mono 數字的健身房現場記錄介面——開場就是今天要超過的數字。
colors:
  bg: "#0A0B0D"
  panel: "#15171B"
  panel-2: "#0F1114"
  line: "#24272C"
  text: "#F2F3F5"
  dim: "#9BA1A8"
  dimmer: "#868C94"
  on-accent: "#0B0D06"
  dayA-fire: "#FF8A3D"
  dayB-water: "#5C9EFF"
  dayC-grass: "#82D94F"
  up: "#30D158"
  down: "#FF6961"
  warn: "#FFD60A"
  warn-line: "#5C511A"
  warn-bg: "#1F1C0E"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'PingFang TC', 'Noto Sans TC', 'Microsoft JhengHei', sans-serif"
    fontSize: "32px"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  metric:
    fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Mono', 'Roboto Mono', 'JetBrains Mono', Menlo, Consolas, monospace"
    fontSize: "40px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "tabular-nums"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'PingFang TC', 'Noto Sans TC', 'Microsoft JhengHei', sans-serif"
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'PingFang TC', 'Noto Sans TC', 'Microsoft JhengHei', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  input:
    fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Mono', 'Roboto Mono', 'JetBrains Mono', Menlo, Consolas, monospace"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "normal"
    fontFeature: "tabular-nums"
  label:
    fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Mono', 'Roboto Mono', 'JetBrains Mono', Menlo, Consolas, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.14em"
rounded:
  hair: "3px"
  sm: "8px"
  seg: "9px"
  md: "10px"
  lg: "12px"
  xl: "14px"
  card: "16px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "22px"
components:
  button-save:
    backgroundColor: "{colors.dayA-fire}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.xl}"
    padding: "17px"
    typography: "{typography.title}"
  button-ghost:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.dim}"
    rounded: "{rounded.xl}"
    padding: "17px"
  segmented-tab:
    backgroundColor: "transparent"
    textColor: "{colors.dim}"
    rounded: "{rounded.seg}"
    padding: "10px 0"
  segmented-tab-selected:
    backgroundColor: "{colors.panel-2}"
    textColor: "{colors.dayA-fire}"
    rounded: "{rounded.seg}"
    padding: "10px 0"
  goal-row:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    padding: "12px 16px"
  goal-row-hit:
    backgroundColor: "transparent"
    textColor: "{colors.dim}"
    padding: "12px 16px"
  card-exercise:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
    padding: "16px"
  input-weight:
    backgroundColor: "{colors.panel-2}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "0 40px 0 14px"
    height: "54px"
    typography: "{typography.input}"
  chip-delta:
    backgroundColor: "{colors.panel-2}"
    textColor: "{colors.dimmer}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  chip-delta-up:
    backgroundColor: "{colors.panel-2}"
    textColor: "{colors.up}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  chip-delta-down:
    backgroundColor: "{colors.panel-2}"
    textColor: "{colors.down}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  timer-fab:
    backgroundColor: "{colors.dayA-fire}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.pill}"
    padding: "13px 20px"
  toast:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
  banner-warn:
    backgroundColor: "{colors.warn-bg}"
    textColor: "{colors.warn}"
    rounded: "{rounded.xl}"
    padding: "12px 14px"
---

# Design System: PPL 訓練記錄

## Overview

**Creative North Star: "The Weight Room Instrument"（重訓室儀表）**

這是一支器械，不是一份儀表板。使用情境固定：中午的健身房、單手握著手機、組間 70 秒之內填完一組數字。所以整個系統只服務一件事——**進門 30 秒內看到今天要超過的數字**。開場不是圖表、不是週統計、不是歡迎語，是「今天的目標清單」：每個動作一列，左邊狀態圈、右邊一個用等寬數字寫死的公斤數。填進去超過了，圈變綠。這是全系統的第一原理，其他每個決定都往這條線收斂。

材質是中性的近黑（`#0A0B0D`），面板比地色亮一階（`#15171B`）而不是靠邊框浮起來；分隔用 1px hairline（`#24272C`），不是描邊。整套介面在任何時刻只有**一個**彩色：當日分項色。推＝火橘、拉＝水藍、腿＝草綠，三色互斥，切分項時整支 App 的強調色一起換。綠色（`#30D158`）與紅色（`#FF6961`）不是裝飾色，是「超過／退步」的語意訊號，出現即代表數字判讀結果。

工藝對標 Apple Fitness 與 Hevy：正統健身 App 的克制，不玩梗、不反諷。寶可夢御三家已降級為彩蛋——分項 emoji 🔥💧🌿、達標時的「進化了！比上次更強」、休息倒數結束的「體力全滿，上！」。這三處是全系統僅存的熱血口吻，是刻意保留的授權彩蛋，不是可以往外擴張的語氣許可。道館、收服、制霸類主文案已明確退場，不得回歸。

**Key Characteristics:**
- 目標清單開場，數字先於圖表
- 一次只有一個強調色（當日分項色），彩色面積 <10%
- 所有度量值一律 mono + tabular-nums，欄位不會因數字寬度跳動
- 無邊框面板 + hairline 分隔 + 中性黑影，不用彩色光暈
- 任何寬度維持一列一卡，寬螢幕只是多留白
- 全域 `color-scheme:dark`，沒有淺色模式，也不打算有

## Colors

近黑中性地色上，只讓一個高彩度分項色說話；語意綠／紅只在判讀結果出現。

### Primary

分項色系統：三色互斥，執行期由 `--day` 別名指向當日那一個。所有「今天的數字」——目標公斤數、輸入框 focus 邊、儲存鍵、休息倒數、趨勢線、caret、選取反白——都吃這個別名。

- **火橘 Fire Orange**（`{colors.dayA-fire}`）：推日（Push / 胸肩三頭）。也是全 App 的預設值與 favicon 主色。
- **水藍 Water Blue**（`{colors.dayB-water}`）：拉日（Pull / 背二頭後肩）。
- **草綠 Grass Green**（`{colors.dayC-grass}`）：腿日（Legs / 腿臀核心）。

### Secondary

判讀語意色。它們回答的是「比上次好還是壞」，不是視覺層級。

- **達標綠 Verdict Green**（`{colors.up}`）：delta chip 上升態、目標清單的完成勾、戰績卡的「進化了！」標籤。
- **退步紅 Verdict Red**（`{colors.down}`）：delta chip 下降態、登入錯誤訊息。
- **警示黃 Caution Yellow**（`{colors.warn}`）：只給錯誤橫幅，配深黃底（`{colors.warn-bg}`）與暗黃框線（`{colors.warn-line}`）。這是唯一允許同時出現底色與框線的元件。

### Neutral

- **深井黑 Pit Black**（`{colors.bg}`）：頁面地色，也是儲存列漸層與戰績卡底。
- **面板灰 Panel Grey**（`{colors.panel}`）：所有卡片、段控制器容器、toast、歷史列。比地色亮一階，靠色階分層而非邊框。
- **凹陷灰 Recessed Grey**（`{colors.panel-2}`）：輸入框、delta chip、被選中的段控制器格、器械圖底。比面板**暗**一階，代表「凹進去可以填的地方」。
- **髮絲線 Hairline**（`{colors.line}`）：1px 分隔線、輸入框邊、週進度未完成點。
- **主文字 Primary Text**（`{colors.text}`）：標題、動作名稱、輸入值。
- **次文字 Dim**（`{colors.dim}`）：說明、單位、標籤、已完成的目標列。
- **三階文字 Dimmer**（`{colors.dimmer}`）：品牌列、mono 微標籤、placeholder。
- **反白字 On-Accent**（`{colors.on-accent}`）：印在分項色實心底上的字（儲存鍵、休息倒數、新增鍵）。永遠是這個近黑，不是純黑也不是白。

### Named Rules

**The One Colour Rule.** 任何一個畫面上只有一個分項色在說話。要加新的強調色之前，先問它能不能用 `--day`；不能的話，它大概不該有顏色。

**The Verdict Colour Rule.** 綠與紅是判讀結果，不是主題色。除了「比上次進步／退步」與其直接衍生（完成勾、進化標籤、成功／失敗訊息），任何地方都不准用它們著色。

**The Recess Rule.** 比面板暗 = 可以填；比地色亮 = 是內容。輸入框與被選中的段控制器格都用凹陷灰，因為它們都是「你要動的地方」。

## Typography

**Display / Body Font:** 系統 sans（`-apple-system` → `PingFang TC` → `Noto Sans TC` → `Microsoft JhengHei`）
**Metric / Label Font:** 系統 mono（`ui-monospace` → `SF Mono` → `Cascadia Mono` → `Roboto Mono` → `JetBrains Mono` → `Menlo`）

**Character:** 中文走系統原生黑體，讀起來就是這支手機該有的樣子，不載任何 webfont（現場網路不可靠，字體不能是等待的理由）。所有可比較的數字交給等寬字＋`tabular-nums`，讓上下兩組重量在視覺上真的對齊——這支 App 的核心動作就是「比大小」。

### Hierarchy

- **Display**（sans 800，32px，行高 1.1，`-0.02em`）：頁面主標「今天的目標」。≥768px 放大到 38px，≤360px 縮到 28px。
- **Metric**（mono 800，40px，行高 1，`-0.03em`，tabular）：動作卡上的目標公斤數，全 App 最大的字。單位 `kg` 以 14px 次文字色綴在後面。
- **Title**（sans 700，17px，`-0.01em`）：動作中文名。英文名以 mono 10.5px、`0.04em`、三階文字色墊在下面。
- **Input**（mono 700，20px，tabular）：重量／次數輸入值。單位貼在框內右側，11px mono 三階色。
- **Body**（sans 400，16px，行高 1.5）：全域基準；卡內說明文字降到 12.5–13.5px 次文字色。
- **Label**（mono，10–11px，`0.12em`–`0.16em`）：品牌列（11px/`0.14em`）、欄位表頭（10px/`0.16em`）、替代動作摺疊標題（11px/`0.12em`）、同步狀態。唯一的 sans 例外是「歷史紀錄」區標（sans 900，13px，`0.15em`）。

### Named Rules

**The Tabular Rule.** 任何會被拿來互相比較的數字——重量、次數、delta、日期、倒數、週次——一律 mono + `font-variant-numeric: tabular-nums`。中文敘述文字一律 sans。兩者不混用。

**The No Webfont Rule.** 不引入任何外部字體。字重與字距是唯一的排版工具。

## Layout

單欄、行動優先。內容容器最大 480px、左右各 16px padding，置中；≥768px 只把容器放寬到 560px、主標放大，**不改成多欄**——任何寬度都維持一列一卡（這是產品層的硬約束，不是視覺偏好）。

垂直節奏：卡片間距 12px、卡內 padding 16px、區塊之間 14–26px。頁面底部保留 110px padding，讓固定儲存列不會蓋住最後一張卡；儲存列自身 padding 吃 `env(safe-area-inset-bottom)`。

首屏順序是固定的敘事：品牌列 → 主標 → 本週 x/3 點列 → 分項段控制器 → **目標清單卡** → 訓練日期 → 動作卡群。目標清單一定在動作卡之前；圖表（sparkline）永遠在動作卡內部，不上首屏。

固定元素只有兩個：底部儲存列（`linear-gradient(to top, bg 70%, transparent)` 淡出，不用毛玻璃），與右下休息倒數膠囊（`bottom:112px`，浮在儲存列上方）。Toast 從 96px 升到 104px 出現。

分項切換有兩條路徑：段控制器點擊，以及全頁左右滑動（位移 >60px 且水平明顯大於垂直，起點避開左右各 24px 的 iOS 返回手勢區）。

## Elevation & Depth

**這套系統用色階分層，陰影只負責「浮在內容之上」。** 卡片與地色的分離靠 `panel` 比 `bg` 亮一階，不靠邊框；輸入框與地面的分離靠 `panel-2` 比 `panel` 暗一階。所有陰影都是中性黑，沒有任何彩色光暈——分項色只出現在填色與線條，不擴散成 glow。

### Shadow Vocabulary

- **Card rest**（`box-shadow: 0 1px 8px rgba(0,0,0,.35)`）：目標清單卡與動作卡的靜態陰影。幾乎看不見，作用是讓卡緣不糊在地色裡。
- **Segment raise**（`box-shadow: 0 1px 2px rgba(0,0,0,.5)`）：段控制器被選中那一格的抬起感，配合 `panel-2` 底色形成實體按鈕。
- **Action lift**（`box-shadow: 0 2px 10px rgba(0,0,0,.4)`）：儲存鍵。
- **Float**（`box-shadow: 0 4px 14px rgba(0,0,0,.45)` / `0 4px 16px rgba(0,0,0,.5)`）：休息倒數膠囊與 toast，唯二真正離開頁面平面的元件。

### Named Rules

**The Neutral Shadow Rule.** 陰影一律 `rgba(0,0,0,·)`。分項色不做光暈、不做彩色陰影、不做外框發光。

**The Tonal Separation Rule.** 需要分層時先調色階，不夠再加 hairline，最後才考慮陰影。卡片沒有邊框。

## Shapes

圓角依尺度遞增而非統一：大卡片 16px、動作按鈕與橫幅 14px、輸入框與段控制器容器 12px、被選中的段格 9px（比容器小 3px，形成內嵌 inset）、小型控制 8–10px。膠囊形（999px）只給三種東西：delta chip、toast、休息倒數。狀態圈是正圓（`border-radius:50%`，22px，2px 邊）。週進度點是 20×5px 的 3px 圓角短棒。

線的用法只有兩種：**hairline 分隔**（目標清單列之間、動作卡欄位表頭下方、替代動作摺疊區上緣）與 **1px 描邊**（輸入框、ghost 鍵、日期欄——都是可互動的表面）。純展示的面板永遠不描邊。

器械線稿 SVG 是這套系統的簽名幾何：88×68 的凹陷灰底塊上，機器結構用 `#5C6675`、人體用 `#98A2B0`、**會動的部位與出力方向用當日分項色**畫成帶箭頭的路徑。線帽線接一律圓頭。

## Components

### Buttons

- **Shape:** 主要動作偏方（14px 圓角），漂浮控制走膠囊（999px）。
- **儲存鍵（完成訓練）:** 分項色實心底 + 近黑字（`{colors.on-accent}`），17px padding、17px 800 字重，佔滿儲存列剩餘寬度。`:active` 用 `filter: brightness(.9)`，不位移。disabled 降到 60% 不透明。
- **Ghost（清空）:** 面板底、次文字色、1px hairline 邊，字級降到 14px。永遠比主鍵窄，不搶視線。
- **文字鍵（登出）:** mono 11px、次文字色、底線 offset 3px。品牌列專用。

### Chips

- **Delta chip:** 膠囊、凹陷灰底、tabular 數字。三態——未填「今天？」（三階文字色）、上升 `↑ +2.5`（綠字＋18% 綠混入底色）、持平「持平」（次文字色）、下降 `↓ -2.5`（紅字＋14% 紅混入底色）。底色永遠是 `color-mix` 出來的低飽和版本，不是純色。
- **狀態:** chip 只反映輸入框的即時內容，不需要儲存就會變。

### Cards / Containers

- **Corner Style:** 16px（大卡）。
- **Background:** `{colors.panel}`，無邊框。
- **Shadow Strategy:** Card rest（見 Elevation）。
- **Internal Padding:** 16px；卡內區塊用 `padding: … 16px` 對齊同一條左緣。
- **結構:** 動作卡由上而下固定為——器械圖＋名稱區 → 目標大數字＋delta chip → 上次最重 → sparkline → 欄位表頭 → 三組輸入 → 「進化了！」→ 替代動作摺疊區。

### Inputs / Fields

- **Style:** 凹陷灰底、1px hairline 邊、12px 圓角、**54px 高**（現場單手點擊的下限）、mono 20px 700。單位文字絕對定位在框內右側 12px，`pointer-events:none`。
- **Focus:** 邊框換成分項色；`:focus-visible` 另外加 2px 分項色 outline（offset 2px）。滑鼠點擊不顯示 outline，鍵盤導覽會。
- **Placeholder:** 上一次的重量（三階文字色）——空欄位也在告訴你上次推多少。
- **caret:** 全域 `caret-color: var(--day)`。

### Navigation

- **分項段控制器:** 面板底容器、3px 內距、三等分 grid、3px 間隙。未選中格透明底、次文字色、700。選中格換 `panel-2` 底、800 字重、**文字染成該分項色**（`--c`），加 Segment raise 陰影。分項色只上文字，不上底——底色保持中性，這是「一次一色」在最擁擠的地方的具體做法。
- **標籤內容:** `🔥 推 A` / `💧 拉 B` / `🌿 腿 C`，emoji 是唯一的彩蛋殘留。
- **手勢:** 全頁左右滑動等價於切換分項；切換後 smooth scroll 回頂端。
- **自動選日:** 週一/三/五 = 推/拉/腿，其他日子預設下一個訓練日；只有在看「今天該練的分項」時主標才敢說「今天的目標」，否則改稱「◯日的目標」。

### 目標清單（Signature Component）

開場第一眼，也是這套設計的論點本身。面板卡內每個動作一列 `[狀態圈] [動作名] [目標公斤]`，列間 hairline，最後一列不畫線。

- **目標值** = 上次最重 + 2.5kg（最小槓片級距），mono 700 分項色；沒有紀錄時顯示「試重量」。
- **達標態（`.hit`）:** 狀態圈填綠、邊框轉綠、勾號變深綠字，播 `pop` 動畫（0.35s，`cubic-bezier(.19,1,.22,1)`，scale 0.6 → 1.15 → 1）；同一列的名稱與數字褪成次文字色——**完成的事情要退到背景去**。無障礙上同時寫入隱藏文字「（已達標）」。
- **點擊行為:** 捲動到該動作卡並 focus 重量欄。清單是導覽，不只是狀態顯示。

### Sparkline（Signature Component）

動作卡內的重量趨勢，最近 10 次、每次取最重那組；少於 2 次不畫（兩點才是趨勢）。

- 單一序列，`stroke: var(--day)`，2px。
- `viewBox="0 0 280 56"` + `preserveAspectRatio="none"`，讓線橫向撐滿卡片；所有 stroke 加 `vector-effect="non-scaling-stroke"`，所以拉伸不會讓線變粗。資料點是 6px 圓帽的零長度線段，各自帶原生 `<title>` tooltip（日期＋公斤）。
- 最後一點的數值用 **HTML `<span>` 直接標在右側**（絕對定位、mono 12px），不放進 SVG——因為 SVG 被非等比拉伸過，裡面的文字會變形。右側預留 46px 給這個標籤。
- 整個 `<svg>` 帶 `role="img"` 與中文 `aria-label`。

### 休息倒數（Signature Component）

填入任一重量即視為完成一組，自動起跳 70 秒倒數：右下角分項色膠囊、mono 800 17px tabular、Float 陰影。歸零時文字換成「體力全滿，上！」、觸發 `[200,100,200]` 震動、5 秒後自動收起。點一下可提前關掉。

### Toast / Banner

- **Toast:** 膠囊、面板底、hairline 邊、13px 600，從 96px 升到 104px 並淡入（0.2s），1.8 秒後消失。用於一次性回饋（已儲存、已複製、已清空）。
- **Banner:** 警示黃三件套（底／框／字），14px 圓角，`white-space: pre-wrap`，出現在段控制器上方。用於需要使用者處理的持續錯誤（讀取失敗、離線補送失敗），不會自動消失。

### 戰績卡（Signature Component）

`<canvas>` 畫出的 1080px 寬分享圖，**使用與主介面同一套視覺**：`#0A0B0D` 底、頂端 10px 分項色橫條、`#24272C` hairline 分隔每個動作列、動作名 sans 600、數值 mono 800 分項色、「進化了！」標籤染綠、本週進度三顆分項色圓角短棒。分項色從 `getComputedStyle` 讀取執行期的 `--day`，所以永遠與當下畫面一致。

**戰績卡不是行銷素材，是同一個設計系統的另一個輸出裝置。** 改動主介面的色票或字體時，這裡必須跟著改。

## Do's and Don'ts

### Do:

- **Do** 讓畫面上只有一個彩色：當日分項色（`var(--day)`）。新元件要強調時先問能不能用它。
- **Do** 把所有可比較的數字設成 mono + `tabular-nums`，中文敘述設成系統 sans。
- **Do** 用色階分層：`panel` 比 `bg` 亮一階代表內容，`panel-2` 比 `panel` 暗一階代表可填寫。
- **Do** 讓可互動的表面（輸入框、ghost 鍵、日期欄）有 1px hairline 描邊，純展示面板不描邊。
- **Do** 把輸入框維持在 54px 高、主鍵維持 17px padding——這是單手現場操作的下限。
- **Do** 用 `cubic-bezier(.19,1,.22,1)` 給那唯一一個被作者化的動作瞬間（達標 pop 0.35s、「進化了！」升起 0.4s）；其他狀態轉場用 0.15–0.25s 的樸素過渡。
- **Do** 尊重 `prefers-reduced-motion: reduce`（全域關閉 transition）。
- **Do** 在任何寬度維持一列一卡；寬螢幕只放寬容器（480px → 560px）與放大主標。
- **Do** 器械線稿維持三色分工：機器 `#5C6675`、人體 `#98A2B0`、會動的部位與出力方向用分項色。
- **Do** 更新主介面色票或字體時，同步更新戰績卡（canvas）裡的對應常數。

### Don't:

- **Don't** 把兩個分項色同時放在畫面上（段控制器也只染被選中那一格的文字）。
- **Don't** 用綠或紅當裝飾色——它們只表示「比上次進步／退步」。
- **Don't** 用彩色陰影或發光。陰影一律 `rgba(0,0,0,·)`。
- **Don't** 給卡片加邊框，或用邊框取代色階分層。
- **Don't** 引入外部字體、圖示字型或 CDN 樣式表。
- **Don't** 讓圖表、統計或儀表板出現在目標清單之前——首屏必須是「今天要超過的數字」。
- **Don't** 在多欄或並排卡片上做文章，任何寬度都不行。
- **Don't** 把御三家梗擴張回主文案。emoji 🔥💧🌿、「進化了！比上次更強」、「體力全滿，上！」是完整清單；道館／收服／制霸類語彙不得回歸。
- **Don't** 在被 `preserveAspectRatio="none"` 拉伸的 SVG 裡放文字——端點數值用 HTML 疊上去。
- **Don't** 增加淺色模式。`color-scheme:dark` 是這支 App 的使用情境（健身房、深色底、大字）決定的，不是主題偏好。
