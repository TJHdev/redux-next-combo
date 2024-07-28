import Image from "next/image";
import { type Post } from "@/service/posts";
import { twMerge } from "tailwind-merge";

export const PostListItem = ({
  post,
  setPost,
  highlighted,
}: {
  post: Post;
  setPost: (post?: Post) => void;
  highlighted: boolean;
}) => {
  return (
    <div
      onClick={() => setPost(post)}
      className={twMerge(
        "flex flex-wrap row bg-gray-200 p-4 rounded shadow-md mb-4 gap-4 border-2 border-gray-400 hover:transition-all hover:border-orange-500 cursor-pointer",
        highlighted
          ? "animate-[highlight_3s_ease-in-out] animation-iteration-count-1"
          : ""
      )}
    >
      <div className="flex justify-start items-center gap-4 w-100 ">
        <Image
          alt="User-image"
          src={`https://robohash.org/${post.userId}`}
          width={150}
          height={150}
          className="border max-h-[70px] max-w-[70px] sm:max-h-[150px] sm:max-w-[150px]"
        />
        <h2 className="text-lg font-bold overflow-hidden line-clamp-3 ellipsis">
          Robot {post.id}
        </h2>
      </div>
      <div className="flex justify-start items-center sm:gap-4 gap-0 w-100">
        <div className="min-w-[0px] sm:min-w-[150px]"></div>
        <div>
          <p className="text-gray-600  overflow-hidden line-clamp-3">
            {post.body}
          </p>
        </div>
      </div>
    </div>
  );
};
