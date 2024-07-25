import Image from "next/image";
import { type Post } from "./PostItem";
import { useState } from "react";

// make this call initially
// https://dummyjson.com/comments?limit=10&sortBy=id&order=desc
// make this call as a follow up for adding to the top
// https://dummyjson.com/comments?limit=10&skip=250&sortBy=id&order=asc

const mockPosts = {
  comments: [
    {
      id: 1,
      body: "This is some awesome thinking!",
      postId: 242,
      likes: 3,
      user: { id: 105, username: "emmac", fullName: "Emma Wilson" },
    },
    {
      id: 2,
      body: "What terrific math skills you're showing!",
      postId: 46,
      likes: 4,
      user: { id: 183, username: "cameronp", fullName: "Cameron Perez" },
    },
    {
      id: 3,
      body: "You are an amazing writer!",
      postId: 235,
      likes: 2,
      user: { id: 1, username: "emilys", fullName: "Emily Johnson" },
    },
    {
      id: 4,
      body: "Wow! You have improved so much!",
      postId: 31,
      likes: 1,
      user: { id: 89, username: "braydenf", fullName: "Brayden Fleming" },
    },
    {
      id: 5,
      body: "Nice idea!",
      postId: 212,
      likes: 1,
      user: { id: 149, username: "wyattp", fullName: "Wyatt Perry" },
    },
    {
      id: 6,
      body: "You are showing excellent understanding!",
      postId: 184,
      likes: 5,
      user: { id: 110, username: "danielt", fullName: "Daniel Taylor" },
    },
    {
      id: 7,
      body: "This is clear, concise, and complete!",
      postId: 172,
      likes: 1,
      user: { id: 4, username: "jamesd", fullName: "James Davis" },
    },
    {
      id: 8,
      body: "What a powerful argument!",
      postId: 233,
      likes: 0,
      user: { id: 145, username: "lukec", fullName: "Luke Cooper" },
    },
    {
      id: 9,
      body: "I knew you could do it!",
      postId: 207,
      likes: 3,
      user: { id: 207, username: "jaces", fullName: "Jace Smith" },
    },
    {
      id: 10,
      body: "Wonderful ideas!",
      postId: 87,
      likes: 0,
      user: { id: 86, username: "noram", fullName: "Nora Mills" },
    },
  ],
  total: 340,
  skip: 0,
  limit: 10,
};

export const PostList = () => {
  const [post, setPost] = useState<Post | undefined>();
  const posts = mockPosts.comments;

  if (post) {
    return (
      <div className="max-w-xl mx-auto mb-6 px-4">
        <div
          key={post.id}
          className="relative bg-gray-200 p-4 rounded shadow-md mb-4 gap-4 border-2 border-gray-400 px-4"
        >
          <Image
            onClick={() => setPost(undefined)}
            src={"/back.svg"}
            width={50}
            height={50}
            alt="back icon"
            className="cursor-pointer absolute top-2 left-2"
          />

          <div className="flex flex-col justify-center items-center gap-4 w-100 ">
            <Image
              alt="User image"
              src={`https://robohash.org/${post.id}`}
              width={150}
              height={150}
              className="border max-h-[70px] max-w-[70px] sm:max-h-[150px] sm:max-w-[150px]"
            />
            <h2 className="text-lg font-bold overflow-hidden line-clamp-3 ellipsis">
              {post.user.fullName}
            </h2>
            <div>
              <p className="text-gray-600">
                {post.body} {` `}
                {post.body} {` `}
                {post.body} {` `}
                {post.body} {` `}
                {post.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mb-6 px-4">
      <h1 className="text-3xl font-bold mb-2">Recent Posts</h1>
      <div className="gap-2">
        {posts.map((post) => (
          <div
            onClick={() => setPost(post)}
            key={post.id}
            className="flex flex-wrap row bg-gray-200 p-4 rounded shadow-md mb-4 gap-4 border-2 border-gray-400 hover:transition-all hover:border-orange-500 cursor-pointer"
          >
            <div className="flex justify-start items-center gap-4 w-100 ">
              <Image
                alt="User image"
                src={`https://robohash.org/${post.id}`}
                width={150}
                height={150}
                className="border max-h-[70px] max-w-[70px] sm:max-h-[150px] sm:max-w-[150px]"
              />
              <h2 className="text-lg font-bold overflow-hidden line-clamp-3 ellipsis">
                {post.user.fullName}
              </h2>
            </div>
            <div className="flex justify-start items-center sm:gap-4 gap-0 w-100">
              <div className="min-w-[0px] sm:min-w-[150px]"></div>
              <div>
                <p className="text-gray-600  overflow-hidden line-clamp-3">
                  {post.body} {` `}
                  {post.body} {` `}
                  {post.body} {` `}
                  {post.body} {` `}
                  {post.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
