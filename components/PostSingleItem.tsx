import { Post } from "@/reducer/postsSlice";
import Image from "next/image";

export const PostSingleItem = ({
  post,
  setPost,
}: {
  post: Post;
  setPost: (post?: Post) => void;
}) => {
  return (
    <div className="max-w-xl mx-auto mb-6 px-4 w-full">
      <div
        key={post.id}
        className="relative bg-gray-200 p-4 rounded shadow-md mb-4 gap-4 border-2 border-gray-400 px-4"
      >
        <div
          onClick={() => setPost(undefined)}
          className="cursor-pointer absolute top-2 left-2 text-orange-500 text-[30px] leading-tight w-[40px] px-2"
        >{`<`}</div>

        <div className="flex flex-col justify-center items-center gap-4 w-100 ">
          <Image
            alt="User image"
            src={`https://robohash.org/${post.userId}`}
            width={150}
            height={150}
            className="border max-h-[70px] max-w-[70px] sm:max-h-[150px] sm:max-w-[150px]"
          />
          <h2 className="text-lg font-bold overflow-hidden line-clamp-3 ellipsis">
            {post.id}
          </h2>
          <div>
            <p className="text-gray-600">{post.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
