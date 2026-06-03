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
      className={`[&::-webkit-scrollbar-thumb]:bg-foreground/25 bg-secondary/50 text-secondary-foreground overflow-y-auto py-3 lg:w-56 lg:py-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-track]:bg-transparent`}
    >
      <button
        className="flex w-full items-center pl-6 md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        Menu
        <ChevronRight
          size={20}
          className={`ml-1 transform transition-transform duration-200 ${
            menuOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      <div className={`${menuOpen ? "block" : "hidden"} mt-7 md:block lg:mt-0`}>
        {libraries.map((library) => {
          const href = `/docs/${library.slug}`;
          const isActive = pathName === href;
          return (
            <Link
              key={library.slug}
              href={href}
              className={`my-1.5 block py-2 pl-6 ${
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
