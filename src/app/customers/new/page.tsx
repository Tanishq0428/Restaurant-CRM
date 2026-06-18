"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCustomerPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] =
    useState("");
  const [notes, setNotes] =
    useState("");

  async function createCustomer() {
    const response = await fetch(
      "/api/customers",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          birthday,
          notes,
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      alert(
        data.error ||
          "Failed to create customer"
      );
      return;
    }

    router.push(
      `/customer/${data.id}`
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] p-8">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">

        <h1 className="mb-6 text-3xl font-bold">
          Add Customer
        </h1>

        <div className="space-y-4">

          <input
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />

          <input
            type="date"
            value={birthday}
            onChange={(e) =>
              setBirthday(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3"
          />

          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            className="h-32 w-full rounded-xl border p-3"
          />

          <button
            onClick={createCustomer}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
          >
            Create Customer
          </button>

        </div>
      </div>
    </main>
  );
}