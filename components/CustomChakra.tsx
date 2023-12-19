"use client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React, { ReactNode } from "react";

const theme = extendTheme({
  components: {},
  colors: {
    // primary: "#262A56",
    // secondary: "#1c1e3b",
    primary: '#1E5236',
    secondary: '#003F37',
    third: '#F6DB30',
    hitam: "#4A4A4A",
    abu: "#CECECE",
  },
  borders: {
    // primary: `1px solid #262A56`,
    // secondary: "1px solid #1c1e3b",
    primary: `1px solid #1E5236`,
    secondary: `1px solid #003F37`,
    third: "1px solid #F6DB30",
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
