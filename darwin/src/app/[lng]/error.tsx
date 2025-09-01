"use client"

import { useEffect } from "react"
import { Box, Button, VStack, Heading, Text, useColorModeValue } from "@chakra-ui/react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const bg = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Box minH="100vh" bg={bg} display="flex" alignItems="center" justifyContent="center" p={8}>
      <Box bg={cardBg} p={8} borderRadius="lg" boxShadow="lg" maxW="500px" textAlign="center">
        <VStack spacing={6}>
          <VStack spacing={4}>
            <Heading as="h2" size="lg" color="red.500">
              문제가 발생했습니다
            </Heading>
            <Text color="gray.600">
              예상치 못한 오류가 발생했습니다. 페이지를 새로고침해 주세요.
            </Text>
            {error.digest && (
              <Text fontSize="sm" color="gray.400">
                오류 ID: {error.digest}
              </Text>
            )}
          </VStack>
          
          <Button colorScheme="blue" onClick={reset}>
            다시 시도
          </Button>
        </VStack>
      </Box>
    </Box>
  )
}
