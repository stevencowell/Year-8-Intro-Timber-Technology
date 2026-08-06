import fs from 'node:fs';
import crypto from 'node:crypto';
const root = new URL('./', import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), 'utf8');
const data = JSON.parse(read('assets/course-data.json'));
const theory = JSON.parse(read('assets/theory.json'));
const routeFiles = ['index.html','plans.html','busy-work.html','youtube.html','folio.html','teacher-resources.html'];
const requiredNav = ['https://stevencowell.github.io/Main-Page/','busy-work.html','teacher-resources.html'];
const routeChecks = Object.fromEntries(routeFiles.map((file) => [file, requiredNav.filter((target) => !read(file).includes(target))]));
const planHash = crypto.createHash('sha256').update(fs.readFileSync(new URL('assets/resources/Footstool.pdf', root))).digest('hex');
const checks = {
  sections: data.sections.length,
  questions: data.sections.reduce((sum, section) => sum + section.questions.length, 0),
  prompts: data.sections.reduce((sum, section) => sum + section.prompts.length, 0),
  theorySections: data.sections.filter((section) => (theory[section.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')] || []).length >= 3).length,
  planHash,
  routeChecks
};
console.log(JSON.stringify(checks, null, 2));
const badNav = Object.values(routeChecks).some((missing) => missing.length);
if (checks.sections !== 8 || checks.questions !== 80 || checks.prompts !== 16 || checks.theorySections !== 8 || badNav || planHash !== '2e7d2f0c74415810cbc45dabab767f01a664ed076195773e6badbb4838ef6fa1') process.exit(1);
