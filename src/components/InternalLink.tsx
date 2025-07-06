"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

interface InternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const InternalLink: React.FC<InternalLinkProps> = ({
  href,
  children,
  className = "",
  onClick,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (onClick) {
      onClick();
      return;
    }

    // إذا كان الرابط يحتوي على hash
    if (href.includes("#")) {
      const [path, hash] = href.split("#");

      if (pathname === path || (path === "/" && pathname === "/")) {
        // إذا كنا في نفس الصفحة، ننتقل إلى القسم مباشرة
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // إذا كنا في صفحة أخرى، ننتقل إلى الصفحة مع hash
        router.push(href);
      }
    } else {
      // رابط عادي
      router.push(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default InternalLink;
