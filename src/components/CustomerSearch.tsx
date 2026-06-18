"use client";

import { useState } from "react";
import Link from "next/link";

type Customer = {
  id: string;
  name: string;
  phone: string;
};

type Props = {
  customers: Customer[];
};

export default function CustomerSearch({
  customers,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.phone.includes(search)
  );

  return (
    <div>
      <div className="mb-6">
        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search customer..."
          className="w-full max-w-md border p-3 rounded"
        />
      </div>

      <div className="space-y-4">
        {filteredCustomers.length === 0 ? (
          <div className="border rounded p-4">
            No customers found
          </div>
        ) : (
          filteredCustomers.map((customer) => (
            <Link
              key={customer.id}
              href={`/customer/${customer.id}`}
              className="block border rounded-xl p-4 hover:bg-gray-50"
            >
              <h2 className="text-xl font-semibold">
                {customer.name}
              </h2>

              <p className="text-gray-600">
                {customer.phone}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}