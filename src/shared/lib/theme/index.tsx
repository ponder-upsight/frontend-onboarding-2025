"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { theme } from "./theme";

const ChakraLayoutProvider = ({ children }: { children: ReactNode }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default ChakraLayoutProvider;
