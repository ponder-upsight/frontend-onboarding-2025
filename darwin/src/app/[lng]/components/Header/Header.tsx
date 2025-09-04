"use client";

import { useRouter } from "next/navigation";

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  VStack,
} from "@chakra-ui/react";

import { Button } from "@/components/ui/Button";
import { DropDown } from "@/components/ui/Dropdown";
import { Hamburger } from "@/components/ui/Hamburger";
import { TypoGraph } from "@/components/ui/Typography";

import { useHeader } from "@/app/[lng]/components/Header/useHeader";
import { useI18n } from "@/app/i18n/I18nProvider";

const LANGUAGE_ITEMS = [
  { label: "한국어", value: "ko" },
  { label: "English", value: "en" },
];

const Header = () => {
  const router = useRouter();
  const { t, lng } = useI18n();
  const { languageDropdownDisclosure, mobileMenuDisclosure, handleLngOptionClick } =
    useHeader();

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
          pt="16px"
          pb="16px"
          pl={{ base: "16px", md: "64px" }}
          pr={{ base: "16px", md: "64px" }}
          outline={0}
        >
          <TypoGraph variant="title03">{t("navigation.title")}</TypoGraph>

          <Flex
            display={{ base: "none", md: "flex" }}
            width="320px"
            justifyContent="space-between"
            alignItems="center"
            gap="8px"
            bg="#fff"
          >
            <Button variant="primary" w="100px" onClick={() => router.push(`/${lng}`)}>
              {t("navigation.products")}
            </Button>
            <Button
              variant="secondary"
              w="100px"
              onClick={() => router.push(`/${lng}/register`)}
            >
              {t("product.registration.pageTitle")}
            </Button>

            <DropDown
              isOpen={languageDropdownDisclosure.isOpen}
              onClose={languageDropdownDisclosure.onClose}
              onOpen={languageDropdownDisclosure.onOpen}
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

          <Box display={{ base: "block", md: "none" }}>
            <Hamburger onClick={mobileMenuDisclosure.onOpen} />
          </Box>
        </Flex>
      </Flex>

      <Drawer
        isOpen={mobileMenuDisclosure.isOpen}
        placement="right"
        onClose={mobileMenuDisclosure.onClose}
      >
        <DrawerOverlay />
        <DrawerContent pt="32px">
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing={4} align="stretch" pt={4}>
              <Button
                variant="primary"
                w="100%"
                onClick={() => {
                  router.push(`/${lng}`);
                  mobileMenuDisclosure.onClose();
                }}
              >
                {t("navigation.products")}
              </Button>
              <Button
                variant="secondary"
                w="100%"
                onClick={() => {
                  router.push(`/${lng}/register`);
                  mobileMenuDisclosure.onClose();
                }}
              >
                {t("product.registration.pageTitle")}
              </Button>

              <Box pt={4}>
                <DropDown
                  isOpen={languageDropdownDisclosure.isOpen}
                  onClose={languageDropdownDisclosure.onClose}
                  onOpen={languageDropdownDisclosure.onOpen}
                  selectedValue={LANGUAGE_ITEMS.find((item) => item.value === lng)?.value}
                  displayText={LANGUAGE_ITEMS.find((item) => item.value === lng)?.label}
                  onSelect={(value) => {
                    handleLngOptionClick(value);
                    mobileMenuDisclosure.onClose();
                  }}
                  matchWidth={false}
                  variant="outline"
                  w="100%"
                >
                  {LANGUAGE_ITEMS.map((item) => (
                    <DropDown.Item key={item.value} value={item.value}>
                      {item.label}
                    </DropDown.Item>
                  ))}
                </DropDown>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
