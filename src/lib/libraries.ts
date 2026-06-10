export const LIBRARY_CATEGORIES = [
  "ui",
  "meta",
  "state",
  "fetching",
  "utils",
  "testing",
  "build",
] as const;

export type LibraryCategory = (typeof LIBRARY_CATEGORIES)[number];

export interface LibraryInfo {
  name: string;
  slug: string;
  category: string;
  iconName: string;
  docs?: string[];
  versions: string[] | null;
  badge?: string;
}

export const libraries: LibraryInfo[] = [
  // Meta Frameworks
  {
    name: "Next.js",
    slug: "nextjs",
    category: "meta",
    iconName: "next.png",
    docs: ["index", "full"],
    badge: "popular",
    versions: ["16.2.6", "16.2.7"],
  },
  {
    name: "Nuxt",
    slug: "nuxt",
    iconName: "nuxt.svg",
    docs: ["index", "full"],
    category: "meta",
    badge: "popular",
    versions: ["4"],
  },
  {
    name: "Svelte",
    slug: "svelte",
    iconName: "svelte.png",
    docs: ["index", "small", "medium", "full"],
    category: "meta",
    badge: "popular",
    versions: ["5"],
  },

  {
    name: "Vue",
    slug: "vue",
    iconName: "vue.svg",
    docs: ["index", "full"],
    category: "ui",
    badge: "popular",
    versions: ["3"],
  },

  // State Management
  {
    name: "Zustand",
    slug: "zustand",
    iconName: "zustand.svg",
    docs: ["index", "full"],
    category: "state",
    badge: "popular",
    versions: ["5"],
  },

  // {
  //   name: "Jotai",
  //   slug: "jotai",
  //   category: "state",
  //   badge: "new",
  //   versions: null,
  // },
  // {
  //   name: "Pinia",
  //   slug: "pinia",
  //   category: "state",
  //   badge: "popular",
  //   versions: null,
  // },
  // {
  //   name: "MobX",
  //   slug: "mobx",
  //   category: "state",
  //   badge: "stable",
  //   versions: null,
  // },

  // Data Fetching
  // {
  //   name: "TanStack Query",
  //   slug: "tanstack-query",
  //   category: "fetching",
  //   badge: "popular",
  //   versions: null,
  // },
  // {
  //   name: "Axios",
  //   slug: "axios",
  //   category: "fetching",
  //   badge: "popular",
  //   versions: null,
  // },
  // {
  //   name: "SWR",
  //   slug: "swr",
  //   category: "fetching",
  //   badge: "popular",
  //   versions: null,
  // },
  // {
  //   name: "tRPC",
  //   slug: "trpc",
  //   category: "fetching",
  //   badge: "new",
  //   versions: null,
  // },
  // {
  //   name: "Apollo Client",
  //   slug: "apollo-client",
  //   category: "fetching",
  //   badge: "stable",
  //   versions: null,
  // },

  // Build Tools
  // {
  //   name: "Vite",
  //   slug: "vite",
  //   category: "build",
  //   badge: "popular",
  //   versions: null,
  // },
  // {
  //   name: "Turbopack",
  //   slug: "turbopack",
  //   category: "build",
  //   badge: "new",
  //   versions: null,
  // },
  // {
  //   name: "esbuild",
  //   slug: "esbuild",
  //   category: "build",
  //   badge: "stable",
  //   versions: null,
  // },

  // Testing
  // {
  //   name: "Vitest",
  //   slug: "vitest",
  //   category: "testing",
  //   badge: "popular",
  //   versions: null,
  // },
  // {
  //   name: "Playwright",
  //   slug: "playwright",
  //   category: "testing",
  //   badge: "popular",
  //   versions: null,
  // },
  // {
  //   name: "Jest",
  //   slug: "jest",
  //   category: "testing",
  //   badge: "popular",
  //   versions: null,
  // },

  // // Utilities
  // {
  //   name: "Zod",
  //   slug: "zod",
  //   category: "utils",
  //   badge: "popular",
  //   versions: null,
  // },
  // {
  //   name: "Lodash",
  //   slug: "lodash",
  //   category: "utils",
  //   badge: "stable",
  //   versions: null,
  // },
  // {
  //   name: "date-fns",
  //   slug: "date-fns",
  //   category: "utils",
  //   badge: "stable",
  //   versions: null,
  // },
  // {
  //   name: "Radix UI",
  //   slug: "radix-ui",
  //   category: "utils",
  //   badge: "popular",
  //   versions: null,
  // },
];

export const librariesCount = libraries.filter((lib) => lib.versions).length;
