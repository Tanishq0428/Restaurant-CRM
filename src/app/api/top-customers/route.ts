import { prisma } from "@/lib/prisma";

export async function GET() {
  const customers = await prisma.customer.findMany({
    include: {
      visits: true,
    },
  });

  const topCustomers = customers
    .map((customer) => {
      let totalSpend = 0;

      for (const visit of customer.visits) {
        totalSpend += Number(visit.billAmount);
      }

      return {
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        totalSpend,
        visitCount: customer.visits.length,
      };
    })
    .sort((a, b) => b.totalSpend - a.totalSpend)
    .slice(0, 10);

  return Response.json(topCustomers);
}