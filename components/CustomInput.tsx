"use client";
import React, {
  CSSProperties,
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
} from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface Props extends InputProps {
  id: string;
  errorMessage: string | undefined;
  values: string | number | undefined;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleBlur: FocusEventHandler<HTMLInputElement>;
  isInvalid: boolean;
  noLabel?: boolean;
  isInputLeftAddon?: boolean;
  title?: string;
  type?: HTMLInputTypeAttribute;
  backgroundColor?: string;
  hoverStyles?: Record<string, any>; // You can customize this type to match your needs
  style?: CSSProperties;
}

const CustomInput: React.FC<Props> = ({
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
  type,
  noLabel = false,
  isInputLeftAddon = false,
  ...props
}) => {
  const inputHoverStyles = {
    backgroundColor:
      hoverStyles?.backgroundColor || backgroundColor || "primary",
    color: "white",
  };
  return (
    <FormControl isInvalid={isInvalid}>
      {noLabel ? undefined : (
        <FormLabel
          cursor="pointer"
          style={{ width: "fit-content" }}
          color={backgroundColor || "primary"}
          htmlFor={id}
          fontWeight=""
        >
          {title}
          <span className="text-red-500">*</span>
        </FormLabel>
      )}
      <InputGroup size="md">
        {isInputLeftAddon ? (
          <InputLeftAddon bg={"primary"} border={"primary"} color={"white"}>
            <FaMagnifyingGlass />
          </InputLeftAddon>
        ) : undefined}
        <Input
          style={style}
          as="input"
          type={type || "text"}
          id={id}
          value={values}
          onChange={handleChange}
          onBlur={handleBlur}
          color="primary"
          border={"primary"}
          bg={"rgba(30, 82, 54, 0.2)"}
          _hover={inputHoverStyles}
          variant="filled"
          placeholder={`Masukkan ${title}`}
          {...props}
        />
      </InputGroup>

      <FormErrorMessage size="xs" color="red" fontWeight="">
        {errorMessage}
      </FormErrorMessage>
    </FormControl>
  );
};

export default CustomInput;
