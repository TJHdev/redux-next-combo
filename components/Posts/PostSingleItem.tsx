import { type Post } from "@/service/posts";
import Image from "next/image";

export const PostSingleItem = ({
  post,
  setPost,
}: {
  post: Post;
  setPost: (arg: { post?: Post; previousScrollPosition?: number }) => void;
}) => {
  return (
    <div className="max-w-xl mx-auto mb-6 px-4 w-full">
      <div className="relative bg-gray-800 p-4 rounded shadow-md mb-4 gap-4 border-2 border-gray-600 px-4">
        <button
          aria-label="back"
          onClick={() => setPost({ post: undefined })}
          className="cursor-pointer absolute top-2 left-2 text-orange-500 text-[30px] leading-tight w-[40px] px-2"
        >{`<`}</button>

        <div className="flex flex-col justify-center items-center gap-4 w-100 text-gray-300">
          <Image
            alt="User image"
            src={`https://robohash.org/${post.userId}`}
            width={150}
            height={150}
            className="border border-gray-600 max-h-[70px] max-w-[70px] sm:max-h-[150px] sm:max-w-[150px]"
          />
          <h2 className="text-lg font-bold overflow-hidden line-clamp-3 ellipsis">
            Robot {post.id}
          </h2>
          <div>
            <p className="text-gray-300">{post.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
