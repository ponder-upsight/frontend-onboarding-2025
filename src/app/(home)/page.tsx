import getPrefetchHydrateProductList from "@/api/products/server/getPrefetchHydrateProductList";
import ProductContent from "./_ui/ProductContent";
import { HydrationBoundary } from "@tanstack/react-query";

export const metadata = {
  title: "상품 목록페이지",
  description: "상품 목록페이지입니다.",
};

export async function generateStaticParams() {
  // 빌드 시점에 /1 경로의 페이지만 미리 생성하도록 지정합니다.
  return [{ page: "1" }];
}

const HomePage = async () => {
  const dehydratedState = await getPrefetchHydrateProductList(1);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductContent />
    </HydrationBoundary>
  );
};
export default HomePage;

export const revalidate = 3600;
