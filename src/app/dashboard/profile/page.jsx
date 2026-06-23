"use client";

import { useSession } from "@/lib/auth-client";
import { User, Mail, BadgeCheck } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  // Loading state
  if (status === "loading") {
    return (
      <div className="p-6 text-gray-400">
        Loading profile...
      </div>
    );
  }

  // Not logged in
  if (!session?.user) {
    return (
      <div className="p-6 text-red-400">
        You are not logged in.
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="max-w-2xl mx-auto text-white">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold">
            {user.name?.charAt(0) || "U"}
          </div>

          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {user.name || "Unknown User"}
              <BadgeCheck size={18} className="text-green-400" />
            </h1>
            <p className="text-gray-400 text-sm">
              Your personal profile
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">

          {/* Name */}
          <div className="flex items-center gap-3 p-3 bg-black/30 rounded-xl border border-white/10">
            <User size={18} className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-400">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 p-3 bg-black/30 rounded-xl border border-white/10">
            <Mail size={18} className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          {/* User ID */}
          <div className="p-3 bg-black/30 rounded-xl border border-white/10">
            <p className="text-sm text-gray-400">User ID</p>
            <p className="text-xs break-all text-gray-300">
              {user.id}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}