import { Fragment } from "react";
import { Inter } from "next/font/google";
import { NavBar } from "../components/NavBar";
import { PostList } from "@/components/Posts/PostList";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Feed() {
  return (
    <Fragment>
      <Head>
        <title>Robots | Feed</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col bg-gray-900 gap-2 ${inter.className}`}
      >
        <NavBar />
        <div className="container mx-auto flex  items-center gap-5 max-w-xl">
          <PostList />
        </div>
      </main>
    </Fragment>
  );
}
