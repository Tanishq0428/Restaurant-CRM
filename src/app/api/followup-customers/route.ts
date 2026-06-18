import { prisma } from "@/lib/prisma";

export async function GET() {
  const customers =
    await prisma.customer.findMany({
      include: {
        visits: true,
      },
    });

  const today = new Date();

  const result = customers
    .map((customer) => {
      const lastVisit =
        customer.visits.sort(
          (a, b) =>
            new Date(b.visitDate).getTime() -
            new Date(a.visitDate).getTime()
        )[0];

      if (!lastVisit) {
        return null;
      }

      const daysSinceVisit = Math.floor(
        (today.getTime() -
          new Date(
            lastVisit.visitDate
          ).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      return {
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        daysSinceVisit,
      };
    })
    .filter(Boolean)
    .filter(
      (customer) =>
        customer!.daysSinceVisit >= 30
    );

  return Response.json(result);
}