import type { CoreMessage } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

const anthropic = createAnthropic();

export function streamConversation(messages: CoreMessage[]) {
  const result = streamText({
    model: anthropic("claude-3-5-haiku-latest"),
    messages,
  });

  return result.toDataStreamResponse();
}

export function streamConversationWithContext(
  messages: CoreMessage[],
  context: string,
) {
  const result = streamText({
    model: anthropic("claude-3-5-haiku-latest"),
    messages,
    system: `You are a AI chat bot helper for a project documentation website - you have access to this information ${context}`,
  });

  return result.toDataStreamResponse();
}

export { type CoreMessage, streamText } from "ai";
