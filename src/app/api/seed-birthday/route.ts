import { prisma } from "@/lib/prisma";

export async function GET() {
  const customer = await prisma.customer.update({
    where: {
      id: "cmqj859ef0001v2mgmrbqt9kn",
    },
    data: {
      birthday: new Date(),
    },
  });

  return Response.json(customer);
}