import getPrefetchHydrateProductList from "@/api/product/getPrefetchHydrateProductList";
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
interface PageProps {
  params: Promise<{ page: string }>; // params가 Promise임을 명시
}

const HomePage = async ({ params }: PageProps) => {
  const resolvedParams = await params; // params를 await
  const page = Number(resolvedParams.page || 1);

  const dehydratedState = await getPrefetchHydrateProductList(page);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductContent page={page} />
    </HydrationBoundary>
  );
};
export default HomePage;

export const revalidate = 3600;
