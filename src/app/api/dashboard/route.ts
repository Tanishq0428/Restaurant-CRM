import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalCustomers =
      await prisma.customer.count();

    const visits =
      await prisma.visit.findMany();

    const totalVisits = visits.length;

    let totalRevenue = 0;

    for (const visit of visits) {
      totalRevenue += Number(
        visit.billAmount
      );
    }

    const averageBill =
      totalVisits > 0
        ? totalRevenue / totalVisits
        : 0;

    return Response.json({
      totalCustomers,
      totalVisits,
      totalRevenue,
      averageBill,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Dashboard failed" },
      { status: 500 }
    );
  }
}