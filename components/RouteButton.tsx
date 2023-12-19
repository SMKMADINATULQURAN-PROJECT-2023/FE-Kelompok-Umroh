"use client";
import { Button, ButtonProps } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface RouteButtonProps extends ButtonProps {
  title: any;
  to?: string;
}

const RouteButton: React.FC<RouteButtonProps> = ({
  title,
  to = "/",
  ...props
}) => {
  const route = useRouter();
  const target = to || "/";

  return (
    <Link href={target}>
      <Button
        {...props}
        // onClick={() => route.push(target)}
      >
        {title}
      </Button>
    </Link>
  );
};

export default RouteButton;
