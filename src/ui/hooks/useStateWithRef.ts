import { useState, useRef, useCallback, MutableRefObject } from 'react';

export function useStateWithRef<T>(
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, MutableRefObject<T>] {
  const [state, _setState] = useState<T>(initialValue);
  const stateRef = useRef<T>(initialValue);

  const setState = useCallback((value: T | ((prev: T) => T)) => {
    if (typeof value === 'function') {
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

export function useMultiStateWithRef<T extends Record<string, any>>(
  initialStates: T
): any {
  const result: any = {};

  Object.keys(initialStates).forEach((key) => {
    const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
    const [state, setState, stateRef] = useStateWithRef(initialStates[key]);

    result[key] = state;
    result[`set${capitalizedKey}`] = setState;
    result[`${key}Ref`] = stateRef;
  });

  return result;
}

export function useBooleanStateWithRef(
  initialValue: boolean
): [
  boolean,
  (value: boolean | ((prev: boolean) => boolean)) => void,
  MutableRefObject<boolean>,
  () => void
] {
  const [state, setState, stateRef] = useStateWithRef(initialValue);

  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, [setState]);

  return [state, setState, stateRef, toggle];
}
