import localFont from "next/font/local";

export const Pretendard = localFont({
  src: "/fonts/Pretendard-Medium.woff2",
  variable: "--font-pretendard",
  display: "swap", // 폰트 로딩 중에도 텍스트를 표시
  preload: true, // 폰트를 미리 로드
});
