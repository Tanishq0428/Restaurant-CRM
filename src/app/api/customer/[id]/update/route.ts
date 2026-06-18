import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();

  const customer = await prisma.customer.update({
    where: {
      id,
    },
    data: {
      name: body.name,
      phone: body.phone,
      birthday: body.birthday
        ? new Date(body.birthday)
        : null,
    },
  });

  return Response.json(customer);
}