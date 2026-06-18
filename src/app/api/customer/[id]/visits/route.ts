import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const visits = await prisma.visit.findMany({
    where: {
      customerId: id,
    },
    orderBy: {
      visitDate: "desc",
    },
  });

  return Response.json(visits);
}