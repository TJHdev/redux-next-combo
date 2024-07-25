export const PostList = ({ posts }) => {
    return (
      <div className="max-w-lg mx-auto p-4 mb-6">
        <h1 className="text-3xl font-bold mb-2">Recent Posts</h1>
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded shadow-md mb-4">
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.description}</p>
            <a
              href={`/posts/${post.slug}`}
              className="text-blue-500 hover:text-blue-700"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    );
  };