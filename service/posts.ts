export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}
export interface PostResponse {
  posts: Post[];
  limit: number;
  skip: number;
  total: number;
}

const getPosts = async ({
  limit,
  skip,
}: {
  limit: number;
  skip: number;
}): Promise<{ ok: boolean; json: () => Promise<PostResponse> }> => {
  return await fetch(
    `https://dummyjson.com/posts?limit=${limit}&skip=${skip}&sortBy=id&order=desc&delay=1000`
  );
};

export const postsApi = { getPosts };
