import React from "react";
import { render, screen } from "@testing-library/react";
import postsReducer, { PostsState } from "@/reducer/postsSlice";
import { expect, vi, beforeEach, afterEach, test } from "vitest";
import { postsApi } from "@/service/posts";

import { _PostList as PostList } from "@/components/PostList";
import * as hooks from "@/hooks/useElementOnScreen";
import { delayedResponse } from "@/helpers/testHelpers";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

vi.mock("@/hooks/useElementOnScreen");
const mockedGetPosts = vi.spyOn(postsApi, "getPosts");
const mockUseElementOnScreen = vi.spyOn(hooks, "useElementOnScreen");

beforeEach(() => {
  vi.resetAllMocks();
  vi.resetModules();
  mockUseElementOnScreen.mockReturnValue([{ current: null }, false]);
});

const renderPostList = () => {
  const initialState: PostsState = {
    newHighlighted: {},
    numberOfRequests: 0,
    singlePost: undefined,
    items: [],
    total: undefined,
    lastSkip: undefined,
    status: "idle",
    error: null,
  };

  const store = configureStore({
    reducer: {
      posts: postsReducer,
    },
    preloadedState: { posts: initialState },
  });

  render(
    <Provider store={store}>
      <PostList />
    </Provider>
  );
};

test("renders loading spinner when status is loading", async () => {
  mockedGetPosts.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(delayedResponse as any),
  });

  renderPostList();
  expect(await screen.findByRole("progressbar")).toBeInTheDocument();
});

test("renders error message when status is failed", async () => {
  mockedGetPosts.mockRejectedValue(undefined);

  renderPostList();
  expect(
    await screen.findByText("Error: Failed to fetch posts.")
  ).toBeInTheDocument();
});

test("renders PostSingleItem when singlePost is present", async () => {
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

  mockedGetPosts.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockResponse),
  });

  renderPostList();

  expect(await screen.findByText("Test body")).toBeInTheDocument();
});

test("renders list of posts when posts are available", async () => {
  const mockPosts = [
    {
      id: 1,
      title: "Post 1",
      body: "Body 1",
      tags: [],
      reactions: { likes: 0, dislikes: 0 },
      views: 0,
      userId: 1,
    },
    {
      id: 2,
      title: "Post 2",
      body: "Body 2",
      tags: [],
      reactions: { likes: 0, dislikes: 0 },
      views: 0,
      userId: 2,
    },
  ];

  const mockResponse = { posts: mockPosts, limit: 20, skip: 0, total: 1 };

  mockedGetPosts.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockResponse),
  });

  renderPostList();

  expect(await screen.findByText("Body 1")).toBeInTheDocument();
  expect(await screen.findByText("Body 2")).toBeInTheDocument();
});
