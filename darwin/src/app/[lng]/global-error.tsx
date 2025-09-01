"use client"

import { useEffect } from "react"
import { Box, Button, VStack, Heading, Text, useColorModeValue } from "@chakra-ui/react"

export default function GlobalError({
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
    <html>
      <body>
        <Box minH="100vh" bg={bg} display="flex" alignItems="center" justifyContent="center" p={8}>
          <Box bg={cardBg} p={8} borderRadius="lg" boxShadow="lg" maxW="500px" textAlign="center">
            <VStack spacing={6}>
              <VStack spacing={4}>
                <Heading as="h2" size="lg" color="red.500">
                  시스템 오류가 발생했습니다
                </Heading>
                <Text color="gray.600">
                  전체 애플리케이션에 문제가 발생했습니다. 페이지를 새로고침해 주세요.
                </Text>
                {error.digest && (
                  <Text fontSize="sm" color="gray.400">
                    오류 ID: {error.digest}
                  </Text>
                )}
              </VStack>
              
              <Button colorScheme="red" onClick={reset}>
                애플리케이션 재시작
              </Button>
            </VStack>
          </Box>
        </Box>
      </body>
    </html>
  )
}
