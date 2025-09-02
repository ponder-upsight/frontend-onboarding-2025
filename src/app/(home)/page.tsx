import getPrefetchHydrateProductList from "@/api/products/server/getPrefetchHydrateProductList";
import ProductContent from "./_ui/ProductContent";
import { HydrationBoundary } from "@tanstack/react-query";

export const metadata = {
  title: "상품 목록페이지",
  description: "상품 목록페이지입니다.",
};

const HomePage = async () => {
  const dehydratedState = await getPrefetchHydrateProductList();
  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductContent />
    </HydrationBoundary>
  );
};
export default HomePage;

export const revalidate = 3600;
