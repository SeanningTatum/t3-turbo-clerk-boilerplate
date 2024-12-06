import type { CoreMessage } from "@acme/ai-chat";
import { streamConversation } from "@acme/ai-chat";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = (await req.json()) as { messages: CoreMessage[] };

  // const filePath = path.join(
  //   process.cwd(),
  //   "/app/api/chat/combined_content_ts.txt",
  // );
  // const fileContent = fs.readFileSync(filePath, "utf8");

  return streamConversation(messages);
}
