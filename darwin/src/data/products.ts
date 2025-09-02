export interface Product {
  id: string;
  name: string;
  description: string;
  stock: number;
  createdAt: string;
  imageUrl: string;
  detailImageUrls: string[];
}

export const productDatas: Product[] = [
  {
    id: "1",
    name: "무선 블루투스 헤드폰",
    description: "고음질 무선 블루투스 헤드폰입니다. 노이즈 캔슬링 기능과 장시간 배터리 사용이 가능합니다.",
    stock: 25,
    createdAt: "2025-09-01",
    imageUrl: "https://www.costco.co.kr/medias/sys_master/images/hf7/hf5/204372037304350.jpg",
    detailImageUrls: [
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTIXisd40IHoVM3gf5GBkKCr51_-tHfBZ95IiLSZlKc8z0C6oVulSeBoYAjeQm15DIWUQRg4BgioR7YrKvfgOAidaP2GYChHqTBvme_KVQviI8DbYpxMTYMTCiSeTIasOCGSL5fmS0&usqp=CAc",
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQvqkCjaCDMF5vlNmP0ChxxvwQIBnaq5ct_c5xShehw_3xfZvGSIXLUP51jX6sYHjDnkdJ2RdTmChBp3NgZrn8x60zmvID3TbnoudldjuBYVUCCcnCv5gjSmGlmGpD2J0ilFPln5lE&usqp=CAc",
    ],
  },
  {
    id: "2", 
    name: "스마트 워치",
    description: "건강 관리와 편의성을 제공하는 최신 스마트 워치입니다. 다양한 운동 모드와 실시간 모니터링 기능이 있습니다.",
    stock: 12,
    createdAt: "2025-09-02",
    imageUrl: "https://www.costco.co.kr/medias/sys_master/images/hf7/hf5/204372037304350.jpg",
    detailImageUrls: [
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTIXisd40IHoVM3gf5GBkKCr51_-tHfBZ95IiLSZlKc8z0C6oVulSeBoYAjeQm15DIWUQRg4BgioR7YrKvfgOAidaP2GYChHqTBvme_KVQviI8DbYpxMTYMTCiSeTIasOCGSL5fmS0&usqp=CAc",
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQvqkCjaCDMF5vlNmP0ChxxvwQIBnaq5ct_c5xShehw_3xfZvGSIXLUP51jX6sYHjDnkdJ2RdTmChBp3NgZrn8x60zmvID3TbnoudldjuBYVUCCcnCv5gjSmGlmGpD2J0ilFPln5lE&usqp=CAc",
    ],
  },
  {
    id: "3",
    name: "노트북 거치대", 
    description: "인체공학적 설계로 목과 어깨 부담을 줄여주는 노트북 거치대입니다. 각도 조절이 가능합니다.",
    stock: 0,
    createdAt: "2025-09-03",
    imageUrl: "https://www.costco.co.kr/medias/sys_master/images/hf7/hf5/204372037304350.jpg",
    detailImageUrls: [
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTIXisd40IHoVM3gf5GBkKCr51_-tHfBZ95IiLSZlKc8z0C6oVulSeBoYAjeQm15DIWUQRg4BgioR7YrKvfgOAidaP2GYChHqTBvme_KVQviI8DbYpxMTYMTCiSeTIasOCGSL5fmS0&usqp=CAc",
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQvqkCjaCDMF5vlNmP0ChxxvwQIBnaq5ct_c5xShehw_3xfZvGSIXLUP51jX6sYHjDnkdJ2RdTmChBp3NgZrn8x60zmvID3TbnoudldjuBYVUCCcnCv5gjSmGlmGpD2J0ilFPln5lE&usqp=CAc",
    ],
  },
];
