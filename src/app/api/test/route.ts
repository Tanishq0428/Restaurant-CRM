import { prisma } from "@/lib/prisma";

export async function GET() {
  const organizations = await prisma.organization.count();

  return Response.json({
    success: true,
    organizations,
  });
}