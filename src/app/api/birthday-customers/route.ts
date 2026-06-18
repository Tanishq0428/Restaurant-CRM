import { prisma } from "@/lib/prisma";

export async function GET() {
  const customers =
    await prisma.customer.findMany({
      where: {
        birthday: {
          not: null,
        },
      },
    });

  const today = new Date();

  const birthdayCustomers =
    customers.filter((customer) => {
      if (!customer.birthday) return false;

      const birthday =
        new Date(customer.birthday);

      return (
        birthday.getDate() ===
          today.getDate() &&
        birthday.getMonth() ===
          today.getMonth()
      );
    });

  return Response.json(
    birthdayCustomers
  );
}