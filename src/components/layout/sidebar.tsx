"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { libraries } from "@/lib/libraries";
import { ChevronRight } from "lucide-react";

const Sidebar = () => {
  const pathName = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <aside
      className={`[&::-webkit-scrollbar-thumb]:bg-foreground/25 bg-sidebar/40 text-sidebar-foreground overflow-y-auto lg:w-56 lg:pb-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-track]:bg-transparent`}
    >
      <button
        className="bg-secondary sticky top-0 z-10 flex w-full items-center justify-between px-6 py-3 md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span>Menu</span>
        <ChevronRight
          size={20}
          className={`transform transition-transform duration-200 ${
            menuOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      <div className={`${menuOpen ? "block" : "hidden"} mt-4 md:block lg:mt-0`}>
        {libraries.map((library) => {
          const href = `/docs/${library.slug}`;
          const isActive = pathName === href;
          return (
            <Link
              key={library.slug}
              href={href}
              className={`my-1.5 block py-2 pr-6 pl-6 font-light ${
                isActive && "text-primary font-semibold"
              }`}
            >
              {library.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
