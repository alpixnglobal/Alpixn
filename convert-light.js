const fs = require('fs');
const path = require('path');

const dirs = ['app', 'components', 'admin'];

const rules = [
  { match: /\btext-white\b/g, rep: 'text-[#00070e] dark:text-white' },
  { match: /\bbg-\[#00070E\]\b/ig, rep: 'bg-white dark:bg-[#00070e]' },
  { match: /\bbg-\[#020617\]\b/ig, rep: 'bg-white dark:bg-[#020617]' },
  { match: /\bbg-[#]020617\b/ig, rep: 'bg-[#f4f4f5] dark:bg-[#020617]' },
  { match: /\bbg-white\/10\b/g, rep: 'bg-black\/5 dark:bg-white\/10' },
  { match: /\bbg-white\/\[0\.04\]\b/g, rep: 'bg-black\/[0.04] dark:bg-white\/[0.04]' },
  { match: /\bbg-white\/\[0\.02\]\b/g, rep: 'bg-black\/[0.02] dark:bg-white\/[0.02]' },
  { match: /\bbg-white\/\[0\.03\]\b/g, rep: 'bg-black\/[0.03] dark:bg-white\/[0.03]' },
  { match: /\border-white\/10\b/g, rep: 'border-black\/10 dark:border-white\/10' },
  { match: /\border-white\/20\b/g, rep: 'border-black\/20 dark:border-white\/20' },
  { match: /\border-white\/16\b/g, rep: 'border-black\/15 dark:border-white\/16' },
  { match: /\bbg-white\/6\b/g, rep: 'bg-black\/5 dark:bg-white\/6' },
  { match: /\btext-slate-300\b/g, rep: 'text-slate-600 dark:text-slate-300' },
  { match: /\btext-slate-400\b/g, rep: 'text-slate-500 dark:text-slate-400' },
  { match: /\btext-cyan-50\b/g, rep: 'text-cyan-950 dark:text-cyan-50' },
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      processDir(full);
    } else if (stat.isFile() && full.endsWith('.tsx')) {
      let content = fs.readFileSync(full, 'utf8');
      let changed = false;
      rules.forEach(rule => {
        if (rule.match.test(content)) {
          content = content.replace(rule.match, rule.rep);
          changed = true;
        }
      });
      

      if (changed) {
        fs.writeFileSync(full, content, 'utf8');
        console.log('Updated', full);
      }
    }
  }
}

dirs.forEach(d => {
  if (fs.existsSync(d)) processDir(d);
});
console.log("Done");
