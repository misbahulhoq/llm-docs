"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { libraries } from "@/lib/libraries";

const Sidebar = () => {
  const pathName = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <aside
      className={`[&::-webkit-scrollbar-thumb]:bg-foreground/25 bg-sidebar/40 text-sidebar-foreground sticky top-[56px] overflow-y-auto md:h-[calc(100vh-60px)] lg:w-56 lg:pb-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-track]:bg-transparent`}
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
          const latestVersion = library.versions
            ? library.versions[library.versions.length - 1]
            : null;

          const href = `/docs/${library.slug}${
            latestVersion ? `/${latestVersion}` : ""
          }`;
          const isActive = pathName === href;

          return (
            <Link
              key={library.slug}
              href={href}
              onClick={() => setMenuOpen(false)}
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
