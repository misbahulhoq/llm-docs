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
      className={`[&::-webkit-scrollbar-thumb]:bg-foreground/25 bg-secondary/50 text-secondary-foreground overflow-y-auto py-5 lg:w-56 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-track]:bg-transparent`}
    >
      <div className={`h-0 md:h-auto`}>
        <button
          className="flex items-center md:hidden"
          onClick={() => {
            setMenuOpen((prev) => !prev);
          }}
        >
          Menu <ChevronRight size={20} />
        </button>

        {libraries.map((library) => {
          const href = `/docs/${library.slug}`;
          const isActive = pathName === href;
          return (
            <Link
              key={library.slug}
              href={href}
              className={`my-1.5 block py-2 pl-6 ${isActive && "text-primary font-semibold"}`}
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
