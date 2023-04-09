import { useCallback, useRef } from "react";

const useInfiniteScroll = (loading: boolean, lastItem: unknown, callback: () => void) => {
  const intObserver = useRef<IntersectionObserver | null>();
  return useCallback(
    (node: HTMLLIElement) => {
      if (loading) {
        return;
      }
      if (intObserver.current) {
        intObserver.current.disconnect();
      }
      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && lastItem) {
          callback();
        }
      });
      if (node) {
        intObserver.current.observe(node);
      }
    },
    [loading, lastItem]
  );
};

export default useInfiniteScroll;
