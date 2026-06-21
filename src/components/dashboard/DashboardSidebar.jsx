"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/auth-client";

import {
  House,
  Person,
  CirclePlus,
  File,
  Bars,
} from "@gravity-ui/icons";

import { Drawer, Button } from "@heroui/react";
import { LayoutDashboard, LogOut } from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const menus = [
    {
      title: "Creator Home",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Profile",
      href: "/dashboard/profile",
      icon: Person,
    },
    {
      title: "Add Prompt",
      href: "/dashboard/add-prompt",
      icon: CirclePlus,
    },
    {
      title: "My Prompts",
      href: "/dashboard/my-prompts",
      icon: File,
    },
  ];

  const navContent = (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="mb-6 border-b border-default pb-5">
        <h2 className="text-xl font-bold">Creator Hub</h2>
        <p className="text-sm text-default-500">
          AI Prompt Dashboard
        </p>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {menus.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                active
                  ? "bg-primary text-white"
                  : "hover:bg-default text-foreground"
              }`}
            >
              <Icon className="size-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-6">
        <Button
          color="danger"
          variant="flat"
          className="w-full"
          startContent={<LogOut size={18} />}
          onPress={() => signOut()}
        >
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Button */}
      <div className="lg:hidden p-4 border-b">
        <Drawer>
          <Button variant="flat">
            <Bars />
            Menu
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content placement="left" className="max-w-[280px]">
              <Drawer.Dialog>
                <Drawer.CloseTrigger />

                <Drawer.Header>
                  <Drawer.Heading>
                    Creator Dashboard
                  </Drawer.Heading>
                </Drawer.Header>

                <Drawer.Body>{navContent}</Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 shrink-0 border-r p-5 min-h-screen">
        {navContent}
      </aside>
    </>
  );
}