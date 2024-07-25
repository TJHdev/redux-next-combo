import Image from "next/image";
import { Inter } from "next/font/google";

import { NavBar } from "@/components/NavBar";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col gap-2  ${inter.className}`}
    >
      <NavBar />
      <div className="container mx-auto flex  items-center gap-5 max-w-xl">
        <p>click the Feed link above to see posts ↑</p>
      </div>
    </main>
  );
}
