import { prisma } from "@/lib/prisma";

export async function GET() {
  const customers = await prisma.customer.findMany({
    include: {
      visits: {
        orderBy: {
          visitDate: "desc",
        },
      },
    },
  });

  const now = new Date();

  const inactiveCustomers = customers
    .map((customer) => {
      const lastVisit =
        customer.visits.length > 0
          ? customer.visits[0].visitDate
          : null;

      let daysSinceVisit = 9999;

      if (lastVisit) {
        daysSinceVisit = Math.floor(
          (now.getTime() -
            new Date(lastVisit).getTime()) /
            (1000 * 60 * 60 * 24)
        );
      }

      return {
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        lastVisit,
        daysSinceVisit,
      };
    })
    .filter(
      (customer) => customer.daysSinceVisit >= 30
    );

  return Response.json(inactiveCustomers);
}