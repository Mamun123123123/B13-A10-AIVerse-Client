"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Users,
  Trash2,
  CalendarDays,
  Search,
  Shield,
  Crown,
  User,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/users`);
        const data = await res.json();
        setUsers(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        user?.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const updateRole = async (id, role) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (!res.ok) throw new Error("Failed");

      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role } : u))
      );
    } catch (error) {
      console.error(error);
      alert("Role update failed");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const roleBadge = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-500/15 text-red-400 border-red-500/30";
      case "creator":
        return "bg-violet-500/15 text-violet-400 border-violet-500/30";
      default:
        return "bg-cyan-500/15 text-cyan-400 border-cyan-500/30";
    }
  };

  const roleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Shield size={14} />;
      case "creator":
        return <Crown size={14} />;
      default:
        return <User size={14} />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl p-8 bg-violet-950 border border-white/10 backdrop-blur-xl">
        <h1 className="text-4xl font-bold text-white">User Management</h1>
        <p className="text-zinc-400 mt-2">
          Manage platform users, permissions and roles.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-3xl p-6 bg-[#0B1120] border border-white/10">
          <p className="text-zinc-400">Total Users</p>
          <h2 className="text-4xl font-bold text-white mt-2">
            {users.length}
          </h2>
        </div>

        <div className="rounded-3xl p-6 bg-[#0B1120] border border-white/10">
          <p className="text-zinc-400">Admins</p>
          <h2 className="text-4xl font-bold text-white mt-2">
            {users.filter((u) => u.role === "admin").length}
          </h2>
        </div>

        <div className="rounded-3xl p-6 bg-[#0B1120] border border-white/10">
          <p className="text-zinc-400">Creators</p>
          <h2 className="text-4xl font-bold text-white mt-2">
            {users.filter((u) => u.role === "creator").length}
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-4 text-zinc-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#0B1120] border border-white/10 text-white outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0B1120] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="table table-fixed w-full">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400">
                <th className="px-6 py-4 text-left w-[30%]">User</th>
                <th className="px-6 py-4 text-left w-[25%]">Email</th>
                <th className="px-6 py-4 text-left w-[20%]">Role</th>
                <th className="px-6 py-4 text-left w-[15%]">Joined</th>
                <th className="px-6 py-4 text-center w-[10%]">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={
                          user.image ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.name || "User"
                          )}`
                        }
                        alt={user.name || "user"}
                        width={50}
                        height={50}
                        className="rounded-full border border-white/10"
                      />
                      <div>
                        <h3 className="font-semibold text-white">
                          {user.name || "Unknown User"}
                        </h3>
                        <p className="text-xs text-zinc-500">
                          Platform Member
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-zinc-300">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${roleBadge(
                          user.role
                        )}`}
                      >
                        {roleIcon(user.role)} {user.role}
                      </span>

                      <select
                        value={user.role}
                        onChange={(e) =>
                          updateRole(user._id, e.target.value)
                        }
                        className="select select-sm bg-[#111827] border-zinc-700 text-white"
                      >
                        <option value="user">User</option>
                        <option value="creator">Creator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-zinc-400">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="btn btn-sm btn-error"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}