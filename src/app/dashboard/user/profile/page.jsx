"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session } = useSession();

  const subscription = "Free";
  const totalPrompts = 3;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">
        Profile
      </h1>

      <div className="card bg-base-100 shadow">
        <div className="card-body">

          <img
            src={session?.user?.image}
            alt=""
            className="w-24 h-24 rounded-full"
          />

          <h2 className="text-xl font-bold">
            {session?.user?.name}
          </h2>

          <p>
            Email:
            {session?.user?.email}
          </p>

          <p>
            Role:
            {session?.user?.role}
          </p>

          <p>
            Total Prompts:
            {totalPrompts}
          </p>

          <p>
            Subscription:
            {subscription}
          </p>

          {subscription === "Free" && (
            <Link href="/payment">
              <button className="btn btn-primary mt-4">
                Upgrade To Premium
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}