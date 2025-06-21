import { useCallback, useEffect, useRef, useState } from "react";
import { Live, SubscribeHookReturn } from "live-model";

// Fixed version of useSubscribe

/**
 * @param live source of values
 * @param transform function that transforms the value from source to destination
 * @param setter use setter.noop (=== undefined), setter.passthrough(), setter.transform(_) or setter.handler(_).
 * NOTE: Updating this parameter will not update the setter for the derived value. If you need that, please create a GitHub issue.
 */
export function useSubscribe<T>(live: Live<T>): SubscribeHookReturn<T> {
  const [value, setV] = useState(live.get());
  const firstRef = useRef(true);

  useEffect(() => {
    const sub = live.subscribe({
      next(v) {
        // Skips first value since we used live.get() to get it.
        if (firstRef.current) {
          firstRef.current = false;
          return;
        }

        // Future values are set to state
        setV(v);
      },
    });
    return () => {
      sub.unsubscribe();
    };
  }, [live]);

  const setValue = useCallback((v: T) => live.setValue(v), [live]);

  return {
    value,
    setValue,
  };
}
