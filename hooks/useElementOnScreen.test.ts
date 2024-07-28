import { renderHook, act } from "@testing-library/react";
import React from "react";
import { useElementOnScreen } from "./useElementOnScreen";
import { beforeEach, vi, test, expect, Mock } from "vitest";

let intersectionObserverMock: {
  observe: Mock;
  unobserve: Mock;
  disconnect: Mock;
};

beforeEach(() => {
  intersectionObserverMock = {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  };

  window.IntersectionObserver = vi.fn(() => intersectionObserverMock) as any;
});

test("should return a ref and initial visibility state", () => {
  const { result } = renderHook(() => useElementOnScreen());
  const [ref, isVisible] = result.current;

  expect(ref).toBeDefined();
  expect(isVisible).toBe(false);
});

test("should update visibility when intersection changes", () => {
  const { result } = renderHook(() => useElementOnScreen());
  const [ref] = result.current;

  act(() => {
    if (ref.current) {
      ref.current = document.createElement("div");
    }
  });

  const [[callback]] = (window.IntersectionObserver as Mock).mock.calls;

  act(() => {
    callback([{ isIntersecting: true }]);
  });

  expect(result.current[1]).toBe(true);

  act(() => {
    callback([{ isIntersecting: false }]);
  });

  expect(result.current[1]).toBe(false);
});

test("should pass options to IntersectionObserver", () => {
  const options = { threshold: 0.5 };
  renderHook(() => useElementOnScreen(options));

  expect(window.IntersectionObserver).toHaveBeenCalledWith(
    expect.any(Function),
    options
  );
});

test("should unobserve on unmount", () => {
  const { result, unmount } = renderHook(() => useElementOnScreen());
  const [ref] = result.current;

  // Simulate the ref being set
  const div = document.createElement("div");
  act(() => {
    ref.current = div;
  });

  // Manually call the effect to ensure the observer is set up
  act(() => {
    const [[callback]] = (window.IntersectionObserver as Mock).mock.calls;
    callback([{ isIntersecting: true }]);
  });

  unmount();

  expect(intersectionObserverMock.unobserve).toHaveBeenCalledWith(div);
});
