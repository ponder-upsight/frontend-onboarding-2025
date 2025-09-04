"use client";

import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

import { useI18n } from "@/app/i18n/I18nProvider";

export default function NotFound() {
  const { t } = useI18n();
  const router = useRouter();
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  const handleGoBack = () => router.back();
  const handleGoHome = () => router.push("/ko");

  return (
    <Box
      minH="100vh"
      bg={bg}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={8}
    >
      <Box
        bg={cardBg}
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        maxW="500px"
        textAlign="center"
      >
        <VStack spacing={6}>
          <VStack spacing={4}>
            <Heading as="h1" size="2xl" color="blue.500">
              404
            </Heading>
            <Heading as="h2" size="lg">
              {t("notFound.title")}
            </Heading>
            <VStack spacing={2}>
              <Text color="gray.600">{t("notFound.description")}</Text>
              <Text color="gray.600">{t("notFound.suggestion")}</Text>
            </VStack>
          </VStack>

          <HStack spacing={4}>
            <Button variant="outline" onClick={handleGoBack}>
              {t("notFound.backButton")}
            </Button>
            <Button colorScheme="blue" onClick={handleGoHome}>
              {t("notFound.homeButton")}
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
