'use client';
import React, {
  CSSProperties,
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
} from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';

interface Props extends InputProps {
  title: string;
  id: string;
  errorMessage: string | undefined;
  values: string | number;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleBlur: FocusEventHandler<HTMLInputElement>;
  isInvalid: boolean;
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
  ...props
}) => {
  return (
    <>
      <FormControl isInvalid={isInvalid}>
        <FormLabel
          cursor={'pointer'}
          style={{ width: 'fit-content' }}
          color={backgroundColor || '#262A56'}
          htmlFor={id}
          fontWeight=""
        >
          {title}<span className='text-red-500'>*</span>
        </FormLabel>
        <InputGroup size="lg">
          <Input
            style={style}
            as="input"
            type={type || 'text'}
            id={id}
            value={values}
            onChange={handleChange}
            onBlur={handleBlur}
            color={'#000000'}
            backgroundColor={backgroundColor || '#262A56'} // Use the provided backgroundColor or a default value
            _hover={hoverStyles || { backgroundColor: '#ffffff' }}
            variant="filled"
            placeholder={`Masukkan ${title}`}
            {...props}
          />
        </InputGroup>

        <FormErrorMessage size={'xs'} color={'red'} fontWeight="">
          {errorMessage}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default CustomInput;
