"use client";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

interface RouterBackButtonProps {
  url?: string;
  defaultParam?: string;
  text?: string;
}

const RouterBackButton = ({
  url,
  defaultParam,
  text,
}: RouterBackButtonProps) => {
  const searchParams = useSearchParams();
  const routerParam = searchParams.get("router");
  const router = useRouter();

  if (!url && !defaultParam && !routerParam) {
    return (
      <Button variant="toggle" size="md" onClick={() => router.back()}>
        {text || "뒤로가기"}
      </Button>
    );
  }

  return (
    <Link
      href={routerParam ? `${url}/${routerParam}` : `${url}/${defaultParam}`}>
      <Button variant="toggle" size="md">
        {text || "뒤로가기"}
      </Button>
    </Link>
  );
};

export default RouterBackButton;
