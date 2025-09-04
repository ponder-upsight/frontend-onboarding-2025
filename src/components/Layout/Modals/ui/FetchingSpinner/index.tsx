"use client";

import { Flex, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import { useIsFetching } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

const FetchingSpinner = () => {
  const bgColor = useColorModeValue("whiteAlpha.800", "blackAlpha.800");
  const isFetching = useIsFetching();

  return (
    <AnimatePresence>
      {isFetching && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "sticky",
            bottom: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            zIndex: 10,
          }}>
          <Flex
            align="center"
            justify="center"
            p={3}
            bg={bgColor}
            borderRadius="full"
            boxShadow="lg"
            backdropFilter="blur(10px)">
            <Spinner
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="sm"
            />
            <Text ml={3} fontSize="sm" fontWeight="medium" color="gray.600">
              더 많은 상품을 불러오는 중...
            </Text>
          </Flex>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FetchingSpinner;
