"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { fallbackLng } from "./i18n/settings";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${fallbackLng}`);
  }, [router]);

  return null;
}
