import {
  fetchPosts,
  setSinglePost,
  resetNewHighlighted,
} from "@/reducer/postsSlice";
import { useEffect } from "react";
import { PostListItem } from "./PostListItem";
import { PostSingleItem } from "./PostSingleItem";
import { useElementOnScreen } from "@/hooks/useElementOnScreen";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { configureStore } from "@reduxjs/toolkit";
import { type Post } from "@/service/posts";
import postsReducer from "@/reducer/postsSlice";
import { Provider, useDispatch, useSelector } from "react-redux";

export const _PostList = () => {
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
    return (
      <div className="container mx-auto flex gap-5 max-w-xl px-4">
        <div>Error: {error}</div>
      </div>
    );
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

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const PostList = () => {
  return (
    <Provider store={store}>
      <_PostList />
    </Provider>
  );
};
