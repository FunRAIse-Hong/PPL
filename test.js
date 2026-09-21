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
const ctx = { day: "A", state: { A: [] }, $: () => ({value: selDate}), todayStr: () => selDate };
vm.createContext(ctx);
vm.runInContext(
  ["function bestOf(sets)", "function lastBest(i)", "const TARGET_STEP", "const round25", "const setTargets", "const targetOf"]
    .map(grab).join("\n") +
  ";this.bestOf=bestOf;this.lastBest=lastBest;this.setTargets=setTargets;this.targetOf=targetOf;", ctx);

/* 0 = 蝴蝶機 (skipped on the most recent day), 1 = 划船 (done every time) */
ctx.state.A = [
  {date:"2026-09-01", data:[[{w:"20",r:"10"},{w:"22.5",r:"9"},{w:"25",r:"8"}], [{w:"40",r:"10"},null,null]]},
  {date:"2026-09-10", data:[[null,null,null],                                  [{w:"42.5",r:"10"},null,null]]},
];

// skipping an exercise falls back to the session before last, not 試重量
assert.strictEqual(ctx.targetOf(ctx.lastBest(0)), 27.5);
assert.strictEqual(ctx.lastBest(0).stale, true);
assert.strictEqual(ctx.lastBest(0).date, "2026-09-01");
// an exercise done last time still uses last time
assert.strictEqual(ctx.targetOf(ctx.lastBest(1)), 45);
assert.strictEqual(ctx.lastBest(1).stale, false);
// never trained → no target, UI falls back to 試重量
ctx.state.A = [];
assert.strictEqual(ctx.lastBest(0), null);
// ramp: warm-up → match last time → breakthrough, all on 2.5kg steps
assert.deepStrictEqual([...ctx.setTargets(25)], [22.5, 25, 27.5]);
assert.deepStrictEqual([...ctx.setTargets(65)], [57.5, 65, 67.5]);

console.log("ok");
