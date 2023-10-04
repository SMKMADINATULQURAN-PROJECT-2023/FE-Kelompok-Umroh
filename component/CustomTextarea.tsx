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
  Textarea,
  InputGroup,
  InputProps,
  InputRightElement,
  TextareaProps,
} from "@chakra-ui/react";
// ...
import ReactQuill, { ReactQuillProps, Value } from "react-quill"; // Import Value type
import "react-quill/dist/quill.snow.css";

interface Props extends ReactQuillProps {
  title: string;
  id: string;
  errorMessage: string | undefined;
  values: any; // Use the correct type for values
  handleChange: any; // Correct type for handleChange
  handleBlur: any; // Correct type for handleBlur
  isInvalid: boolean;
  backgroundColor?: string;
  hoverStyles?: Record<string, any>;
  style?: CSSProperties;
}

const CustomTextArea: React.FC<Props> = ({
  id,
  title,
  errorMessage,
  style,
  values,
  handleChange, // Updated type
  handleBlur, // Updated type
  isInvalid,
  backgroundColor,
  hoverStyles,
  ...props
}) => {
  let toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'image'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']
  ];
  
  return (
    <>
      <FormControl isInvalid={isInvalid} onBlur={handleBlur}>
        <FormLabel
          cursor={"pointer"}
          style={{ width: "fit-content" }}
          color={backgroundColor || "#262A56"}
          htmlFor={id}
          fontWeight=""
        >
          {title}
        </FormLabel>
        <ReactQuill
          theme="snow"
          modules={{ toolbar: toolbarOptions }}
          value={values}
          onChange={handleChange}
          // onBlur={handleBlur}
          style={style}
          placeholder={`Masukkan ${title}`}
          id={id}
          {...props}
        />
        <Input
          type={"hidden"}
          id={id}
          value={values}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <FormErrorMessage size={"xs"} color={"red"} fontWeight="">
          {errorMessage}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default CustomTextArea;
