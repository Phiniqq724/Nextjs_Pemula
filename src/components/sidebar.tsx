"use client";
import React, { useState } from "react";

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuToggle = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <button
        className="p-2 outline-1 outline bg-white outline-slate-400 rounded-xl z-50 left-10 top-10 fixed"
        title="SidebarMenu"
        onClick={handleMenuToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            className="text-slate-400"
          />
        </svg>
      </button>
      {openMenu && { children }}
    </>
  );
}
