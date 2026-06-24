"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [restaurantName, setRestaurantName] =
    useState("");

  const [ownerName, setOwnerName] =
    useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSignup() {
  if (
    !restaurantName.trim() ||
    !ownerName.trim() ||
    !email.trim() ||
    !password.trim()
  ) {
    alert("Please fill all fields");
    return;
  }

  setLoading(true);

    const response = await fetch(
      "/api/signup",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          restaurantName,
          ownerName,
          email,
          password,
        }),
      }
    );

    const data =
      await response.json();

    setLoading(false);

    if (!response.ok) {
      alert(
        data.error ||
          "Signup failed"
      );
      return;
    }

    alert(
      "Account created successfully!"
    );

    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Restaurant CRM
          </h1>

          <p className="text-slate-500 mt-2">
            Create your restaurant account
          </p>
        </div>

        <div className="space-y-4">
          <input
            value={restaurantName}
            onChange={(e) =>
              setRestaurantName(
                e.target.value
              )
            }
            placeholder="Restaurant Name"
            className="w-full border border-slate-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            value={ownerName}
            onChange={(e) =>
              setOwnerName(
                e.target.value
              )
            }
            placeholder="Owner Name"
            className="w-full border border-slate-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder="Email Address"
            className="w-full border border-slate-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="Password"
            className="w-full border border-slate-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl py-4 transition"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

          <p className="text-center mt-4 text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-600 font-semibold hover:text-indigo-800"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
