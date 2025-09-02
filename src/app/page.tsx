import { redirect } from "next/navigation";

export const metadata = {
  title: "상품 목록페이지",
  description: "상품 목록페이지입니다.",
};

const Page = () => {
  redirect("/1");
};
export default Page;
