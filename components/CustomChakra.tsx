"use client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import React, { ReactNode } from "react";
const theme = extendTheme({
  components: {
    
  },
})
interface CustomChakraProps {
  children: ReactNode;
}

const CustomChakra: React.FC<CustomChakraProps> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default CustomChakra;
