"use client";

import { useState, useEffect } from "react";

import HeroSection from "./hero";
import StatsBar from "./stats-bar";
import { Library, LLMId } from "@/lib/constants";
import CategoryFilter from "./category-filter";
import LibrariesGrid from "./libraries-grid";
import HowItWorks from "./how-it-works";
import RecentUpdates from "./recent-updates";

const LIBRARIES: Library[] = [
  {
    name: "React",
    desc: "UI component library by Meta",
    version: "v19.0",
    cat: "ui",
    badge: "popular",
    bg: "#E6F1FB",
    fg: "#0C447C",
    ltr: "Re",
  },
  {
    name: "Next.js",
    desc: "React meta-framework with SSR & SSG",
    version: "v15.2",
    cat: "meta",
    badge: "popular",
    bg: "#F1EFE8",
    fg: "#444441",
    ltr: "Nx",
  },
  {
    name: "Vue",
    desc: "Progressive JavaScript framework",
    version: "v3.5",
    cat: "ui",
    badge: "popular",
    bg: "#E1F5EE",
    fg: "#085041",
    ltr: "Vu",
  },
  {
    name: "Zustand",
    desc: "Minimal state management for React",
    version: "v5.0",
    cat: "state",
    badge: "popular",
    bg: "#FAEEDA",
    fg: "#633806",
    ltr: "Zs",
  },
  {
    name: "TanStack Query",
    desc: "Async & server-state manager",
    version: "v5.6",
    cat: "fetching",
    badge: "popular",
    bg: "#FBEAF0",
    fg: "#72243E",
    ltr: "TQ",
  },
  {
    name: "Zod",
    desc: "TypeScript-first schema validation",
    version: "v3.23",
    cat: "utils",
    badge: "new",
    bg: "#EEEDFE",
    fg: "#3C3489",
    ltr: "Zd",
  },
  {
    name: "Vitest",
    desc: "Vite-native unit testing framework",
    version: "v2.1",
    cat: "testing",
    badge: "new",
    bg: "#E1F5EE",
    fg: "#085041",
    ltr: "Vi",
  },
  {
    name: "Vite",
    desc: "Lightning-fast dev server & bundler",
    version: "v6.0",
    cat: "build",
    badge: "popular",
    bg: "#FAECE7",
    fg: "#712B13",
    ltr: "Vt",
  },
  {
    name: "Nuxt",
    desc: "Vue meta-framework with SSR & SSG",
    version: "v3.13",
    cat: "meta",
    badge: "stable",
    bg: "#E1F5EE",
    fg: "#085041",
    ltr: "Nu",
  },
  {
    name: "SvelteKit",
    desc: "Full-stack Svelte app framework",
    version: "v2.7",
    cat: "meta",
    badge: "stable",
    bg: "#FAECE7",
    fg: "#712B13",
    ltr: "Sk",
  },
  {
    name: "Axios",
    desc: "Promise-based HTTP client",
    version: "v1.7",
    cat: "fetching",
    badge: "stable",
    bg: "#F1EFE8",
    fg: "#444441",
    ltr: "Ax",
  },
  {
    name: "Playwright",
    desc: "End-to-end browser testing tool",
    version: "v1.48",
    cat: "testing",
    badge: "popular",
    bg: "#EEEDFE",
    fg: "#3C3489",
    ltr: "Pw",
  },
];

export default function LandingPage() {
  const [searchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedLLM, setSelectedLLM] = useState<LLMId>("claude");

  // Filter libraries based on search & category
  const filteredLibraries = LIBRARIES.filter((lib) => {
    const matchesCategory =
      activeCategory === "all" || lib.cat === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      lib.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lib.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Bar with LLM Selector */}
        <StatsBar selectedLLM={selectedLLM} setSelectedLLM={setSelectedLLM} />

        {/* Categories Filter */}
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Libraries Grid */}
        <LibrariesGrid
          selectedLLM={selectedLLM}
          filteredLibraries={filteredLibraries}
        />

        {/* How it works */}
        <HowItWorks />

        {/* Recent Updates */}
        <RecentUpdates />
      </div>
    </div>
  );
}
