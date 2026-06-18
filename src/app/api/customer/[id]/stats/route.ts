import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const visits = await prisma.visit.findMany({
      where: {
        customerId: id,
      },
      orderBy: {
        visitDate: "desc",
      },
    });

    const visitCount = visits.length;

    let totalSpend = 0;

    for (const visit of visits) {
      totalSpend += Number(visit.billAmount);
    }

    const averageSpend =
      visitCount > 0
        ? totalSpend / visitCount
        : 0;

    const lastVisit =
      visits.length > 0
        ? visits[0].visitDate
        : null;

    return Response.json({
      visitCount,
      totalSpend,
      averageSpend,
      lastVisit,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to load stats",
      },
      {
        status: 500,
      }
    );
  }
}