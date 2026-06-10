"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { BASE_PATH, cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { SVGImage } from "@/components/shared/svg-image";
import { githubUrl } from "@/lib/constants";

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
      <Button variant="outline" size="icon" disabled className="h-9 w-9">
        <span className="block h-[1.2rem] w-[1.2rem]" />
      </Button>
    ),
  },
);

// ─── Constants ───────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  { label: "Docs", href: "/docs" },
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="group flex flex-shrink-0 items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md">
              <Image
                src={`${BASE_PATH}/logo_transparent.svg`}
                alt="LLM Full"
                height={50}
                width={50}
              />
            </div>

            <span className="text-lg font-semibold tracking-tight">
              LLM<span className="text-primary">Docs</span>
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <nav
            className="hidden items-center gap-1 md:flex"
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
          <div className="flex flex-shrink-0 items-center gap-3">
            {/* GitHub */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background text-foreground"
            >
              <Suspense fallback={<span className="sr-only">GitHub</span>}>
                <SVGImage
                  alt="GitHub"
                  className="h-6 w-6"
                  src={`${BASE_PATH}/icons/github.svg`}
                />
              </Suspense>
            </a>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              className="text-muted-foreground hover:text-foreground hover:bg-accent flex h-8 w-8 items-center justify-center rounded-md transition-colors md:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1.5">
                <span
                  className={cn(
                    "block h-0.5 w-5 origin-center bg-current transition-transform",
                    mobileOpen && "translate-y-2 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-5 bg-current transition-opacity",
                    mobileOpen && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-5 origin-center bg-current transition-transform",
                    mobileOpen && "-translate-y-2 -rotate-45",
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
          "border-border/40 overflow-hidden border-t transition-all duration-200 md:hidden",
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
            className="text-muted-foreground hover:text-foreground hover:bg-accent/60 flex items-center gap-1.5 rounded-md px-3 py-2 text-sm transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Submit a library
          </Link>
        </nav>
      </div>
    </header>
  );
}
