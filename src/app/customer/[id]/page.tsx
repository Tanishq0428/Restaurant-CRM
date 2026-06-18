/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  useEffect,
  useState,
  useCallback,
} from "react";
import { useParams } from "next/navigation";

type Profile = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  birthday: string | null;
  notes: string | null;
  totalVisits: number;
  totalSpend: number;
  averageSpend: number;
};

type Visit = {
  id: string;
  billAmount: string;
  visitDate: string;
};

export default function CustomerPage() {
  const params = useParams();
  const customerId = params.id as string;

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [visits, setVisits] = useState<Visit[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");

  const [notes, setNotes] = useState("");

  const [billAmount, setBillAmount] =
  useState("");

const [loading, setLoading] =
  useState(true);

const [saving, setSaving] =
  useState(false);

const [points, setPoints] =
  useState(0);

  const refreshData = useCallback(
    async () => {
      if (!customerId) return;

      const [
        profileResponse,
        visitsResponse,
      ] = await Promise.all([
        fetch(
          `/api/customer/${customerId}/profile`
        ),
        fetch(
          `/api/customer/${customerId}/visits`
        ),
      ]);

      const profileData =
        await profileResponse.json();

      const visitsData =
        await visitsResponse.json();

      setProfile(profileData);

      setPoints(
        Math.floor(
          Number(profileData.totalSpend) / 100
        )
      );

      setName(profileData.name || "");
      setPhone(profileData.phone || "");

      setBirthday(
        profileData.birthday
          ? new Date(
              profileData.birthday
            )
              .toISOString()
              .split("T")[0]
          : ""
      );

      setNotes(profileData.notes || "");

      setVisits(visitsData);

      setLoading(false);
    },
    [customerId]
  );

  // eslint-disable-next-line react-hooks/set-state-in-effect
useEffect(() => {
  if (!customerId) return;

  void refreshData();
}, [customerId, refreshData]);


  async function saveProfile() {
    const response = await fetch(
      `/api/customer/${customerId}/update`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          birthday,
        }),
      }
    );

    if (!response.ok) {
      alert("Failed to update profile");
      return;
    }

    await refreshData();

    alert("Profile Updated");
  }

  async function saveNotes() {
    const response = await fetch(
      `/api/customer/${customerId}/notes`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          notes,
        }),
      }
    );

    if (!response.ok) {
      alert("Failed to save notes");
      return;
    }

    await refreshData();

    alert("Notes Saved");
  }

  async function addVisit() {
    const response = await fetch(
      "/api/visits",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          organizationId:
            "cmqj5xxdi0003v2bcsa8rzdbm",
          customerId,
          billAmount:
            Number(billAmount),
        }),
      }
    );

    if (!response.ok) {
      alert("Failed to add visit");
      return;
    }

    setBillAmount("");

    await refreshData();

    alert("Visit Added");
  }

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Customer Profile
      </h1>

      {profile && (
        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-3xl font-bold">
            {profile.name}
          </h2>

          <p className="mt-2">
            📞 {profile.phone}
          </p>

          <p>
            🎂{" "}
            {profile.birthday
              ? new Date(
                  profile.birthday
                ).toLocaleDateString()
              : "Not Set"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="border rounded p-4">
              <p className="text-gray-500">
                Total Visits
              </p>
              <h3 className="text-3xl font-bold">
                {profile.totalVisits}
              </h3>
            </div>

            <div className="border rounded p-4">
              <p className="text-gray-500">
                Total Spend
              </p>
              <h3 className="text-3xl font-bold">
                ₹{profile.totalSpend}
              </h3>
            </div>

            <div className="border rounded p-4">
              <p className="text-gray-500">
                Average Spend
              </p>
              <h3 className="text-3xl font-bold">
                ₹
                {profile.averageSpend.toFixed(
                  0
                )}
              </h3>
            </div>
          </div>
        </div>
      )}

      <div className="border rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Edit Customer
        </h2>

        <div className="space-y-3 max-w-md">
          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Name"
            className="w-full border p-3 rounded"
          />

          <input
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="Phone"
            className="w-full border p-3 rounded"
          />

          <input
            type="date"
            value={birthday}
            onChange={(e) =>
              setBirthday(
                e.target.value
              )
            }
            className="w-full border p-3 rounded"
          />

          <button
            onClick={saveProfile}
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Save Profile
          </button>
        </div>
      </div>

      <div className="border rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Customer Notes
        </h2>

        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          className="w-full border rounded p-3 h-32"
          placeholder="Add customer notes..."
        />

        <button
          onClick={saveNotes}
          className="mt-4 bg-black text-white px-6 py-3 rounded"
        >
          Save Notes
        </button>
      </div>

      <div className="border rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Add Visit
        </h2>

        <input
          type="number"
          value={billAmount}
          onChange={(e) =>
            setBillAmount(e.target.value)
          }
          placeholder="Bill Amount"
          className="w-full max-w-sm border p-3 rounded"
        />

        <button
          onClick={addVisit}
          className="mt-4 bg-green-600 text-white px-6 py-3 rounded"
        >
          Add Visit
        </button>
      </div>

      <div className="border rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Visit History
        </h2>

        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">
                Bill Amount
              </th>
              <th className="text-left p-2">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {visits.map((visit) => (
              <tr
                key={visit.id}
                className="border-t"
              >
                <td className="p-2">
                  ₹{visit.billAmount}
                </td>
                <td className="p-2">
                  {new Date(
                    visit.visitDate
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}