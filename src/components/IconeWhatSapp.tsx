import Link from "next/link";
import React from "react";

function IconeWhatSapp() {
  return (
    <Link
      href="https://wa.me/message/KT2NKQ74BR3MA1"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-3 rounded-full animate-whatsappPluse shadow-lg hover:bg-green-600 transition-all"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12.01 2C6.48 2 2 6.48 2 12c0 1.93.55 3.73 1.51 5.26L2 22l4.92-1.5A9.953 9.953 0 0012.01 22c5.52 0 9.99-4.48 9.99-10S17.53 2 12.01 2zm0 18c-1.76 0-3.4-.52-4.77-1.41l-.34-.22-2.92.89.89-2.85-.22-.36A7.936 7.936 0 014.01 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8zm4.25-5.3c-.24-.12-1.42-.7-1.64-.77-.22-.08-.38-.12-.53.12-.16.24-.61.77-.75.93-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.18-.71-.63-1.19-1.41-1.34-1.65-.14-.24-.02-.37.11-.49.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.28-.73-1.75-.19-.46-.38-.4-.53-.41h-.45c-.14 0-.36.05-.55.26-.19.21-.72.7-.72 1.7s.74 1.98.85 2.12c.11.14 1.45 2.22 3.51 3.12.49.21.87.34 1.17.44.49.16.94.14 1.29.09.39-.06 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
      </svg>
    </Link>
  );
}

export default IconeWhatSapp;
