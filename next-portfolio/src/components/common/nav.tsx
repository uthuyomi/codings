"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type MenuItem = {
  id: number;
  label: string;
  path: string;
};

type NavMenuProps = {
  data: MenuItem[];
};

const Nav = ({ data }: NavMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative flex items-center justify-end w-full">
      {/* ✅ PCメニュー（右寄せ） */}
      <div className="hidden md:flex space-x-8">
        {data.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className="text-gray-200 hover:text-teal-400 transition-colors duration-200"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* ✅ モバイルアイコン（右上固定） */}
      <button
        className="md:hidden text-gray-200 hover:text-teal-400 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="メニューを開く"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* ✅ モバイルメニュー（右端揃え） */}
      {isOpen && (
        <div
          className="
      fixed left-0 right-0 top-[90px] 
      w-full z-40
      bg-black/95 backdrop-blur-md
      border-t border-gray-700
      py-8
      flex flex-col items-center space-y-6
      md:hidden
    "
        >
          {data.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className="text-gray-200 text-lg font-medium hover:text-teal-400 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Nav;
