import { generateObject } from "ai";
import { auth } from "@clerk/nextjs/server";

import { model } from "@/lib/ai/models";
import { umlSchema } from "@/lib/ai/schema";
import { SYSTEM_PROMPT } from "@/lib/ai/prompt";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

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
