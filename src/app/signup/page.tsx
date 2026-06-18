"use client";

import { useState } from "react";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        restaurantName: formData.get("restaurantName"),
        ownerName: formData.get("ownerName"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const data = await response.json();

    alert(JSON.stringify(data));

    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md border rounded-xl p-6 shadow">
        <h1 className="text-3xl font-bold mb-6">
          Create Restaurant Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="restaurantName"
            className="w-full border rounded p-3"
            placeholder="Restaurant Name"
          />

          <input
            name="ownerName"
            className="w-full border rounded p-3"
            placeholder="Owner Name"
          />

          <input
            name="email"
            type="email"
            className="w-full border rounded p-3"
            placeholder="Email"
          />

          <input
            name="password"
            type="password"
            className="w-full border rounded p-3"
            placeholder="Password"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded p-3"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </main>
  );
}