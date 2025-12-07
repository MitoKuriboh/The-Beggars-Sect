/**
 * Typewriter Effect Hook
 * Reveals text character by character for immersive storytelling
 */

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTypewriterOptions {
  /** Characters per second (default: 40) */
  speed?: number;
  /** Start typing immediately (default: true) */
  autoStart?: boolean;
  /** Callback when typing completes */
  onComplete?: () => void;
}

interface UseTypewriterReturn {
  /** The currently displayed text */
  displayedText: string;
  /** Whether typing is in progress */
  isTyping: boolean;
  /** Whether typing is complete */
  isComplete: boolean;
  /** Skip to show full text immediately */
  skip: () => void;
  /** Reset and start typing again */
  reset: () => void;
}

export function useTypewriter(
  text: string,
  options: UseTypewriterOptions = {}
): UseTypewriterReturn {
  const { speed = 40, autoStart = true, onComplete } = options;

  const [displayedText, setDisplayedText] = useState(autoStart ? '' : text);
  const [isTyping, setIsTyping] = useState(autoStart);
  const [isComplete, setIsComplete] = useState(!autoStart);

  const indexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const textRef = useRef(text);
  const onCompleteRef = useRef(onComplete);

  // Keep onComplete ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Handle text change - reset typing
  useEffect(() => {
    if (text !== textRef.current) {
      textRef.current = text;
      if (autoStart) {
        indexRef.current = 0;
        setDisplayedText('');
        setIsTyping(true);
        setIsComplete(false);
      } else {
        setDisplayedText(text);
        setIsComplete(true);
      }
    }
  }, [text, autoStart]);

  // Typing effect with batched updates to reduce flickering
  useEffect(() => {
    if (!isTyping || isComplete) return;

    const msPerChar = 1000 / speed;
    let isActive = true; // Race condition guard
    let pendingUpdate = false;

    // Batch state updates by queueing them in microtask queue
    // This reduces the number of re-renders and prevents flickering
    const batchedUpdate = () => {
      if (!pendingUpdate && isActive) {
        pendingUpdate = true;
        // Use setImmediate (Node.js) or setTimeout(0) to batch updates
        setImmediate(() => {
          if (isActive) {
            setDisplayedText(textRef.current.slice(0, indexRef.current));
            pendingUpdate = false;
          }
        });
      }
    };

    intervalRef.current = setInterval(() => {
      const currentText = textRef.current;

      if (indexRef.current < currentText.length) {
        indexRef.current++;
        batchedUpdate();
      } else {
        // Typing complete
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsTyping(false);
        setIsComplete(true);

        // Only call onComplete if effect is still active (not cleaned up)
        // This prevents race condition where callback triggers during cleanup
        if (isActive) {
          // Use setTimeout to defer callback until after state updates complete
          setTimeout(() => {
            if (isActive) {
              onCompleteRef.current?.();
            }
          }, 0);
        }
      }
    }, msPerChar);

    return () => {
      isActive = false; // Mark as inactive to prevent callback during cleanup
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isTyping, isComplete, speed]);

  const skip = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    indexRef.current = textRef.current.length;
    setDisplayedText(textRef.current);
    setIsTyping(false);
    setIsComplete(true);

    // Defer callback to prevent race conditions
    setTimeout(() => {
      onCompleteRef.current?.();
    }, 0);
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    indexRef.current = 0;
    setDisplayedText('');
    setIsTyping(true);
    setIsComplete(false);
  }, []);

  return {
    displayedText,
    isTyping,
    isComplete,
    skip,
    reset,
  };
}
