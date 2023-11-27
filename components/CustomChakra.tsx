"use client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React, { ReactNode } from "react";

const theme = extendTheme({
  components: {},
  colors: {
    primary: "#262A56",
    secondary: "#1c1e3b",
    hitam: "#4A4A4A",
    abu: "#CECECE",
  },
  borders: {
    primary: `1px solid #262A56`,
    secondary: "1px solid #1c1e3b",
    hitam: `1px solid #4A4A4A`,
    abu: `1px solid #CECECE`,
  },
});
interface CustomChakraProps {
  children: ReactNode;
}

const CustomChakra: React.FC<CustomChakraProps> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default CustomChakra;
