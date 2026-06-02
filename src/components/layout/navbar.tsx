"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Github, BookMarked, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface NavLink {
  label: string;
  href: string;
}

// Dynamically import the toggle and disable Server-Side Rendering
const ThemeToggle = dynamic(
  () =>
    import("@/components/shared/theme-changer").then((mod) => mod.ThemeToggle),
  {
    ssr: false,
    loading: () => (
      <Button variant="outline" size="icon" disabled className="w-9 h-9">
        <span className="h-[1.2rem] w-[1.2rem] block" />
      </Button>
    ),
  },
);

// ─── Constants ───────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  { label: "Libraries", href: "/libraries" },
  { label: "Categories", href: "/categories" },
  { label: "Changelog", href: "/changelog" },
  { label: "About", href: "/about" },
];

// ─── Navbar ──────────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0 group"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-white">
              <BookMarked className="h-3.5 w-3.5" />
            </div>
            <span className="font-semibold text-sm tracking-tight">
              LLM<span className="text-blue-600">Docs</span>
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-accent text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right side actions ── */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Submit a library */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden sm:flex h-8 gap-1.5 text-xs"
            >
              <Link href="/submit">
                <Plus className="h-3.5 w-3.5" />
                Submit
              </Link>
            </Button>

            {/* GitHub */}
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="h-8 w-8 px-0 text-muted-foreground hover:text-foreground"
              aria-label="View source on GitHub"
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              className="flex md:hidden h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1">
                <span
                  className={cn(
                    "block h-0.5 w-4 bg-current transition-transform origin-center",
                    mobileOpen && "translate-y-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-4 bg-current transition-opacity",
                    mobileOpen && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-4 bg-current transition-transform origin-center",
                    mobileOpen && "-translate-y-1.5 -rotate-45",
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-200 border-t border-border/40",
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav
          className="flex flex-col gap-1 px-4 py-3"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-accent text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/submit"
            className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Submit a library
          </Link>
        </nav>
      </div>
    </header>
  );
}
