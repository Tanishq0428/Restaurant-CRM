import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const customer = await prisma.customer.findUnique({
    where: {
      id,
    },
    include: {
      visits: true,
    },
  });

  if (!customer) {
    return Response.json(
      { error: "Customer not found" },
      { status: 404 }
    );
  }

  const totalSpend = customer.visits.reduce(
    (sum, visit) =>
      sum + Number(visit.billAmount),
    0
  );

  const totalVisits = customer.visits.length;

  const averageSpend =
    totalVisits > 0
      ? totalSpend / totalVisits
      : 0;

  return Response.json({
    id: customer.id,
    name: customer.name,
    phone: customer.phone,
    email: customer.email,
    birthday: customer.birthday,
    notes: customer.notes,

    totalVisits,
    totalSpend,
    averageSpend,
  });
}