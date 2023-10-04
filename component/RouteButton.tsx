'use client';
import { Button, ButtonProps } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface RouteButtonProps extends ButtonProps {
  title: any;
  to: string; // Make 'to' prop optional by adding the '?'
}

const RouteButton: React.FC<RouteButtonProps> = ({ title, to, ...props }) => {
  const route = useRouter();

  // Use a default value if 'to' is undefined
  const target = to || '/'; // You can change '/' to a default route

  return (
    <Button {...props} onClick={() => route.push(target)}>
      {title}
    </Button>
  );
};

export default RouteButton;
