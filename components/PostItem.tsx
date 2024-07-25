interface Post {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

const PostItem = ({ post }: { post: Post }) => {
  return (
    <div key={post.id} className="max-w-sm rounded-lg shadow-md">
      <img
        src={"https://xyz.com"}
        alt="Post Image"
        className="w-full h-48 object-cover"
      />
      <div className="p-4 text-gray-700">
        <p className="text-lg font-bold">{post.body}</p>
      </div>
    </div>
  );
};
