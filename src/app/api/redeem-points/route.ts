import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {
  const body = await request.json();

  const visits = await prisma.visit.findMany({
    where: {
      customerId: body.customerId,
    },
  });

  const totalSpend = visits.reduce(
    (sum, visit) =>
      sum + Number(visit.billAmount),
    0
  );

  const points = Math.floor(
    totalSpend / 100
  );

  if (points < body.pointsNeeded) {
    return Response.json(
      {
        error: "Not enough points",
      },
      { status: 400 }
    );
  }

  return Response.json({
    success: true,
    reward: body.reward,
  });
}