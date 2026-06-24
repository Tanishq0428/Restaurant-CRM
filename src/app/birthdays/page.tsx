"use client";

import { useEffect, useState } from "react";

type Customer = {
  id: string;
  name: string;
  phone: string;
  birthday: string;
};

export default function BirthdaysPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(
          "/api/birthday-customers"
        );

        const data = await response.json();

        setCustomers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold">
          Birthday Customers
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">
          🎂 Birthday Customers
        </h1>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          {customers.length === 0 ? (
            <p>No birthdays found.</p>
          ) : (
            <div className="space-y-4">
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center justify-between rounded-xl border p-4"
                >
                  <div>
                    <h2 className="font-semibold">
                      {customer.name}
                    </h2>

                    <p className="text-sm text-slate-500">
                      {customer.phone}
                    </p>
                  </div>

                  <div className="text-sm text-slate-600">
                    🎂{" "}
                    {new Date(
                      customer.birthday
                    ).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}