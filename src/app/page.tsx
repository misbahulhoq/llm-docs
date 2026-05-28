"use client";
import { useState } from "react";
import ChildOne from "./components/child-one";
import ChildTwo from "./components/child-two";

export default function Home() {
  const [childOneKey, setChildOneKey] = useState(0);
  const [childTwoKey, setChildTwoKey] = useState(10);
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="mb-10 space-x-10">
        <button onClick={() => setChildOneKey(childOneKey + 1)}>
          Increment Child One
        </button>
        <button onClick={() => setChildTwoKey(childTwoKey + 1)}>
          Increment Child Two
        </button>
      </div>
      <div className="space-y-10">
        <ChildOne prop={childOneKey} />
        <ChildTwo key={childTwoKey} />
      </div>
    </main>
  );
}
