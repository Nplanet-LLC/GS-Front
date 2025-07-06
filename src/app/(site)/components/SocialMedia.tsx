import Image from "next/image";
import Link from "next/link";
import React from "react";

function SocialMedia() {
  const SocialMedia = [
    {
      icone: "/assets/Vector.svg", // Facebook
      link: "https://www.facebook.com/profile.php?id=61575981643630",
    },
    {
      icone: "/assets/Vector (1).svg", // LinkedIn
      link: "https://www.linkedin.com/company/glocal-solutions-us",
    },
    // {
    //   icone: "/assets/Vector (2).svg",
    //   link: "#",
    // },
  ];

  return (
    <div className="flex items-center gap-3">
      {SocialMedia.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          target="_blank" // يفتح في تبويب جديد
          rel="noopener noreferrer"
          className="relative h-[25px] w-[30px] rounded-full"
        >
          <Image
            src={item.icone}
            alt="logo"
            loading="lazy"
            fill
            className="object-contain"
          />
        </Link>
      ))}
    </div>
  );
}

export default SocialMedia;
