"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 px-10 py-20 pt-6 text-xs text-gray-500 sm:flex-row dark:border-gray-800 dark:text-gray-400">
      {/* Footer Top Part */}
      <div className="">
        <div className="flex gap-5">
          <Link
            href="/about"
            className="transition-colors hover:text-gray-900 dark:hover:text-gray-300"
          >
            About
          </Link>
          <a
            href="https://github.com/misbahulhoq/llms-full"
            target="_blank"
            className="transition-colors hover:text-gray-900 dark:hover:text-gray-300"
          >
            GitHub
          </a>
          <a
            href="#"
            className="transition-colors hover:text-gray-900 dark:hover:text-gray-300"
          >
            API
          </a>
          <a
            href="#"
            className="transition-colors hover:text-gray-900 dark:hover:text-gray-300"
          >
            Changelog
          </a>
        </div>
      </div>

      {/* Footer Bottom Part */}
      <button
        className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400 dark:hover:bg-blue-950"
        onClick={() => alert("Submit a library - coming soon!")}
      >
        <Plus className="h-3 w-3" />
        Submit a library
      </button>
    </footer>
  );
};

export default Footer;
