import React from "react";
import { PostSingleItem } from "@/components/Posts/PostSingleItem";

import { Post, postsApi } from "@/service/posts";
import Layout from "@/components/Layout";

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const data = await postsApi.getPost({ id: slug });
  const response = await data.json();

  return {
    props: { post: response },
  };
}

export default function SinglePostPage({ post }: { post: Post }) {
  return (
    <Layout title={`Robot ${post.id}`}>
      <PostSingleItem post={post} />
    </Layout>
  );
}
