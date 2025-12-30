import { useState, useRef, useCallback, MutableRefObject } from "react";

export function useStateWithRef<T>(
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, MutableRefObject<T>] {
  const [state, _setState] = useState<T>(initialValue);
  const stateRef = useRef<T>(initialValue);

  const setState = useCallback((value: T | ((prev: T) => T)) => {
    if (typeof value === "function") {
      _setState((prev) => {
        const newValue = (value as (prev: T) => T)(prev);
        stateRef.current = newValue;
        return newValue;
      });
    } else {
      stateRef.current = value;
      _setState(value);
    }
  }, []);

  return [state, setState, stateRef];
}

// NOTE: useMultiStateWithRef was removed because calling hooks inside loops
// violates React's rules of hooks. If you need multiple states with refs,
// call useStateWithRef separately for each state variable.

export function useBooleanStateWithRef(
  initialValue: boolean,
): [
  boolean,
  (value: boolean | ((prev: boolean) => boolean)) => void,
  MutableRefObject<boolean>,
  () => void,
] {
  const [state, setState, stateRef] = useStateWithRef(initialValue);

  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, [setState]);

  return [state, setState, stateRef, toggle];
}
