import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return Response.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const validPassword = await bcrypt.compare(
      body.password,
      user.passwordHash
    );

    if (!validPassword) {
      return Response.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    return Response.json({
      success: true,
      userId: user.id,
      name: user.name,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}