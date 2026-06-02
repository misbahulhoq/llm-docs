"use client";

import { useState, useEffect, useMemo } from "react";
import { Copy, Check, MessageCircle } from "lucide-react";

// shadcn/ui components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import Footer from "@/components/layout/footer";
import HeroSection from "./hero";
import StatsBar from "./stats-bar";
import { CATEGORIES, LLMS } from "@/lib/constants";

// ============================================================================
// Data & Types
// ============================================================================

interface Library {
  name: string;
  desc: string;
  version: string;
  cat: string;
  badge: "popular" | "new" | "stable";
  bg: string;
  fg: string;
  ltr: string;
}

interface RecentItem {
  name: string;
  tag: string;
  time: string;
  bg: string;
  fg: string;
  ltr: string;
}

export type LLMId = (typeof LLMS)[number]["id"];

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

const RECENT_ITEMS: RecentItem[] = [
  {
    name: "React",
    tag: "v19.0.0",
    time: "2h ago",
    bg: "#E6F1FB",
    fg: "#0C447C",
    ltr: "Re",
  },
  {
    name: "Vite",
    tag: "v6.0.3",
    time: "1d ago",
    bg: "#FAECE7",
    fg: "#712B13",
    ltr: "Vt",
  },
  {
    name: "Zod",
    tag: "v3.23.1",
    time: "2d ago",
    bg: "#EEEDFE",
    fg: "#3C3489",
    ltr: "Zd",
  },
  {
    name: "Playwright",
    tag: "v1.48.2",
    time: "4d ago",
    bg: "#EEEDFE",
    fg: "#3C3489",
    ltr: "Pw",
  },
  {
    name: "TanStack Query",
    tag: "v5.6.0",
    time: "6d ago",
    bg: "#FBEAF0",
    fg: "#72243E",
    ltr: "TQ",
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

function buildLLMUrl(llmId: LLMId, libName: string): string {
  const prompt = `Using the documentation at https://llmdocs.com/docs/${libName.toLowerCase().replace(/\s/g, "-")}.md, help me understand and work with ${libName}.`;
  const encodedPrompt = encodeURIComponent(prompt);
  switch (llmId) {
    case "claude":
      return `https://claude.ai/new?q=${encodedPrompt}`;
    case "chatgpt":
      return `https://chatgpt.com/?q=${encodedPrompt}`;
    case "gemini":
      return `https://gemini.google.com/app?q=${encodedPrompt}`;
    case "perplexity":
      return `https://perplexity.ai/?q=${encodedPrompt}`;
    default:
      return `https://claude.ai/new?q=${encodedPrompt}`;
  }
}

// ============================================================================
// Main Component
// ============================================================================

export default function LandingPage() {
  const [searchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedLLM, setSelectedLLM] = useState<LLMId>("claude");
  const [copiedLibName, setCopiedLibName] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter libraries based on search & category
  const filteredLibraries = useMemo(() => {
    return LIBRARIES.filter((lib) => {
      const matchesCategory =
        activeCategory === "all" || lib.cat === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        lib.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lib.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      }
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Copy library name to clipboard
  const handleCopy = async (libName: string) => {
    await navigator.clipboard.writeText(libName);
    setCopiedLibName(libName);
    setTimeout(() => setCopiedLibName(null), 1500);
  };

  // Ask LLM about a library
  const handleAsk = (libName: string) => {
    const url = buildLLMUrl(selectedLLM, libName);
    window.open(url, "_blank");
  };

  const currentLLM = LLMS.find((l) => l.id === selectedLLM)!;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Bar with LLM Selector */}
        <StatsBar />

        {/* Categories Filter */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <Button
                  key={cat.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={`gap-1.5 rounded-full text-xs h-8 ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950 text-blue-700 border-blue-200"
                      : "border-foreground/30 text-gray-600"
                  }`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Libraries Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-medium  ">Popular libraries</h2>
              <p className="text-xs  ">Most asked this week</p>
            </div>
          </div>

          {filteredLibraries.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-foreground/30  rounded-lg">
              <p className="text-sm  ">
                No libraries found.{" "}
                <button
                  className="text-blue-600  hover:underline"
                  onClick={() => alert("Submit a library feature coming soon")}
                >
                  Submit it ↗
                </button>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredLibraries.map((lib) => {
                const isCopied = copiedLibName === lib.name;
                return (
                  <Card
                    key={lib.name}
                    className="group border border-gray-100  hover:border-foreground/30  transition-all"
                  >
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-medium"
                          style={{ background: lib.bg, color: lib.fg }}
                        >
                          {lib.ltr}
                        </div>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] px-2 py-0 ${
                            lib.badge === "popular"
                              ? "bg-emerald-50 text-emerald-700"
                              : lib.badge === "new"
                                ? "bg-primary/10 text-primary"
                                : "bg-card text-card-foreground "
                          }`}
                        >
                          {lib.badge}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium  ">{lib.name}</h3>
                        <p className="text-xs   mt-1">{lib.desc}</p>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] font-mono text-muted-foreground">
                          {lib.version}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <Button
                          size="sm"
                          className="flex-1 h-8 gap-1.5"
                          onClick={() => handleAsk(lib.name)}
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          Ask {currentLLM.name}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 px-3 gap-1.5"
                          onClick={() => handleCopy(lib.name)}
                        >
                          {isCopied ? (
                            <Check className="h-3.5 w-3.5 text-accent" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                          <span className="text-xs">
                            {isCopied ? "Copied!" : "Copy"}
                          </span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* How it works */}
        <div className="mb-8">
          <h2 className="text-sm font-medium   mb-3">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                step: "1",
                title: "Find your library",
                desc: "Search by name or browse by category. Every major JS ecosystem library is indexed here.",
              },
              {
                step: "2",
                title: "Hit Ask",
                desc: "Choose your preferred LLM from the dropdown. You'll be redirected instantly with the docs pre-loaded as context.",
              },
              {
                step: "3",
                title: "Start asking",
                desc: "The LLM receives a prompt with your doc URL. No context window overflow — just relevant, structured answers.",
              },
            ].map((item) => (
              <Card
                key={item.step}
                className="border border-gray-100  bg-gray-50 dark:bg-gray-900/50"
              >
                <CardContent className="p-4">
                  <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-foreground/30 dark:border-gray-700 flex items-center justify-center text-[11px] font-medium text-gray-600  mb-2">
                    {item.step}
                  </div>
                  <h3 className="text-sm font-medium   mb-1">{item.title}</h3>
                  <p className="text-xs   leading-relaxed">{item.desc}</p>
                  {item.step === "2" && (
                    <div className="flex gap-1.5 mt-3">
                      {LLMS.map((llm) => (
                        <span
                          key={llm.id}
                          className="text-[10px] px-2 py-0.5 rounded-full border border-foreground/30 dark:border-gray-700  "
                        >
                          {llm.name}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Updates */}
        <div className="mb-8">
          <div className="mb-3">
            <h2 className="text-sm font-medium  ">Recent updates</h2>
            <p className="text-xs  ">Docs updated in the last 7 days</p>
          </div>
          <div className="space-y-0 divide-y divide-gray-100 dark:divide-gray-800 border border-gray-100  rounded-lg">
            {RECENT_ITEMS.map((item) => {
              const isCopied = copiedLibName === item.name;
              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-3"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-medium"
                      style={{ background: item.bg, color: item.fg }}
                    >
                      {item.ltr}
                    </div>
                    <div>
                      <span className="text-sm  ">{item.name}</span>
                      <span className="text-[11px] font-mono text-gray-400 dark: ml-1.5">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-400 dark:">
                      {item.time}
                    </span>
                    <Button
                      size="sm"
                      className="h-7 px-2.5 gap-1 bg-blue-700 hover:bg-blue-800 text-white text-[11px]"
                      onClick={() => handleAsk(item.name)}
                    >
                      <MessageCircle className="h-3 w-3" />
                      Ask
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 gap-1 text-[11px] border-foreground/30 "
                      onClick={() => handleCopy(item.name)}
                    >
                      {isCopied ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      {isCopied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
