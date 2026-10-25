// Test 2 of 3: hook state. A hook only runs inside a component, so
// renderHook makes a tiny one whose only job is to call useToggle.
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useToggle from "./useToggle";

describe("useToggle", () => {
  it("starts at the value it is given", () => {
    const { result } = renderHook(() => useToggle(true));

    // result.current is the hook's latest return: [value, toggle].
    expect(result.current[0]).toBe(true);
  });

  it("starts false when no value is given", () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBe(false);
  });

  it("flips the value every time toggle is called", () => {
    const { result } = renderHook(() => useToggle(false));

    // A state change, so it goes inside act(): React finishes the
    // re-render before the next line reads result.current.
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);
  });
});
