import React from "react";
import Sidebar from "@/components/layout/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col gap-5 md:flex-row">
      <Sidebar />

      <div className="flex-1">{children}</div>
    </main>
  );
};

export default Layout;
