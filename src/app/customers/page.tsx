import { prisma } from "@/lib/prisma";
import CustomerSearch from "@/components/CustomerSearch";
import Link from "next/link";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[#f6f7fb] p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Customers
            </h1>

            <p className="mt-1 text-slate-500">
              Manage customer profiles and relationships
            </p>
          </div>

          <Link
            href="/customers/new"
            className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white shadow hover:bg-indigo-700"
          >
            + Add Customer
          </Link>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <CustomerSearch customers={customers} />
        </div>

      </div>
    </main>
  );
}