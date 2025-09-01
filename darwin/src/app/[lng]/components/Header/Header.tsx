"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import {
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { TypoGraph } from "@/app/components/ui/Typography";
import { Button } from "@/app/components/ui/Button";
import { useEffect } from "react";
import { DropDown } from "@/app/components/ui/Dropdown";
import i18next from "i18next";

const LANGUAGE_ITEMS = [
  { label: "한국어", value: "ko" },
  { label: "English", value: "en" },
];

const Header = () => {
  // global
  const router = useRouter();
  const pathname = usePathname();
  const pathnameArray = pathname.split("/");

  const lng = pathnameArray[1];
  const { t, i18n } = useTranslation(lng);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLngOptionClick = async (value: string) => {
    i18next.changeLanguage(value);
    router.push(window.location.href.replace(`/${lng}`, `/${value}`));
    onClose();
  };

  return (
    <>
      <Flex
        width="100vw"
        justifyContent="space-between"
        alignItems="center"
        bg="#fff"
        position="fixed"
        top="0"
        zIndex="20"
      >
        <Flex
          position="relative"
          fontSize="12px"
          color="gray.900"
          bg="white"
          width="100%"
          minH="64px"
          maxH="128px"
          alignItems="center"
          justifyContent="space-between"
          borderBottom="2px solid #EAECF1"
          pt="16px"
          pb="16px"
          pl="64px"
          pr="64px"
          outline={0}
        >
          <TypoGraph variant="title03">{t("title")}</TypoGraph>
          <Flex
            width="320px"
            justifyContent="space-between"
            alignItems="center"
            gap="8px"
            bg="#fff"
          >
            <Button
              variant="primary"
              w="100px"
              color="white"
              onClick={() => router.push(`/${pathnameArray[1]}`)}
            >
              {t("products")}
            </Button>
            <Button
              variant="primary"
              w="100px"
              color="white"
              onClick={() => router.push(`/${pathnameArray[1]}/register`)}
            >
              {t("productRegistration")}
            </Button>

            <DropDown
              isOpen={isOpen}
              onClose={onClose}
              onOpen={onOpen}
              selectedValue={LANGUAGE_ITEMS.find((item) => item.value === lng)?.value}
              displayText={LANGUAGE_ITEMS.find((item) => item.value === lng)?.label}
              onSelect={handleLngOptionClick}
              matchWidth={false}
              variant="outline"
              w="116px"
            >
              {LANGUAGE_ITEMS.map((item) => (
                <DropDown.Item key={item.value} value={item.value}>
                  {item.label}
                </DropDown.Item>
              ))}
            </DropDown>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
