import { RootState } from "@/components/Posts/PostList";
import { haveSameKeys } from "@/helpers/haveSameKeys";
import { type Post, type PostResponse, postsApi } from "@/service/posts";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface PostsState {
  newHighlighted: Record<string, true>;
  numberOfRequests: number;
  singlePost: Post | undefined;
  items: Post[];
  total: number | undefined;
  lastSkip: number | undefined;
  status: "idle" | "loading" | "fetching" | "succeeded" | "failed";
  error: string | null;
}

type ReqType = "initial" | "nextPage" | "new";

export const getFetchPosts = () =>
  createAsyncThunk<PostResponse, ReqType, { rejectValue: string }>(
    "posts/fetchPosts",
    async (type, { rejectWithValue, getState }) => {
      const state = getState() as RootState;
      const { posts } = state;

      let limit = 20;
      let skip = 0;

      // the "new" action type is to simulate an websocket connection passing in new posts in the interests of brevity.
      if (type === "new") {
        limit = 1;
        skip = Math.floor(Math.random() * (posts.total ?? 0)) + 1;
      }

      if (type === "nextPage") {
        skip = posts.lastSkip ?? 0 + 20;
      }

      try {
        const response = await postsApi.getPosts({ limit, skip });

        const state = getState() as RootState;

        if (!response.ok) {
          throw new Error("Server error");
        }
        let data = await response.json();
        // mock incrementing IDs for new posts added to top
        if (type === "new") {
          const mockIdPosts = data.posts.map((post, index) => {
            return { ...post, id: (state.posts.items[0].id ?? 0) + index + 1 };
          });

          data = { ...data, posts: mockIdPosts };
        }
        return data;
      } catch (error) {
        return rejectWithValue("Failed to fetch posts.");
      }
    }
  );

export const fetchPosts = getFetchPosts();

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

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSinglePost: (state, action: PayloadAction<Post | undefined>) => {
      state.singlePost = action.payload;
      state.newHighlighted = {};
    },
    resetNewHighlighted: (
      state,
      action: PayloadAction<Record<string, true>>
    ) => {
      if (haveSameKeys(state.newHighlighted, action.payload)) {
        state.newHighlighted = {};
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        const type = action.meta.arg;

        if (type === "initial") {
          state.status = "loading";
        } else if (type === "nextPage") {
          // allows positioning of loading spinner at bottom of page for infinite scroll
          state.status = "fetching";
        }
        state.numberOfRequests++;
      })
      .addCase(
        fetchPosts.fulfilled,
        (
          state,
          action: PayloadAction<
            PostResponse,
            string,
            {
              arg: ReqType;
              requestId: string;
              requestStatus: "fulfilled";
            }
          >
        ) => {
          const { limit, skip, posts, total } = action.payload;
          const type = action.meta.arg;

          if (type === "new") {
            state.items = [...posts, ...state.items];
            const newHighlighted = posts.reduce<Record<string, true>>(
              (acc, current) => {
                acc[current.id] = true;
                return acc;
              },
              {}
            );
            state.newHighlighted = newHighlighted;
          }
          if (type === "initial") {
            state.items = posts;
          } else if (type === "nextPage") {
            state.items = [...state.items, ...posts];
          }
          if (type !== "new") {
            state.lastSkip = skip + limit;
          }
          state.status = "succeeded";
          state.total = total;
        }
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { setSinglePost, resetNewHighlighted } = postsSlice.actions;
export default postsSlice.reducer;
