import { extendTheme } from "@chakra-ui/react";

import { Pretendard } from "../../public/fonts";
import { Button as buttonTheme } from "./components/button";
import { checkboxTheme } from "./components/checkbox";
import { tagTheme } from "./components/chip";
import { menuTheme } from "./components/dropdown";
import { Input as inputTheme } from "./components/input";
import { radiobuttonTheme } from "./components/radiobutton";
import { togglebuttonTheme } from "./components/togglebutton";
import { colors } from "./foundations/colors";
import { radii } from "./foundations/radius";
import { spacing } from "./foundations/space";
import { text } from "./foundations/text";

const boxShadow = {
  depth100: "0px 1px 2px 2px rgba(195, 195, 195, 0.10)",
  depth200: "0px 0px 10px 5px rgba(136, 136, 136, 0.15)",
  depth300: "0px 0px 10px 5px rgba(136, 136, 136, 0.15)",
};

const theme = extendTheme({
  ...spacing,
  radii, //border radius
  colors: colors,
  shadows: boxShadow,
  textStyles: text,
  breakpoints: {
    base: "0px",
    sm: "480px",
    md: "1440px",
    lg: "1920px",
    xl: "1280px",
  },
  fonts: {
    body: Pretendard.style.fontFamily,
    heading: Pretendard.style.fontFamily,
  },
  components: {
    Progress: {
      baseStyle: {
        filledTrack: {
          bg: "#223A88",
        },
      },
    },
    Button: buttonTheme,
    Input: inputTheme,
    Tag: tagTheme,
    Checkbox: checkboxTheme,
    Switch: togglebuttonTheme,
    Menu: menuTheme,
    Radio: radiobuttonTheme,
  },
});

export default theme;
