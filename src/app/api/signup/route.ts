import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      restaurantName,
      ownerName,
      email,
      password,
    } = body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return Response.json(
        {
          error: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const passwordHash = await bcrypt.hash(
      password,
      10
    );

    const organization =
      await prisma.organization.create({
        data: {
          name: restaurantName,
          slug: restaurantName
            .toLowerCase()
            .replaceAll(" ", "-"),
        },
      });

    const user = await prisma.user.create({
      data: {
        organizationId: organization.id,
        name: ownerName,
        email,
        passwordHash,
        role: "OWNER",
      },
    });

    return Response.json({
      success: true,
      userId: user.id,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}