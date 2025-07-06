"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const data = [
  { name: "Home", link: "/home" },
  { name: "About Us", link: "#about_as" },
  { name: "Services", link: "/services" },
  { name: "Why Us", link: "#why_us" },
  { name: "Testimonials", link: "/success_stories" },
  { name: "Events", link: "/events" },
  { name: "Contact Us", link: "/Contact Us" },
];

function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className=" px-9 py-6 bg-[#FBFBFB] shadow-2xs  sticky top-0 z-50 text-[#0A3161] text-4xl">
      <h1>Welcome back</h1>
    </nav>
  );
}

export default NavBar;
