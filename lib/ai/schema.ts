import { z } from "zod";

export const umlSchema = z.object({
  title: z.string(),

  classes: z.array(
    z.object({
      name: z.string(),
      attributes: z.array(z.string()),
      methods: z.array(z.string()),
    })
  ),

  relationships: z.array(
    z.object({
      from: z.string(),
      to: z.string(),
      type: z.enum([
        "association",
        "inheritance",
        "aggregation",
        "composition",
      ]),
    })
  ),
});

export type UML = z.infer<typeof umlSchema>;