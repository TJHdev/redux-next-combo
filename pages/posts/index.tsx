import { Inter } from "next/font/google";
import { PostList } from "@/components/Posts/PostList";
import Layout from "@/components/Layout";

export default function Feed() {
  return (
    <Layout title="Feed">
      <PostList />
    </Layout>
  );
}
