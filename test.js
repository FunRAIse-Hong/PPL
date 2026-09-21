/* node test.js — the target-weight maths, pulled straight out of index.html.
   ponytail: regex extraction because the logic lives inline in the single HTML
   file; if that ever stops being true, import it properly instead. */
const fs = require("fs"), vm = require("vm"), assert = require("assert");
const src = fs.readFileSync(__dirname + "/index.html", "utf8");

/* slice one top-level declaration out of the file, brace-matched */
function grab(head){
  const i = src.indexOf(head);
  if(i < 0) throw new Error("not found in index.html: " + head);
  let depth = 0, seen = false, j = i;
  for(; j < src.length; j++){
    const c = src[j];
    if(c === "{"){ depth++; seen = true; }
    else if(c === "}"){ if(--depth === 0 && seen){ j++; break; } }
    else if(c === ";" && !seen){ j++; break; }
  }
  return src.slice(i, j);
}

let selDate = "2026-09-21";
const ctx = { day: "A", state: {A: []}, $: () => ({value: selDate}), todayStr: () => selDate };
vm.createContext(ctx);
vm.runInContext(
  ["const REP_GOAL", "const TARGET_STEP", "const round25", "const topTarget",
   "const setTargets", "const targetOf", "function bestOf(sets)", "function lastBest(i)"]
    .map(grab).join("\n") +
  ";this.lastBest=lastBest;this.setTargets=setTargets;this.targetOf=targetOf;this.topTarget=topTarget;", ctx);

const sets = (...a) => a.map(([w,r]) => w == null ? null : {w:String(w), r:String(r)});
const ramp = w => [...ctx.setTargets(w)];

/* ---- 往回找：上次沒做的動作不該退回「試重量」 ---- */
// 0 = 蝴蝶機 (skipped on the most recent day), 1 = 划船 (done every time)
ctx.state.A = [
  {date:"2026-09-01", data:[sets([20,10],[22.5,10],[25,10]), sets([40,10],[null],[null])]},
  {date:"2026-09-10", data:[sets([null],[null],[null]),      sets([42.5,10],[null],[null])]},
];
assert.strictEqual(ctx.lastBest(0).date, "2026-09-01");
assert.strictEqual(ctx.lastBest(0).stale, true);
assert.strictEqual(ctx.lastBest(1).date, "2026-09-10");
assert.strictEqual(ctx.lastBest(1).stale, false);
// never trained → no target, UI falls back to 試重量
ctx.state.A = [];
assert.strictEqual(ctx.lastBest(0), null);

/* ---- 雙重漸進：加重要用次數換 ---- */
const only = rows => { ctx.state.A = [{date:"2026-09-10", data:[sets(...rows)]}]; return ctx.lastBest(0); };

// 三組都滿 10 下 → 賺到，頂組 +2.5
let p = only([[22.5,10],[25,10],[27.5,10]]);
assert.strictEqual(p.earned, true);
assert.strictEqual(ctx.topTarget(p), 30);
assert.deepStrictEqual(ramp(30), [25, 27.5, 30]);

// 頂組只做到 8 下 → 沒賺到，頂組維持 27.5，這次把 10 下做滿
p = only([[22.5,10],[25,10],[27.5,8]]);
assert.strictEqual(p.earned, false);
assert.strictEqual(ctx.topTarget(p), 27.5);
assert.deepStrictEqual(ramp(27.5), [22.5, 25, 27.5]);

// 只填兩組 → 沒做完，不算賺到
p = only([[22.5,10],[25,10],[null]]);
assert.strictEqual(p.earned, false);
assert.strictEqual(ctx.topTarget(p), 25);

// 超過 10 下也算賺到（12 下 ≥ 10）
assert.strictEqual(only([[25,12],[25,12],[25,11]]).earned, true);
// 有一組掉到 9 下就不算
assert.strictEqual(only([[25,10],[25,9],[25,10]]).earned, false);
// 次數沒填 → 不算賺到（NaN >= 10 為 false）
assert.strictEqual(only([[25,""],[25,""],[25,""]]).earned, false);

/* ---- ramp：三組各差一片，頂組就是目標；很輕時不會出現 0 或負數 ---- */
assert.deepStrictEqual(ramp(52.5), [47.5, 50, 52.5]);
assert.deepStrictEqual(ramp(5),    [2.5, 2.5, 5]);
assert.deepStrictEqual(ramp(2.5),  [2.5, 2.5, 2.5]);

/* ---- targetOf 是目標清單用的頂組數字 ---- */
assert.strictEqual(ctx.targetOf(only([[25,10],[25,10],[25,10]])), 27.5);
assert.strictEqual(ctx.targetOf(only([[25,10],[25,10],[25,7]])), 25);
assert.strictEqual(ctx.targetOf(null), null);

/* ---- 每個動作都是 3 × 10 ---- */
const bad = [...src.matchAll(/target:"([^"]*)"/g)].map(m=>m[1]).filter(t => t && t !== "3 × 10");
assert.deepStrictEqual(bad, [], "還有非 3 × 10 的動作: " + bad);

console.log("ok");
