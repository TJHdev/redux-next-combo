import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import postsReducer, { PostsState } from "@/reducer/postsSlice";
import { expect, vi, beforeEach, afterEach, test } from "vitest";
import { postsApi } from "@/service/posts";

import { _PostList as PostList } from "@/components/Posts/PostList";
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

afterEach(() => {
  document.body.innerHTML = "";
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

test('dispatches fetchPosts with "nextPage" when bottom is visible', async () => {
  const mockedGetPosts = vi.spyOn(postsApi, "getPosts");

  const mockPosts1 = [
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

  const mockPosts2 = [
    {
      id: 3,
      title: "Post 3",
      body: "Body 3",
      tags: [],
      reactions: { likes: 0, dislikes: 0 },
      views: 0,
      userId: 3,
    },
    {
      id: 4,
      title: "Post 4",
      body: "Body 4",
      tags: [],
      reactions: { likes: 0, dislikes: 0 },
      views: 0,
      userId: 2,
    },
  ];

  const mockResponse1 = { posts: mockPosts1, limit: 20, skip: 0, total: 1 };
  const mockResponse2 = { posts: mockPosts2, limit: 20, skip: 0, total: 1 };

  mockedGetPosts
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse1),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse2),
    });

  renderPostList();

  mockUseElementOnScreen.mockReturnValue([{ current: null }, true]);

  await waitFor(() => {
    expect(mockedGetPosts).toBeCalledTimes(1);
  });

  await waitFor(() => {
    expect(mockedGetPosts).toBeCalledTimes(2);
  });

  expect(await screen.findByText("Body 1")).toBeInTheDocument();
  expect(await screen.findByText("Body 2")).toBeInTheDocument();
  expect(await screen.findByText("Body 3")).toBeInTheDocument();
  expect(await screen.findByText("Body 4")).toBeInTheDocument();
});

test('dispatches fetchPosts with "new" when add new post button is clicked', async () => {
  const mockedGetPosts = vi.spyOn(postsApi, "getPosts");

  const mockPosts1 = [
    {
      id: 2,
      title: "Post 2",
      body: "Body 2",
      tags: [],
      reactions: { likes: 0, dislikes: 0 },
      views: 0,
      userId: 2,
    },
    {
      id: 1,
      title: "Post 1",
      body: "Body 1",
      tags: [],
      reactions: { likes: 0, dislikes: 0 },
      views: 0,
      userId: 1,
    },
  ];

  const mockPosts2 = [
    {
      id: 3,
      title: "Post 3",
      body: "Body 3",
      tags: [],
      reactions: { likes: 0, dislikes: 0 },
      views: 0,
      userId: 3,
    },
  ];

  const mockResponse1 = { posts: mockPosts1, limit: 20, skip: 2, total: 2 };
  const mockResponse2 = { posts: mockPosts2, limit: 20, skip: 2, total: 3 };

  mockedGetPosts
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse1),
    })
    .mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse2),
    });

  renderPostList();

  expect(mockedGetPosts).toHaveBeenCalledTimes(1);
  expect(await screen.findByText("Body 2")).toBeInTheDocument();
  expect(await screen.findByText("Body 1")).toBeInTheDocument();
  expect(await screen.queryByText("Body 3")).not.toBeInTheDocument();

  await waitFor(() => {
    fireEvent.click(screen.getByLabelText("add new post"));
  });

  expect(mockedGetPosts).toHaveBeenCalledTimes(2);

  expect(await screen.findByText("Body 3")).toBeInTheDocument();
});
