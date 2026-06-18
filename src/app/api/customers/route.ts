import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const customer =
      await prisma.customer.create({
        data: {
          organizationId:
            "cmqj5xxdi0003v2bcsa8rzdbm",

          name: body.name,
          phone: body.phone,

          email:
            body.email || null,

          birthday: body.birthday
            ? new Date(
                body.birthday
              )
            : null,

          notes:
            body.notes || null,
        },
      });

    return Response.json(
      customer
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Failed to create customer",
      },
      {
        status: 500,
      }
    );
  }
}