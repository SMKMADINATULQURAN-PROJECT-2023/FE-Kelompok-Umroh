'use client';
import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

interface CustomButtonProps extends ButtonProps {
  title: string; // Specify the type of the 'title' prop as string
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, ...props }) => {
  return <Button {...props}>{title}</Button>;
};

export default CustomButton;
