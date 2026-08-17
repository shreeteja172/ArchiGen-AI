import "server-only";

import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/db";
import { umlSchema, type UML } from "@/lib/ai/schema";

export type DiagramSummary = {
  id: string;
  title: string;
  idea: string;
  createdAt: Date;
  classCount: number;
  relationshipCount: number;
};

export type DiagramDetail = DiagramSummary & {
  uml: UML;
};

export async function currentUserId() {
  const { userId } = await auth();

  return userId;
}

function parseUml(value: unknown): UML | null {
  const result = umlSchema.safeParse(value);

  return result.success ? result.data : null;
}

export async function listDiagrams(): Promise<DiagramSummary[]> {
  const userId = await currentUserId();

  if (!userId) return [];

  const rows = await prisma.diagram.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      idea: true,
      uml: true,
      createdAt: true,
    },
  });

  return rows.map((row) => {
    const uml = parseUml(row.uml);

    return {
      id: row.id,
      title: row.title,
      idea: row.idea,
      createdAt: row.createdAt,
      classCount: uml?.classes.length ?? 0,
      relationshipCount: uml?.relationships.length ?? 0,
    };
  });
}

export async function getDiagram(id: string): Promise<DiagramDetail | null> {
  const userId = await currentUserId();

  if (!userId) return null;

  const row = await prisma.diagram.findFirst({
    where: { id, userId },
  });

  if (!row) return null;

  const uml = parseUml(row.uml);

  if (!uml) return null;

  return {
    id: row.id,
    title: row.title,
    idea: row.idea,
    createdAt: row.createdAt,
    classCount: uml.classes.length,
    relationshipCount: uml.relationships.length,
    uml,
  };
}

export async function countDiagrams() {
  const userId = await currentUserId();

  if (!userId) return 0;

  return prisma.diagram.count({ where: { userId } });
}
