import useGetPrefetchProductList from "@/api/products/useGetPrefetchProductList";
import { useEffect, useRef } from "react";

interface UsePrefetchObserveProps {
  nextPage: number;
  totalPageCount: number;
}

const usePrefetchObserve = ({
  nextPage,
  totalPageCount,
}: UsePrefetchObserveProps) => {
  // prefetch
  const { handlePrefetchNextPage } = useGetPrefetchProductList({
    nextPage,
    totalPageCount,
  });
  // 증복 실행 방지
  const isPrefetchingRef = useRef<boolean>(false);
  // 관찰할 요소 ref
  const observeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observeRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isPrefetchingRef.current) {
          isPrefetchingRef.current = true;
          handlePrefetchNextPage();
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );

    observer.observe(observeRef.current);

    return () => {
      if (observeRef.current) observer.unobserve(observeRef.current);
    };
  }, [handlePrefetchNextPage]);
  return { observeRef };
};

export default usePrefetchObserve;
