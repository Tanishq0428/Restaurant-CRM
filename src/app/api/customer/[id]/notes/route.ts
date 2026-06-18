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
    select: {
      notes: true,
    },
  });

  return Response.json(customer);
}

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
      notes: body.notes,
    },
  });

  return Response.json(customer);
}