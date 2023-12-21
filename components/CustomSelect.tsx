"use client";
import React, {
  CSSProperties,
  ChangeEventHandler,
  FocusEventHandler,
} from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Select,
  SelectProps,
} from "@chakra-ui/react";

interface Props extends SelectProps {
  title: string;
  id: string;
  errorMessage: string | undefined;
  values: string | undefined;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  handleBlur: FocusEventHandler<HTMLSelectElement>;
  isInvalid: boolean;
  backgroundColor?: string;
  hoverStyles?: Record<string, any>; // You can customize this type to match your needs
  style?: CSSProperties;
  children: any;
}

const CustomSelect: React.FC<Props> = ({
  id,
  title,
  errorMessage,
  style,
  values,
  handleChange,
  handleBlur,
  isInvalid,
  backgroundColor,
  hoverStyles,
  children,
  ...props
}) => {
  const inputHoverStyles = {
    backgroundColor:
      hoverStyles?.backgroundColor || backgroundColor || "primary",
    color: "white",
  };
  return (
    <>
      <FormControl isInvalid={isInvalid}>
        <FormLabel
          cursor={"pointer"}
          style={{ width: "fit-content" }}
          color={backgroundColor || "primary"}
          htmlFor={id}
          fontWeight=""
        >
          {title}
          <span className="text-red-500">*</span>
        </FormLabel>
        <Select
          style={style}
          id={id}
          value={values}
          onBlur={handleBlur}
          onChange={handleChange}
          color={"primary"}
          border={'primary'}
          _hover={inputHoverStyles}
          bg={"rgba(30, 82, 54, 0.2)"}
          variant="filled"
          placeholder={`Masukkan ${title}`}
          {...props}
        >
          {children}
        </Select>

        <FormErrorMessage size={"xs"} color={"red"} fontWeight="">
          {errorMessage}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default CustomSelect;
