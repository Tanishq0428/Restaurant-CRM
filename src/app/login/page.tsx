"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  async function login() {
        if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    try {
      setLoading(true);

      const response = await fetch(
        "/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            "Login failed"
        );
        return;
      }

      localStorage.setItem(
        "crm-user",
        JSON.stringify(data)
      );

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center">
          <h1 className="text-4xl font-bold">
            Restaurant CRM
          </h1>

          <p className="mt-2 text-indigo-100">
            Customer Loyalty & Revenue Management
          </p>
        </div>

        <div className="p-8">
          <div className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Email
              </label>

              <input
                type="email"
                placeholder="owner@restaurant.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              
            </div>

            <button
              onClick={login}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
            >
              {loading
                ? "Logging In..."
                : "Login"}
            </button>

            <p className="text-center mt-6 text-slate-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-indigo-400 font-semibold hover:text-indigo-300"
              >
                Sign Up
              </Link>
            </p>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            Built with ❤️ for Restaurants
          </div>
        </div>
      </div>
    </main>
  );
}