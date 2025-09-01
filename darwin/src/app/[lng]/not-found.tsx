"use client"

import { Box, Button, VStack, Heading, Text, HStack, useColorModeValue } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()
  const bg = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')

  const handleGoBack = () => router.back()
  const handleGoHome = () => router.push('/ko')

  return (
    <Box minH="100vh" bg={bg} display="flex" alignItems="center" justifyContent="center" p={8}>
      <Box bg={cardBg} p={8} borderRadius="lg" boxShadow="lg" maxW="500px" textAlign="center">
        <VStack spacing={6}>
          <VStack spacing={4}>
            <Heading as="h1" size="2xl" color="blue.500">
              404
            </Heading>
            <Heading as="h2" size="lg">
              페이지를 찾을 수 없습니다
            </Heading>
            <VStack spacing={2}>
              <Text color="gray.600">
                죄송합니다. 현재 찾을 수 없는 페이지에 접속하셨습니다.
              </Text>
              <Text color="gray.600">
                삭제되거나 주소가 잘못 입력되었습니다.
              </Text>
              <Text color="gray.600">
                이전 페이지로 돌아가거나, 홈페이지로 이동해 주세요.
              </Text>
            </VStack>
          </VStack>
          
          <HStack spacing={4}>
            <Button variant="outline" onClick={handleGoBack}>
              이전 페이지
            </Button>
            <Button colorScheme="blue" onClick={handleGoHome}>
              홈으로 가기
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}
