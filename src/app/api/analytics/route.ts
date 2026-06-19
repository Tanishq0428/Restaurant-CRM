export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const visits = await prisma.visit.findMany({
      orderBy: {
        visitDate: "asc",
      },
    });

    return Response.json(
      visits.map((visit) => ({
        date: visit.visitDate
          .toISOString()
          .split("T")[0],
        revenue: Number(
          visit.billAmount
        ),
      }))
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      [],
      {
        status: 200,
      }
    );
  }
}