import React from "react";
import Sidebar from "@/components/layout/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col gap-5 md:flex-row">
      <Sidebar />

      <div className="flex-1 px-5 py-1 md:px-3 md:py-5">{children}</div>
    </main>
  );
};

export default Layout;
