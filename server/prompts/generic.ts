import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export function genericPrompt(
  intention: string,
): Array<ChatCompletionMessageParam> {
  return [
    {
      role: "system",
      content:
        "Suggest sub-tasks for the user's intention. Use markdown. Just respond with a flat list, nothing before or after",
    },
    {
      role: "user",
      content: `Intention: ${intention}`,
    },
  ];
}
