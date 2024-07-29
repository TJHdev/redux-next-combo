import { Inter } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Fragment } from "react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Robots</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col bg-gray-900 gap-2 ${inter.className}`}
      >
        <NavBar />
        <div className="container mx-auto flex gap-5 max-w-xl px-4 text-gray-300">
          <p>click the Feed link above to see posts ↑</p>
        </div>
      </main>
    </Fragment>
  );
}
