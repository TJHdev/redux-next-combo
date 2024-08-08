import React, { Fragment, ReactNode } from "react";
import { NavBar } from "@/components/NavBar";

import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Fragment>
      <Head>
        <title>Robots | {title}</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col bg-gray-900 gap-2 ${inter.className}`}
      >
        <NavBar />
        <div className="container mx-auto flex  items-center gap-5 max-w-xl">
          {children}
        </div>
      </main>
    </Fragment>
  );
}
