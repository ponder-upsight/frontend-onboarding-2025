import getProduct from "@/api/product/getProduct";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@chakra-ui/react";

// ISR 캐시 재검증 주기를 3600초(1시간)로 설정
export const revalidate = 3600;

interface PageProps {
  params?: Promise<{ id: string }>; // params가 Promise임을 명시
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = (await params) || { id: "" };

  const { product } = await getProduct(resolvedParams.id);
  return {
    title: product?.name || "상품 상세",
    description: product?.description || "상품 상세 페이지입니다.",
  };
}

const ProductDetailPage = async ({ params }: PageProps) => {
  const resolvedParams = (await params) || { id: "" };
  const { product } = await getProduct(resolvedParams.id);

  // 상품 데이터가 없을 경우 404 페이지를 보여줍니다.
  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto p-8 bg-white">
      {/* 뒤로가기 버튼 */}
      <div className="mb-10">
        <Link
          href="/"
          className="text-gray-600 hover:text-black transition-colors">
          <Button aria-selected={false}>&larr; 목록으로 돌아가기</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 왼쪽: 이미지 영역 */}
        <div>
          <div className="border rounded-lg overflow-hidden mb-4">
            <Image
              src={product.thumbUrl}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-auto object-cover"
              priority // LCP(최대 콘텐츠풀 페인트) 이미지는 priority를 설정해 우선 로드합니다.
            />
          </div>
          <div className="flex gap-4">
            {product.imageUrls.map((url, index) => (
              <div
                key={index}
                className="border rounded-md overflow-hidden w-24 h-24">
                <Image
                  src={url}
                  alt={`${product.name} 상세 이미지 ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽: 상품 정보 영역 */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-4">{product.createdAt}</p>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              상품 설명
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              재고 정보
            </h2>
            <div className="inline-block bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-full">
              재고 {product.stock}개
            </div>
          </div>

          {/* 주문 버튼 */}
          <div className="flex gap-3 mt-auto pt-6 border-t">
            <button className="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              주문하기
            </button>
            <button className="flex-1 bg-white text-gray-800 font-bold py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors">
              장바구니
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
