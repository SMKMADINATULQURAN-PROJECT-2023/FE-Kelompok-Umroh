"use client";
import React, { useEffect, useState } from "react";
import { Form, Formik, FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import { useLoginService } from "../service/auth.service";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Container,
  InputGroup,
  InputRightElement,
  Button,
  AbsoluteCenter,
  Heading,
  Grid,
  Box,
  Center,
  VStack,
  Spinner,
} from "@chakra-ui/react";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .default("")
    .required("Email tidak boleh kosong")
    .email("Gunakan Format Email"),
  password: yup.string().default("").required("Passowrd tidak boleh kosong"),
});

type LoginValues = yup.Asserts<typeof loginSchema>;
const Login = () => {
  const [show, setShow] = useState<boolean>(false);
  const { mutate, isLoading } = useLoginService();
  const { data: session, status } = useSession();
  const router = useRouter();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...loginSchema.getDefault(),
    },
    onSubmit: async (values: LoginValues) => {
      return mutate(values);
    },
    validationSchema: loginSchema,
  });

  let { values, errors, handleChange, handleBlur, handleSubmit } = formik;
  useEffect(() => {
    if (session) {
      router.push("/admin/catatan");
    }
  }, [session]);

  if (session) {
    return (
      <section>
        <Spinner />
      </section>
    );
  }
  return (
    <section className="flex h-full w-full items-center justify-center">
      <Box w={{ base: "90%", sm: "90%", md: "80%", lg: "50%", xl: "30%" }}>
        {JSON.stringify(session)}
        <FormikProvider value={formik}>
          <Heading marginBottom={5} size={"lg"} color="#38A169">
            Login Form
          </Heading>
          <Form onSubmit={handleSubmit}>
            <VStack w="100%" spacing={5}>
              <FormControl isInvalid={!!errors?.email}>
                <FormLabel
                  color="#38A169"
                  htmlFor="email"
                  fontWeight="semibold"
                >
                  Email
                </FormLabel>
                <Input
                  id="email"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ketik email"
                />

                <FormErrorMessage color={"red"} fontWeight="bold">
                  {errors?.email}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors?.password}>
                <FormLabel
                  color="#38A169"
                  htmlFor="password"
                  fontWeight="semibold"
                >
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    className="w-full"
                    type={show ? "text" : "password"}
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="************"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => {
                        setShow(!show);
                      }}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <FormErrorMessage size={"xs"} color={"red"} fontWeight="bold">
                  {errors?.password}
                </FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                width={"100%"}
                height={10}
                borderRadius={10}
                isLoading={isLoading}
                isDisabled={isLoading}
                color={"white"}
                backgroundColor={"#38A169"}
              >
                Login
              </Button>
            </VStack>
          </Form>
        </FormikProvider>
      </Box>
    </section>
  );
};

export default Login;
