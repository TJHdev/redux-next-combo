import { describe, test, expect, vi } from "vitest";
import postsReducer, {
  fetchPosts,
  setSinglePost,
  resetNewHighlighted,
  PostsState,
} from "@/reducer/postsSlice";
import { type Post } from "@/service/posts";
import { configureStore } from "@reduxjs/toolkit";

const initialState: PostsState = {
  singlePost: undefined,
  previousScrollPosition: 0,
  newHighlighted: {},
  numberOfRequests: 0,
  items: [],
  total: undefined,
  lastSkip: undefined,
  status: "idle",
  error: null,
};

test("should handle initial state", () => {
  expect(postsReducer(undefined, { type: "unknown" })).toEqual(initialState);
});

test("should handle setSinglePost", () => {
  const samplePost: Post = {
    id: 1,
    title: "Test Post",
    body: "This is a test post",
    tags: ["test"],
    reactions: { likes: 0, dislikes: 0 },
    views: 0,
    userId: 1,
  };
  const actual = postsReducer(
    initialState,
    setSinglePost({ post: samplePost, previousScrollPosition: 0 })
  );
  expect(actual.singlePost).toEqual(samplePost);
  expect(actual.newHighlighted).toEqual({});
});

test("should handle resetNewHighlighted", () => {
  const stateWithHighlighted: PostsState = {
    ...initialState,
    newHighlighted: { "1": true, "2": true },
  };
  const actual = postsReducer(
    stateWithHighlighted,
    resetNewHighlighted({ "1": true, "2": true })
  );
  expect(actual.newHighlighted).toEqual({});
});

test("should not reset newHighlighted if keys are different", () => {
  const stateWithHighlighted: PostsState = {
    ...initialState,
    newHighlighted: { "1": true, "2": true },
  };
  const actual = postsReducer(
    stateWithHighlighted,
    resetNewHighlighted({ "1": true, "3": true })
  );
  expect(actual.newHighlighted).toEqual({ "1": true, "2": true });
});

describe("fetchPosts", () => {
  test("should handle fetchPosts.pending", () => {
    const action = {
      type: fetchPosts.pending.type,
      meta: { arg: "initial" },
    };
    const state = postsReducer(initialState, action);
    expect(state.status).toBe("loading");
    expect(state.numberOfRequests).toBe(1);
  });

  test("should handle fetchPosts.fulfilled for initial load", () => {
    const payload = {
      posts: [
        {
          id: 1,
          title: "Test",
          body: "Test body",
          tags: [],
          reactions: { likes: 0, dislikes: 0 },
          views: 0,
          userId: 1,
        },
      ],
      limit: 20,
      skip: 0,
      total: 1,
    };
    const action = {
      type: fetchPosts.fulfilled.type,
      payload,
      meta: { arg: "initial" },
    };
    const state = postsReducer(initialState, action);
    expect(state.status).toBe("succeeded");
    expect(state.items).toEqual(payload.posts);
    expect(state.total).toBe(payload.total);
    expect(state.lastSkip).toBe(payload.limit);
  });

  test("should handle fetchPosts.rejected", () => {
    const action = {
      type: fetchPosts.rejected.type,
      error: { message: "Failed to fetch" },
    };
    const state = postsReducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Something went wrong");
  });
});

// Test async thunk
test("creates fulfilled action when fetching posts succeeds", async () => {
  const mockPosts = [
    {
      id: 1,
      title: "Test",
      body: "Test body",
      tags: [],
      reactions: { likes: 0, dislikes: 0 },
      views: 0,
      userId: 1,
    },
  ];
  const mockResponse = { posts: mockPosts, limit: 20, skip: 0, total: 1 };

  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockResponse),
  });

  const store = configureStore({ reducer: { posts: postsReducer } });
  await store.dispatch(fetchPosts("initial"));

  const state = store.getState().posts;
  expect(state.status).toBe("succeeded");
  expect(state.items).toEqual(mockPosts);
});
