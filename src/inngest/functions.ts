// src/inngest/functions.ts
import { generateText } from "ai";
import { inngest } from "./client";
import { anthropic } from "@ai-sdk/anthropic";

export const processTask = inngest.createFunction(
  { id: "process-task", triggers: { event: "app/task.created" } },
  async ({ event, step }) => {
    const result = await step.run("handle-task", async () => {
      return await generateText({
        model: anthropic('claude-3-haiku-20240307'),
        prompt: 'Write a vegetarian lasagna recipe for 4 people.',
    });
    });

    await step.sleep("pause", "1s");

    return { message: `Task ${event.data.id} complete`, result };
  }
);