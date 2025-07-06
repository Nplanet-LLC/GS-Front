"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import InternalLink from "../../../components/InternalLink";

const data = [
  { name: "Home", link: "/home" },
  { name: "About Us", link: "/#about_as" },
  { name: "Services", link: "/service" },
  { name: "Why Us", link: "/#why_us" },
  { name: "Testimonials", link: "/#What_Our_Clients_Say" },
  // { name: "Testimonials", link: "/success_stories" },
  { name: "Events", link: "/events" },
  { name: "Contact Us", link: "/contact_us" },
];

function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="p-4 px-6 bg-[#FBFBFB] shadow-2xs flex items-center  justify-between gap-6 sticky top-0 z-50">
      {/* Logo */}
      <Link href="/home" className=" flex items-center">
        <div className="relative h-[40px] w-[100px]">
          <Image
            src="/assets/logo.png"
            alt="logo"
            loading="lazy"
            fill
            className="object-contain"
          />
        </div>
        <p className=" ml-[-25px] text-[#061D3A] font-bold text-lg">
          Glocal Solutions
        </p>
      </Link>

      {/* Desktop Menu */}
      <div className="gap-6 items-center lg:flex hidden">
        {data.map((item, index) => {
          const isAnchorLink = item.link.startsWith("#");
          const isActive = pathname === item.link;

          const linkClass = `py-1.5 px-3 rounded-sm font-medium transition-colors duration-300 ease-in-out ${
            isActive
              ? "bg-[#B31942] text-white"
              : "text-[#061D3A] hover:text-white hover:bg-[#B31942]"
          }`;

          return (
            <div key={index}>
              {isAnchorLink ? (
                <a href={item.link} className={linkClass}>
                  {item.name}
                </a>
              ) : (
                <Link href={item.link} className={linkClass}>
                  {item.name}
                </Link>
              )}
            </div>
          );
        })}
        {/* <Link
          href="/login"
          className="py-1.5 px-4 rounded-sm font-medium bg-[#B31942] text-white hover:bg-[#a1153a] transition duration-300"
        >
          Login
        </Link> */}
      </div>

      {/* Mobile Menu Button */}
      <span className="lg:hidden block cursor-pointer" onClick={toggleMenu}>
        {isOpen ? (
          <X className="text-black" size={28} />
        ) : (
          <Menu className="text-black" size={28} />
        )}
      </span>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 max-w-xs bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <button
          onClick={toggleMenu}
          className=" text-black mx-2 mt-4 cursor-pointer"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        <div className="p-6 space-y-4">
          {data.map((item, index) => {
            const isAnchorLink = item.link.startsWith("#");
            const isActive = pathname === item.link;

            const linkClass = `block py-2 px-4 rounded-md font-medium ${
              isActive
                ? "bg-[#B31942] text-white"
                : "text-[#061D3A] hover:text-white hover:bg-[#B31942]"
            }`;

            return (
              <div key={index} onClick={closeMenu}>
                {isAnchorLink ? (
                  <a href={item.link} className={linkClass}>
                    {item.name}
                  </a>
                ) : (
                  <Link href={item.link} className={linkClass}>
                    {item.name}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
