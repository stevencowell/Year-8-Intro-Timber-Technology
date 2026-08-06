import { readFile, writeFile } from 'node:fs/promises';

const markdown = await readFile('assets/student-learning.md', 'utf8');
const sectionPattern = /## Section (\d+) - ([^\n]+)([\s\S]*?)(?=\n---\n\n## Section|\n---\n\n## Student evidence|$)/g;
const sections = [...markdown.matchAll(sectionPattern)].map((match) => {
  const [, number, title, block] = match;
  const questions = block.split('\n').filter((line) => /^\| [A-Z]{2,4}-\d{2} \|/.test(line)).map((line) => {
    const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
    return { id: cells[0], question: cells[1], choices: cells.slice(2, 6), answer: cells[6], feedback: cells[7] };
  });
  const prompts = [...block.matchAll(/\*\*Prompt:\*\*\s*([^\n]+)\n\s*- \*\*Appropriate response example:\*\*\s*([^\n]+)/g)]
    .map((prompt) => ({ prompt: prompt[1], example: prompt[2] }));
  return { number: Number(number), title, questions, prompts };
});
if (sections.length !== 8 || sections.some((section) => section.questions.length !== 10 || section.prompts.length !== 2)) {
  throw new Error('Student learning map does not meet the 8 x 10 + 2 evidence contract.');
}
await writeFile('assets/course-data.json', JSON.stringify({ sections }, null, 2));
console.log(`Created student-safe course data for ${sections.length} sections.`);
