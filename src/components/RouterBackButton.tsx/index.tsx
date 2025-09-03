"use client";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RouterBackButtonProps {
  url?: string;
  text?: string;
}

const RouterBackButton = ({ url, text }: RouterBackButtonProps) => {
  const router = useRouter();

  if (!url) {
    return (
      <Button variant="toggle" size="md" onClick={() => router.back()}>
        {text || "뒤로가기"}
      </Button>
    );
  }

  return (
    <Link href={`${url}`}>
      <Button variant="toggle" size="md">
        {text || "뒤로가기"}
      </Button>
    </Link>
  );
};

export default RouterBackButton;
