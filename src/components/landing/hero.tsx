import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { librariesCount } from "@/lib/libraries";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="mb-8 text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
        <span>{librariesCount} libraries · always up to date</span>
      </div>
      <h1 className="mb-3 text-4xl font-medium tracking-tight text-gray-900 sm:text-5xl dark:text-white">
        Ask LLMs about popular
        <br />
        <span className="text-blue-700 dark:text-blue-400">
          JavaScript libraries
        </span>
      </h1>
      <p className="mx-auto mb-6 max-w-lg text-sm text-gray-600 dark:text-gray-400">
        Find the library, hit Ask, and get redirected to your preferred LLM with
        the full docs as context — no copy-pasting, no context overflow.
      </p>
      <div className="relative mx-auto max-w-md">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          id="search-input"
          type="text"
          placeholder="Search libraries… React, Zod, TanStack…"
          className="h-11 border-gray-200 bg-white pr-16 pl-9 dark:border-gray-800 dark:bg-gray-900"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <kbd className="absolute top-1/2 right-3 -translate-y-1/2 rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-[11px] text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
          ⌘K
        </kbd>
      </div>
    </section>
  );
};

export default HeroSection;
