import { once } from "lodash-es";
import { readFile } from "node:fs/promises";

const readPrompt = once(async () => {
  return readFile("./server/prompts/component_gen.sys.prompt.txt", "utf-8");
});

import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function generateComponent(
  intention: string,
  prompt: string,
): Promise<Array<ChatCompletionMessageParam>> {
  const rawPrompt = await readPrompt();
  const systemPrompt = rawPrompt.replace("$INTENTION", intention);

  console.log("SYSTEM", systemPrompt);
  return [
    { role: "system", content: systemPrompt },
    { role: "user", content: "Display a list with 3 bullet points" },
    {
      role: "assistant",
      content: `import "tailwindcss-cdn";

export default function App(): JSX.Element {

  return (
    <div className="p-4">
      <ul>
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
      </ul>
    </div>
  );
}`,
    },
    { role: "user", content: prompt },
  ];
}
