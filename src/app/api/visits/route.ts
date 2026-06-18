import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const visit = await prisma.visit.create({
      data: {
        organizationId: body.organizationId,
        customerId: body.customerId,
        visitDate: new Date(),
        billAmount: body.billAmount,
      },
    });

    return Response.json(visit);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to create visit" },
      { status: 500 }
    );
  }
}