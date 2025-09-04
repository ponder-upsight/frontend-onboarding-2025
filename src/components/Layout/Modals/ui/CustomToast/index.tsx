"use client";
import {
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
  Box,
  SlideFade,
} from "@chakra-ui/react";
import useCustomToastStore from "@/shared/lib/zustand/useCustomToastStore";

const CustomToast = () => {
  const { isOpen, message, status, hideToast } = useCustomToastStore();

  return (
    <Box position="fixed" top={5} right={5} zIndex="toast">
      <SlideFade in={isOpen} offsetY="-20px">
        <Alert
          status={status}
          borderRadius="md"
          boxShadow="lg"
          pr={8}
          alignItems="center">
          <AlertIcon />
          <AlertDescription>{message}</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={hideToast}
          />
        </Alert>
      </SlideFade>
    </Box>
  );
};

export default CustomToast;
