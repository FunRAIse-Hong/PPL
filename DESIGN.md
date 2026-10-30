---
name: PPL 訓練記錄
description: 牛皮紙底、黑墨尺規線、一頁成績單式的健身房現場記錄介面；開場就是今天要超過的數字。
colors:
  paper: "oklch(96% 0.011 85)"
  paper-2: "oklch(99.5% 0.005 85)"
  paper-3: "oklch(92% 0.016 85)"
  ink: "oklch(18% 0.006 60)"
  ink-2: "oklch(28% 0.008 60)"
  muted: "oklch(44% 0.012 60)"
  rule: "oklch(88% 0.013 85)"
  rule-bar: "oklch(18% 0.006 60)"
  grid: "oklch(90% 0.014 85)"
  accent-tangerine: "oklch(70% 0.19 40)"
  accent-deep: "oklch(60% 0.19 40)"
  accent-ink: "oklch(18% 0.006 60)"
  slot: "oklch(62% 0.07 58)"
  ok-green: "oklch(48% 0.11 150)"
  ok-soft: "oklch(92% 0.04 150)"
  bad-red: "oklch(52% 0.17 27)"
  bad-soft: "oklch(94% 0.03 27)"
typography:
  display:
    fontFamily: "'Red Hat Display', -apple-system, 'PingFang TC', 'Noto Sans TC', sans-serif"
    fontSize: "2.5rem"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  reading:
    fontFamily: "'Red Hat Display', -apple-system, 'PingFang TC', sans-serif"
    fontSize: "3.5rem"
    fontWeight: 600
    lineHeight: 0.9
    fontFeature: "tabular-nums"
  title:
    fontFamily: "'Red Hat Display', -apple-system, 'PingFang TC', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.15
  body:
    fontFamily: "'Red Hat Text', -apple-system, 'PingFang TC', 'Noto Sans TC', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  input:
    fontFamily: "'Red Hat Mono', ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1
    fontFeature: "tabular-nums"
  label:
    fontFamily: "'Red Hat Text', -apple-system, 'PingFang TC', sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  control: "6px"
  pill: "6px"
spacing:
  3xs: "2px"
  2xs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "64px"
  3xl: "96px"
components:
  button-save:
    backgroundColor: "{colors.accent-tangerine}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.control}"
    height: "56px"
    typography: "{typography.body}"
  button-ghost:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "56px"
  day-tab:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
  day-tab-selected:
    backgroundColor: "{colors.accent-tangerine}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.control}"
  goal-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "16px 0"
  goal-row-hit:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
  reading-well:
    backgroundColor: "{colors.paper-2}"
    rounded: "{rounded.control}"
    padding: "24px"
  input-weight:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "56px"
    typography: "{typography.input}"
  chip-delta-up:
    backgroundColor: "{colors.ok-soft}"
    textColor: "{colors.ok-green}"
    rounded: "{rounded.control}"
  chip-delta-down:
    backgroundColor: "{colors.bad-soft}"
    textColor: "{colors.bad-red}"
    rounded: "{rounded.control}"
  timer:
    backgroundColor: "{colors.accent-tangerine}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.control}"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
  banner-error:
    backgroundColor: "{colors.bad-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
---

# Design System: PPL 訓練記錄

## Overview

**Creative North Star: "The Field Record"（現場紀錄簿）**

這是一本在健身房現場填的紀錄簿，不是儀表板。使用情境固定：中午的健身房、單手握著手機、組間 70 秒之內填完一組數字。整個系統只服務一件事：**進門 30 秒內看到今天要超過的數字**。開場是「今天的目標」帳本：每個動作一列，上次（灰）對今天的目標（黑色大字）。

2026-10-30 以 Hallmark 主題 **Furrow** 重設計（取代 08-14 的近黑「清楚・目標感」版）。材質是暖牛皮紙（`paper`）、近黑墨（`ink`）、尺規線；橘色（tangerine）像耳標與打包繩，只當**底色**；綠色代表「達標、比上次好」。過程中試過 Console、Cobalt、Ribbon（亮暗兩版）、Sport、Manifesto，使用者選 Furrow，並明確表示**不喜歡大圓角／膠囊造型與立體按鍵**。

**Key Characteristics:**
- 目標帳本開場，數字先於圖表
- 用線分隔、不框盒子：2px 墨色粗線開啟一個區塊，1px hairline 分列
- 橘色只當底色（主按鈕、選中分項、休息倒數、器械圖箭頭），字永遠是墨色
- 填表數字（輸入欄、上次、歷史、日期）用 Red Hat Mono；大數字（目標）用 Red Hat Display
- 任何寬度維持一列一卡，寬螢幕只是容器放寬置中
- 淺色、`color-scheme: light`；舊版「只有深色」的規則已隨這次重設計取消

## Colors

暖牛皮紙上只有一個彩色訊號（橘色底），綠紅是判讀結果。

- **橘 Tangerine**（`accent-tangerine`）：只當底色，上面一律放墨色字：完成訓練、選中的分項、休息倒數、加入自訂動作。器械圖的出力箭頭用 `accent-deep`。**永遠不拿來當文字顏色。**
- **綠 Earned**（`ok-green` / `ok-soft`）：目標清單的完成勾、差異標籤上升態 `↑ +2.5`、「達標！」字條、同步成功。
- **紅 Down**（`bad-red` / `bad-soft`）：差異標籤下降態、錯誤橫幅、登入錯誤。
- **墨 Ink**：標題、目標數字、粗線（`rule-bar`）、toast 底。
- **紙 Paper 三階**：`paper` 頁面地色；`paper-2`（近白）是可以填的地方：輸入欄、分頁、次要按鈕、目標框；`paper-3` 是凹陷／按下態。
- **Slot**（暖褐）：輸入欄的預填重量（placeholder）、器械圖裡的人。跟實際填入的墨色數字分得開。

**分項三色（火橘／水藍／草綠）已取消**；分項靠分頁上的 Push / Pull / Legs 字樣區分。

## Typography

- **Display**：Red Hat Display 600，sentence case，`-0.035em`。「今天的目標」40px（≥768px 48px）、動作名 24px、歷史日期 20px。
- **Reading**：目標大數字 Red Hat Display 600，3.5rem，tabular。清單裡今天的目標 24px。
- **Body**：Red Hat Text 400，16px，行高 1.55。
- **Label**：Red Hat Text 500，13px，sentence case，**不加字距、不全大寫、不用 mono**。
- **Figures（mono 是材質）**：Red Hat Mono 500，只給「會抄到表上的數字」：輸入欄重量／次數、清單的上次、歷史紀錄、日期、`3 × 10`、差異標籤。
- 中文沒有 webfont，一律落到系統黑體（PingFang TC / Noto Sans TC）；字體用 Google Fonts `display=swap`，網路慢時先顯示系統字，不會擋住畫面。

## Layout

單欄、行動優先。容器最大 500px（≥768px 580px）、左右 16px，置中；**任何寬度都維持一列一卡**（產品層硬約束）。

首屏順序固定：頂列（品牌名＋登出）→ 分項三鍵 → 墨色粗線 → 「今天的目標」＋本週進度 → 目標帳本（動作／上次／今天）→ 訓練日期 → 墨色粗線。目標帳本一定在動作卡之前；趨勢線只在動作卡內。

動作卡（其實是一段，不是盒子）由上而下：2px 墨線 → 器械圖＋名稱＋「怎麼認」→ 方格筆記本框（目標大數字、差異標籤、趨勢線、為什麼這個重量）→ 三組輸入 → 「達標！」→ 替代動作摺疊。卡與卡之間 96px。

下半部：歷史紀錄（成績單式，墨線開頭、hairline 分筆）→ 「編輯動作清單」「認機器的三個問題」兩列可展開 → 版本時間。

固定元素兩個：底部儲存列（紙底、上緣 2px 墨線）與右上休息倒數（放上方避免被鍵盤蓋住）。分項切換：點分頁或全頁左右滑動。

## Shapes & Depth

- 圓角只有 6px（控制項、輸入欄、目標框），**沒有膠囊、沒有大圓角卡片**。
- 沒有陰影、沒有浮起、沒有立體按鍵；深度只靠紙的三階與線。
- 線兩種：`rule-bar` 2px 墨線開啟／結束一個區塊；`rule` 1px hairline 分列。
- 目標框是唯一的「材質」：近白底＋8px 筆記本方格＋1px 墨框。
- 完成勾是圓圈（達標填綠）。

## Components

- **完成訓練**：橘底墨字、56px 高、平的；hover 換深橘，按下換 `paper-3`。disabled 降透明度＋`cursor: not-allowed`＋原生 disabled。
- **清空／分享戰績／移除**：近白底、1px hairline 框、墨字。
- **分項三鍵**：三個等寬方塊，未選近白底＋hairline，選中橘底。
- **輸入欄**：近白底、1px muted 框、6px、**56px 高**（單手現場下限）、Red Hat Mono 24px；單位貼框內右側。focus 用 2px 橘色 outline，邊框寬度不變。
- **差異標籤**：今天？（灰框）、進行中、照表操課、持平、`↑ +2.5`（綠）、`↓ -2.5`（紅）。
- **休息倒數**：右上橘色方塊，mono；歸零顯示「體力全滿，上！」並震動。
- **Toast**：墨底紙字，6px，從下方淡入（transform＋opacity）。
- **錯誤橫幅**：淺紅底、左側 2px 紅線，不會自動消失。

### 器械線稿（Signature）

`viewBox 0 0 130 100`，機器 `muted`、人 `slot`、會動的部位與出力箭頭 `accent-deep`；包在 `mv()` 裡的部件沿箭頭來回、箭頭同節奏描繪（2s loop）；`prefers-reduced-motion` 時全部靜止、箭頭實線。SVG 帶 `class="mach diagram"`。

### 戰績卡

`<canvas>` 1080px 分享圖，使用同一套視覺：牛皮紙底、hairline、墨色數字、綠色「進化了！」。canvas 不吃 oklch，顏色以 hex 常數寫在 `shareImage()`，**改色票時要同步改那裡**。

## Do's and Don'ts

### Do
- 橘色只當底色，上面放墨色字。
- 可比較的數字用 tabular；會抄到表上的用 Red Hat Mono。
- 用線分區，紙的三階分層。
- 輸入欄與主鍵維持 56px。
- 每個顏色與字體都走 `:root` token；CSS 第一行是 Hallmark stamp。
- 改主介面色票時同步更新戰績卡 hex 常數與 favicon。

### Don't
- 不要大圓角、膠囊、陰影、立體按鍵（使用者明確不喜歡）。
- 不要橘色文字，不要第二個強調色。
- 不要把圖表或統計放到目標帳本之前。
- 不要多欄並排，任何寬度都一列一卡。
- 不要全大寫或加字距的小標籤；不要 emoji 當圖示。
- 不要簡化掉器械圖、「怎麼認」、替代動作。
