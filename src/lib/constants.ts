import {
  LayoutGrid,
  Database,
  RefreshCw,
  TestTube,
  Hammer,
  Layers,
  Component,
} from "lucide-react";

export const LLMS = [
  { id: "claude", name: "Claude", dot: "#185FA5", icon: "✨" },
  { id: "chatgpt", name: "ChatGPT", dot: "#639922", icon: "🤖" },
  { id: "gemini", name: "Gemini", dot: "#D85A30", icon: "🌟" },
  { id: "perplexity", name: "Perplexity", dot: "#5DCAA5", icon: "🔍" },
] as const;

export const CATEGORIES = [
  { id: "all", name: "All", icon: LayoutGrid },
  { id: "ui", name: "UI Frameworks", icon: Component },
  { id: "state", name: "State Management", icon: Database },
  { id: "fetching", name: "Data Fetching", icon: RefreshCw },
  { id: "testing", name: "Testing", icon: TestTube },
  { id: "build", name: "Build Tools", icon: Hammer },
  { id: "utils", name: "Utilities", icon: Hammer },
  { id: "meta", name: "Meta Frameworks", icon: Layers },
] as const;
