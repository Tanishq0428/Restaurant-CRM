
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type DashboardData = {
  totalCustomers: number;
  totalVisits: number;
  totalRevenue: number;
  averageBill: number;
};

type Visit = {
  id: string;
  billAmount: string;
  visitDate: string;
  customer: {
    id: string;
    name: string;
  };
};

type TopCustomer = {
  id: string;
  name: string;
  phone: string;
  totalSpend: number;
  visitCount: number;
};

type VipCustomer = {
  id: string;
  name: string;
  phone: string;
  totalSpend: number;
  visitCount: number;
};

type InactiveCustomer = {
  id: string;
  name: string;
  phone: string;
  lastVisit: string | null;
  daysSinceVisit: number;
};

type LoyaltyCustomer = {
  id: string;
  name: string;
  phone: string;
  totalSpend: number;
  points: number;
};

type Analytics = {
  date: string;
  revenue: number;
};

type BirthdayCustomer = {
  id: string;
  name: string;
  phone: string;
};

type FollowupCustomer = {
  id: string;
  name: string;
  phone: string;
  daysSinceVisit: number;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData>({
    totalCustomers: 0,
    totalVisits: 0,
    totalRevenue: 0,
    averageBill: 0,
  });
  const [visits, setVisits] = useState<Visit[]>([]);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
  const [vipCustomers, setVipCustomers] = useState<VipCustomer[]>([]);
  const [inactiveCustomers, setInactiveCustomers] = useState<InactiveCustomer[]>([]);
  const [loyaltyCustomers, setLoyaltyCustomers] = useState<LoyaltyCustomer[]>([]);
  const [analytics, setAnalytics] = useState<Analytics[]>([]);
  const [birthdayCustomers, setBirthdayCustomers] = useState<BirthdayCustomer[]>([]);
  const [followupCustomers, setFollowupCustomers] = useState<FollowupCustomer[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [
          dashboardRes,
          visitsRes,
          topRes,
          vipRes,
          inactiveRes,
          loyaltyRes,
          analyticsRes,
          birthdayRes,
          followupRes,
        ] = await Promise.all([
          fetch("/api/dashboard"),
          fetch("/api/recent-visits"),
          fetch("/api/top-customers"),
          fetch("/api/vip-customers"),
          fetch("/api/inactive-customers"),
          fetch("/api/loyalty-customers"),
          fetch("/api/analytics"),
          fetch("/api/birthday-customers"),
          fetch("/api/followup-customers"),
        ]);

        setData(await dashboardRes.json());
        setVisits(await visitsRes.json());
        setTopCustomers(await topRes.json());
        setVipCustomers(await vipRes.json());
        setInactiveCustomers(await inactiveRes.json());
        setLoyaltyCustomers(await loyaltyRes.json());
        setAnalytics(await analyticsRes.json());
        setBirthdayCustomers(await birthdayRes.json());
        setFollowupCustomers(await followupRes.json());
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
      <main className="min-h-screen bg-[#f6f7fb] p-8">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="mb-8 h-10 w-72 rounded-xl bg-slate-200" />
          <div className="grid gap-6 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 rounded-2xl bg-slate-200" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-3xl bg-gradient-to-r from-[#1f2a44] via-[#2c3e73] to-[#5b5fdd] p-6 text-white shadow-xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-100">
                Restaurant Overview
              </p>
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                Restaurant CRM
              </h1>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-2 text-sm text-indigo-50">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Link href="/customers">
            <div className="cursor-pointer rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-indigo-300">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-indigo-600">
                  Customers
                </p>

                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs text-indigo-700">
                  ↑ 12%
                </span>
              </div>

              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                {data.totalCustomers}
              </h2>
            </div>
          </Link>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-amber-600">Visits</p>
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs text-amber-700">+8.4%</span>
            </div>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">{data.totalVisits}</h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-emerald-600">Revenue</p>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-emerald-700">This month</span>
            </div>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">{formatCurrency(data.totalRevenue)}</h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">Average Bill</p>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">Avg.</span>
            </div>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">{formatCurrency(data.averageBill)}</h2>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Recent Visits</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">Today</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Customer</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Bill</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {visits.map((visit) => (
                    <tr key={visit.id} className="border-t border-slate-200 hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <Link
                          href={`/customer/${visit.customer.id}`}
                          className="font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          {visit.customer.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{formatCurrency(Number(visit.billAmount))}</td>
                      <td className="px-4 py-3 text-slate-700">{formatDate(visit.visitDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#fef3c7] to-[#fff7ed] p-6 shadow-sm ring-1 ring-amber-200">
            <h2 className="text-xl font-semibold text-slate-900">🎂 Birthdays</h2>
            {birthdayCustomers.length === 0 ? (
              <p className="mt-3 text-sm text-slate-600">No birthdays today</p>
            ) : (
              <div className="mt-4 space-y-3">
                {birthdayCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="rounded-xl bg-white/80 p-3 shadow-sm"
                >
                  <Link
                    href={`/customer/${customer.id}`}
                    className="font-semibold text-indigo-700 hover:text-indigo-900"
                  >
                    {customer.name}
                  </Link>

                  <p className="text-sm text-slate-500">
                    {customer.phone}
                  </p>
                </div>
              ))}
              </div>
            )}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">Top Customers</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Customer</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Visits</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Spend</th>
                  </tr>
                </thead>
                <tbody>
                  {topCustomers.map((customer) => (
                    <tr key={customer.id} className="border-t border-slate-200">
                      <td className="px-4 py-3">
                        <Link
                          href={`/customer/${customer.id}`}
                          className="font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          {customer.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{customer.visitCount}</td>
                      <td className="px-4 py-3 text-slate-700">{formatCurrency(customer.totalSpend)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">VIP Customers</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Customer</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Visits</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Spend</th>
                  </tr>
                </thead>
                <tbody>
                  {vipCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-t border-slate-200"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/customer/${customer.id}`}
                          className="font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          {customer.name}
                        </Link>
                      </td>

                      <td className="px-4 py-3 text-slate-700">
                        {customer.visitCount}
                      </td>

                      <td className="px-4 py-3 text-slate-700">
                        {formatCurrency(
                          customer.totalSpend
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">Inactive Customers</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Customer</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Phone</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inactiveCustomers.map((customer) => (
                    <tr key={customer.id} className="border-t border-slate-200">
                      <td className="px-4 py-3">
                        <Link
                          href={`/customer/${customer.id}`}
                          className="font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          {customer.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{customer.phone}</td>
                      <td className="px-4 py-3 text-slate-700">{customer.lastVisit ? `${customer.daysSinceVisit} days` : "Never visited"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">📞 Follow Up Customers</h2>
            {followupCustomers.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">No follow-up customers right now</p>
            ) : (
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-600">Customer</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-600">Phone</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-600">Days Away</th>
                    </tr>
                  </thead>
                  <tbody>
                    {followupCustomers.map((customer) => (
                      <tr key={customer.id} className="border-t border-slate-200">
                        <td className="px-4 py-3">
                        <Link
                          href={`/customer/${customer.id}`}
                          className="font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          {customer.name}
                        </Link>
                      </td>
                        <td className="px-4 py-3 text-slate-700">{customer.phone}</td>
                        <td className="px-4 py-3 text-slate-700">{customer.daysSinceVisit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">Loyalty Points</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Customer</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Spend</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {loyaltyCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-t border-slate-200"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/customer/${customer.id}`}
                          className="font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          {customer.name}
                        </Link>
                      </td>

                      <td className="px-4 py-3 text-slate-700">
                        {formatCurrency(
                          customer.totalSpend
                        )}
                      </td>

                      <td className="px-4 py-3 font-semibold text-emerald-600">
                        {customer.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">Revenue Trend</h2>
            {analytics.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">No revenue data yet</p>
            ) : (
              <div className="mt-4 space-y-3">
                {analytics.map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span className="text-sm text-slate-600">{item.date}</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(item.revenue)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

