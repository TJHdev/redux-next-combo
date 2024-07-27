import {
  fetchPosts,
  setSinglePost,
  resetNewHighlighted,
  type Post,
} from "@/reducer/postsSlice";
import { useEffect } from "react";
import { PostListItem } from "./PostListItem";
import { PostSingleItem } from "./PostSingleItem";
import { useElementOnScreen } from "@/hooks/useElementOnScreen";
import { LoadingSpinner } from "@/components/LoadingSpinner";

// make this call initially
// https://dummyjson.com/comments?limit=10&sortBy=id&order=desc
// make this call as a follow up for adding to the top
// https://dummyjson.com/comments?limit=10&skip=250&sortBy=id&order=asc

import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "@/reducer/postsSlice";
import { Provider, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const _PostList = () => {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  const dispatch = useDispatch<AppDispatch>();

  const {
    singlePost,
    items: posts,
    status,
    error,
    total,
    newHighlighted,
  } = useSelector((state: RootState) => state.posts);

  const canFetchMore = !!posts.length && posts.length !== total;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts("initial"));
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (isVisible) {
      dispatch(fetchPosts("nextPage"));
    }
  }, [dispatch, isVisible]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(resetNewHighlighted(newHighlighted));
    }, 5000);
  }, [newHighlighted]);

  const setPost = (post: Post | undefined) => {
    dispatch(setSinglePost(post));
  };

  if (status === "loading") {
    return (
      <div className="absolute left-0 top-0 h-full w-full flex justify-center items-center h-screen mx-auto">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (singlePost) {
    return <PostSingleItem post={singlePost} setPost={setPost} />;
  }

  return (
    <div className="max-w-xl mx-auto mb-6 px-4 w-full">
      <h1 className="text-3xl font-bold mb-2">Recent Posts</h1>
      <div className="gap-2">
        {posts.map((post) => (
          <PostListItem
            key={post.id}
            highlighted={newHighlighted[post.id]}
            post={post}
            setPost={setPost}
          />
        ))}
        {canFetchMore && (
          <div
            ref={containerRef}
            className="flex justify-center items-center min-h-32"
          >
            {status === "fetching" ? <LoadingSpinner /> : <div />}
          </div>
        )}
      </div>
      <button
        onClick={() => {
          dispatch(fetchPosts("new"));
        }}
        aria-label="add new post"
        className="fixed bottom-2 right-2 px-4 py-2 rounded-full text-white bg-orange-500 hover:bg-orange-800 leading-xs pb-[10px]"
      >
        +
      </button>
    </div>
  );
};

export const PostList = () => {
  return (
    <Provider store={store}>
      <_PostList />
    </Provider>
  );
};

// export const getInitialProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     await store.dispatch(fetchPosts());
//     return { props: {} };
//   }
// );

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
