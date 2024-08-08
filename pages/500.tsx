import React from "react";

import { Post } from "@/service/posts";
import Layout from "@/components/Layout";

export default function ErrorPage({ post }: { post: Post }) {
  return (
    <Layout title="Error">
      <div className="max-w-xl mx-auto mb-6 px-4 w-full">
        Something went wrong fetching the data
      </div>
    </Layout>
  );
}
