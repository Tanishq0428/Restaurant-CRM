"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 rounded-xl bg-[#1f2a44] px-3 py-2 text-white shadow-lg lg:hidden"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-40 h-screen w-60 bg-[#1f2a44] text-white p-6
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <h2 className="mb-8 text-2xl font-bold">
          Restaurant CRM
        </h2>

        <nav className="space-y-3">
          <Link
            href="/dashboard"
            className="block rounded-xl px-4 py-3 hover:bg-white/10"
          >
            📊 Dashboard
          </Link>

          <Link
            href="/customers"
            className="block rounded-xl px-4 py-3 hover:bg-white/10"
          >
            👥 Customers
          </Link>

          <Link
            href="/birthdays"
            className="block rounded-xl px-4 py-3 hover:bg-white/10"
          >
            🎂 Birthdays
          </Link>

          <Link
            href="/followups"
            className="block rounded-xl px-4 py-3 hover:bg-white/10"
          >
            📞 Follow Ups
          </Link>

          <Link
            href="/loyalty"
            className="block rounded-xl px-4 py-3 hover:bg-white/10"
          >
            ⭐ Loyalty
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("crm-user");
              router.push("/login");
            }}
            className="w-full rounded-xl px-4 py-3 text-left hover:bg-red-500/20"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>
    </>
  );
}