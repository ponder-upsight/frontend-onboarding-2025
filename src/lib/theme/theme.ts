import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { colors } from "./foundations/colors";
import { radius } from "./foundations/radius";
import { spacing } from "./foundations/spacing";
import { text } from "./foundations/text";
import { buttonTheme } from "./components/button";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors,
  radius,
  spacing,
  text,
  styles: {
    global: {
      body: {
        bg: "white",
        color: "gray.900",
        fontFamily: geistSans.variable, // Inter 폰트 적용
      },
      code: {
        fontFamily: geistMono.variable, // JetBrains Mono 적용
      },
      a: {
        color: "primary.500",
        _hover: { textDecoration: "underline" },
      },
    },
  },
  components: {
    Button: buttonTheme,
  },
});
