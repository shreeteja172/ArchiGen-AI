import { z } from "zod";

export const umlSchema = z.object({
  classes: z.array(
    z.object({
      name: z.string(),
      fields: z.array(z.string()),
      methods: z.array(z.string()),
    })
  ),

  relationships: z.array(
    z.object({
      from: z.string(),
      to: z.string(),
      type: z.enum(["inheritance", "association"]),
    })
  ),
});

export type UML = z.infer<typeof umlSchema>;