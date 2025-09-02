"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  Calendar,
  Newspaper,
  ChevronDown,
  ChevronUp,
  Package,
  LogOut,
  Flag,
  DoorOpen,
  MessageCircle,
} from "lucide-react";

import Image from "next/image";

const sidebarLinks = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Services",
    icon: Mail,
    subItems: [
      {
        label: "Webinar Services",
        icon: Calendar,
        href: "/webinar",
      },
      {
        label: "Registration Services",
        icon: Mail,
        href: "/registration",
      },
      {
        label: "Newsletter Services",
        icon: Newspaper,
        href: "/newsletter",
      },
    ],
  },
  {
    label: "Subscription",
    icon: Mail,
    subItems: [
      {
        label: "Webinar",
        icon: Calendar,
        href: "/webinar-subscription",
      },
      {
        label: "Registration",
        icon: Mail,
        href: "/registration-subscription",
      },
      {
        label: "Newsletter",
        icon: Newspaper,
        href: "/newsletter-subscription",
      },
      {
        label: "general",
        icon: DoorOpen,
        href: "/general-subscription",
      },
    ],
  },
  {
    label: "Country",
    icon: Flag,
    href: "/Country",
  },
  {
    label: "Consultation Settings",
    icon: Package,
    href: "/consultation",
  },
  {
    label: "Contact Us",
    icon: MessageCircle,
    href: "/contact-us",
  },
];

function SidBar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

async function deleteToken() {
  try {
    // لو عندك API لتسجيل الخروج
    const res = await fetch("/api/logout", {
      method: "POST",
    });

    // بعد مسح التوكن أو تسجيل الخروج، ارجع للهوم
    window.location.href = "/home";
  } catch (error) {
    console.error("Failed to logout", error);
    // حتى لو فشل، ممكن ترجّع المستخدم للهوم
    window.location.href = "/home";
  }
}


  return (
    <div className="w-64 min-h-screen h-full bg-gray-100 p-6 shadow-md">
      <div className="relative w-[150px] h-[150px] rounded-full">
        <Link href="/home">
          <Image
            src="/assets/logo-dashboaed.png"
            alt="logo"
            loading="lazy"
            fill
            className="rounded-xl cursor-pointer"
          />
        </Link>
      </div>

      <ul className="space-y-9 mt-14">
        {sidebarLinks.map((item) => {
          const Icon = item.icon;
          const hasSubItems = !!item.subItems;
          const isActive = pathname === item.href;

          return (
            <li key={item.label}>
              {hasSubItems ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={`flex items-center justify-between w-full cursor-pointer text-[#4B5563] hover:text-blue-600 ${
                      item.subItems.some((sub) => pathname === sub.href)
                        ? "text-blue-600 font-semibold"
                        : ""
                    }`}
                  >
                    <span className="flex items-center space-x-2 text-[#4B5563] font-semibold">
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </span>
                    {openDropdown === item.label ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>

                  {openDropdown === item.label && (
                    <ul className="pl-6 mt-4 space-y-4 text-[#4B5563]">
                      {item.subItems?.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = pathname === sub.href;
                        return (
                          <li key={sub.label}>
                            <Link
                              href={sub.href}
                              className={`flex items-center space-x-2 hover:text-blue-600 ${
                                isSubActive
                                  ? "text-blue-600 font-semibold"
                                  : "text-[#4B5563]"
                              }`}
                            >
                              <SubIcon size={16} />
                              <span>{sub.label}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center font-semibold space-x-2 hover:text-blue-600 ${
                    isActive ? "text-blue-600" : "text-[#4B5563]"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}

<li className="mt-8">
  <Link
    href="/forgot_password"
    className="flex items-center space-x-2 text-[#0A3161] hover:text-blue-600 font-semibold"
  >
    <DoorOpen size={18} />
    <span>Change Password</span>
  </Link>
</li>

      </ul>
      

      <div
        onClick={deleteToken}
        className="text-red-500 text-xl flex items-center gap-2 cursor-pointer mt-32 font-semibold"
      >
        <LogOut size={20} strokeWidth={2.25} className="rotate-[180deg]" />
        <span>Logout</span>
      </div>
    </div>
  );
}

export default SidBar;
