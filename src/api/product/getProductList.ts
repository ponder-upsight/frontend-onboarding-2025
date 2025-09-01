const getProductList = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return dummyProducts;
};

export const dummyProducts = [
  {
    id: "product-001",
    name: "무선 블루투스 헤드폰",
    description:
      "고음질 무선 블루투스 헤드폰입니다. 노이즈 캔슬링 기능과 장시간 배터리 사용이 가능합니다.",
    stock: 25,
    createdAt: "2024-01-15",
    imageUrl: "https://picsum.photos/id/1082/400/300",
  },
  {
    id: "product-002",
    name: "스마트 워치",
    description:
      "건강 관리와 편의성을 제공하는 최신 스마트 워치입니다. 다양한 운동 모드와 심박수 측정 기능이 탑재되어 있습니다.",
    stock: 12,
    createdAt: "2024-01-10",
    imageUrl: "https://picsum.photos/id/180/400/300",
  },
  {
    id: "product-003",
    name: "노트북 거치대",
    description:
      "인체공학적 설계로 목과 어깨 부담을 줄여주는 노트북 거치대입니다. 각도 조절이 가능하여 최적의 시야를 제공합니다.",
    stock: 0,
    createdAt: "2024-01-05",
    imageUrl: "https://picsum.photos/id/26/400/300",
  },
  {
    id: "product-004",
    name: "기계식 키보드",
    description:
      "타건감이 뛰어난 청축 기계식 키보드입니다. 화려한 RGB 백라이트와 커스텀 키캡을 지원합니다.",
    stock: 38,
    createdAt: "2023-12-28",
    imageUrl: "https://picsum.photos/id/593/400/300",
  },
  {
    id: "product-005",
    name: "웹캠 (Full HD)",
    description:
      "선명한 화질을 자랑하는 Full HD 웹캠입니다. 내장 마이크가 포함되어 있어 화상 회의나 온라인 강의에 적합합니다.",
    stock: 5,
    createdAt: "2023-12-22",
    imageUrl: "https://picsum.photos/id/48/400/300",
  },
  {
    id: "product-006",
    name: "휴대용 보조 배터리",
    description:
      "20,000mAh 대용량 보조 배터리로, 스마트폰과 태블릿을 동시에 충전할 수 있습니다. C타입 PD 충전을 지원합니다.",
    stock: 150,
    createdAt: "2023-12-15",
    imageUrl: "https://picsum.photos/id/59/400/300",
  },
];

export default getProductList;
