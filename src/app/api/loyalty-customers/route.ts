import { prisma } from "@/lib/prisma";

export async function GET() {
  const customers = await prisma.customer.findMany({
    include: {
      visits: true,
    },
  });

  const loyaltyCustomers = customers.map(
    (customer) => {
      const totalSpend = customer.visits.reduce(
        (sum, visit) =>
          sum + Number(visit.billAmount),
        0
      );

      const points = Math.floor(
        totalSpend / 100
      );

      return {
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        totalSpend,
        points,
      };
    }
  );

  return Response.json(loyaltyCustomers);
}