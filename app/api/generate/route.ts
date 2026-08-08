import { generateObject } from "ai";
import { model } from "@/lib/ai/models";
import { umlSchema } from "@/lib/ai/schema";
import { SYSTEM_PROMPT } from "@/lib/ai/prompt";

export async function POST(req: Request) {
  try {
    const { idea } = await req.json();

    if (!idea) {
      return Response.json(
        { error: "Project idea is required." },
        { status: 400 },
      );
    }

    const { object } = await generateObject({
      model,
      schema: umlSchema,
      system: SYSTEM_PROMPT,
      prompt: idea,
    });

    return Response.json(object);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to generate UML diagram.",
      },
      {
        status: 500,
      },
    );
  }
}
