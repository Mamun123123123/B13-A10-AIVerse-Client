import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({ children }) {
const session = await auth.api.getSession({
headers: await headers(),
});

if (!session) {
redirect("/login");
}

const role = session.user.role;

return ( <div className="flex min-h-screen"> <aside className="w-64 bg-black text-white p-5"> <h1 className="text-xl font-bold mb-6">
AI Prompt Platform </h1>

    
    {role === "user" && (
      <ul className="space-y-3">
        <li>
          <Link href="/dashboard/user">🏠 Dashboard</Link>
        </li>

        <li>
          <Link href="/dashboard/user/add-prompt">
            ➕ Add Prompt
          </Link>
        </li>

        <li>
          <Link href="/dashboard/user/my-prompts">
            📄 My Prompts
          </Link>
        </li>

        <li>
          <Link href="/dashboard/user/saved-prompts">
            🔖 Saved Prompts
          </Link>
        </li>

        <li>
          <Link href="/dashboard/user/reviews">
            ⭐ My Reviews
          </Link>
        </li>

        <li>
          <Link href="/dashboard/user/profile">
            👤 Profile
          </Link>
        </li>
      </ul>
    )}

  
    {role === "creator" && (
      <ul className="space-y-3">
        <li>
          <Link href="/dashboard/creator">
            🏠 Dashboard
          </Link>
        </li>

        <li>
          <Link href="/dashboard/creator/add-prompt">
            ➕ Add Prompt
          </Link>
        </li>

        <li>
          <Link href="/dashboard/creator/my-prompts">
            📄 My Prompts
          </Link>
        </li>

        
      </ul>
    )}

    
    {role === "admin" && (
      <ul className="space-y-3">
        <li>
          <Link href="/dashboard/admin">
            🏠 Dashboard
          </Link>
        </li>

        <li>
          <Link href="/dashboard/admin/users">
            👥 All Users
          </Link>
        </li>

        <li>
          <Link href="/dashboard/admin/prompts">
            📄 All Prompts
          </Link>
        </li>

        <li>
          <Link href="/dashboard/admin/payments">
            💳 All Payments
          </Link>
        </li>

        <li>
          <Link href="/dashboard/admin/reports">
            🚨 Reported Prompts
          </Link>
        </li>

        <li>
          <Link href="/dashboard/admin/analytics">
            📊 Analytics
          </Link>
        </li>
      </ul>
    )}
  </aside>

  <main className="flex-1 p-6">
    {children}
  </main>
</div>

);
}
