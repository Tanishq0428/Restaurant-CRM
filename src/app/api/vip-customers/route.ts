import { prisma } from "@/lib/prisma";

export async function GET() {
  const customers = await prisma.customer.findMany({
    include: {
      visits: true,
    },
  });

  const vipCustomers = customers
    .map((customer) => {
      const totalSpend = customer.visits.reduce(
        (sum, visit) =>
          sum + Number(visit.billAmount),
        0
      );

      return {
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        totalSpend,
        visitCount: customer.visits.length,
      };
    })
    .filter(
      (customer) =>
        customer.totalSpend >= 1000 ||
        customer.visitCount >= 3
    )
    .sort((a, b) => b.totalSpend - a.totalSpend);

  return Response.json(vipCustomers);
}