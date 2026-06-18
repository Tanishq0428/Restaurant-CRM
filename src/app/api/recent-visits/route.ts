import { prisma } from "@/lib/prisma";

export async function GET() {
  const visits = await prisma.visit.findMany({
    include: {
      customer: true,
    },
    orderBy: {
      visitDate: "desc",
    },
    take: 10,
  });

  return Response.json(visits);
}