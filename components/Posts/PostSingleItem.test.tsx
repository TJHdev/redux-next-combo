import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PostSingleItem } from "./PostSingleItem";
import type { Post } from "@/service/posts";

const mockPost: Post = {
  id: 1,
  userId: 123,
  body: "This is a test post body",
  title: "Test Post",
  reactions: {
    dislikes: 0,
    likes: 0,
  },
  tags: [],
  views: 0,
};

const mockSetPost = vi.fn();

test("renders the component with correct content", () => {
  render(<PostSingleItem post={mockPost} />);

  expect(screen.getByText(`Robot ${mockPost.id}`)).toBeInTheDocument();
  expect(screen.getByText(mockPost.body)).toBeInTheDocument();
});
