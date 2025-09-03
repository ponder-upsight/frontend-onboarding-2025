"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import {
  Flex,
  Box,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
} from "@chakra-ui/react";
import { TypoGraph } from "@/app/components/ui/Typography";
import { Button } from "@/app/components/ui/Button";
import { DropDown } from "@/app/components/ui/Dropdown";
import i18next from "i18next";
import {useI18n} from "@/app/i18n/I18nProvider";

const LANGUAGE_ITEMS = [
  { label: "한국어", value: "ko" },
  { label: "English", value: "en" },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameArray = pathname.split("/");

  const lng = pathnameArray[1];
  const { t } = useI18n();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isMobileMenuOpen,
    onOpen: onMobileMenuOpen,
    onClose: onMobileMenuClose,
  } = useDisclosure();

  const handleLngOptionClick = async (value: string) => {
    await i18next.changeLanguage(value);
    router.push(window.location.href.replace(`/${lng}`, `/${value}`));
    onClose();
  };

  const HamburgerIcon = () => (
    <Box
      as="button"
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      width="24px"
      height="18px"
      bg="transparent"
      border="none"
      cursor="pointer"
      onClick={onMobileMenuOpen}
    >
      <Box height="2px" bg="gray.800" />
      <Box height="2px" bg="gray.800" />
      <Box height="2px" bg="gray.800" />
    </Box>
  );

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
          <TypoGraph variant="title03">{t("title")}</TypoGraph>
          
          <Flex
            display={{ base: "none", md: "flex" }}
            width="320px"
            justifyContent="space-between"
            alignItems="center"
            gap="8px"
            bg="#fff"
          >
            <Button
              variant="primary"
              w="100px"
              onClick={() => router.push(`/${pathnameArray[1]}`)}
            >
              {t("products")}
            </Button>
            <Button
              variant="secondary"
              w="100px"
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

          <Box display={{ base: "block", md: "none" }}>
            <HamburgerIcon />
          </Box>
        </Flex>
      </Flex>

      <Drawer isOpen={isMobileMenuOpen} placement="right" onClose={onMobileMenuClose}>
        <DrawerOverlay />
        <DrawerContent pt="32px">
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing={4} align="stretch" pt={4}>
              <Button
                variant="primary"
                w="100%"
                onClick={() => {
                  router.push(`/${pathnameArray[1]}`);
                  onMobileMenuClose();
                }}
              >
                {t("products")}
              </Button>
              <Button
                variant="secondary"
                w="100%"
                onClick={() => {
                  router.push(`/${pathnameArray[1]}/register`);
                  onMobileMenuClose();
                }}
              >
                {t("productRegistration")}
              </Button>
              
              <Box pt={4}>
                <DropDown
                  isOpen={isOpen}
                  onClose={onClose}
                  onOpen={onOpen}
                  selectedValue={LANGUAGE_ITEMS.find((item) => item.value === lng)?.value}
                  displayText={LANGUAGE_ITEMS.find((item) => item.value === lng)?.label}
                  onSelect={(value) => {
                    handleLngOptionClick(value);
                    onMobileMenuClose();
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
