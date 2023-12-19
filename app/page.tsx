"use client";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import * as yup from "yup";
import { Form, Formik, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLoginService } from "./auth/service/auth.service";
import Loader from "@/components/Loader";
import dayjs from "dayjs";
import Image from "next/image";
import { NextPage } from "next";
import Link from "next/link";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .default("")
    .required("Email tidak boleh kosong")
    .email("Gunakan Format Email"),
  password: yup.string().default("").required("Passowrd tidak boleh kosong"),
});

interface Props {}

type LoginValues = yup.Asserts<typeof loginSchema>;

const Home: NextPage<Props> = () => {
  const [show, setShow] = useState<boolean>(false);
  const { mutate, isLoading } = useLoginService();
  const { data: session, status } = useSession();
  const currentYear = dayjs().year();
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
      router.push("/admin/dashboard");
    }
  }, [session]);

  if (session) {
    return (
      <section className="flex h-screen w-screen items-center justify-center bg-white">
        <Loader />
      </section>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-white">
      <section className="relative flex h-full w-full items-center justify-center p-7 lg:w-[60%]">
        <div className="w-full lg:w-[50%]">
          <div className="mb-[50px]">
            <p className="text-[35px] font-bold text-primary">LOGIN</p>
            <p className="text-primary">
              Masukkan email dan password untuk masuk!
            </p>
          </div>
          <div className="space-y-[15px]">
            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                <Stack spacing={5} className="mb-10">
                  <FormControl isInvalid={!!errors?.email}>
                    <FormLabel
                      color="primary"
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
                      color={"black"}
                      backgroundColor={"gray.100"}
                      _hover={{ bgColor: "violet.100" }}
                      _placeholder={{ opacity: 1, color: "gray.500" }}
                      variant="filled"
                      placeholder="Masukkan Email"
                      size="lg"
                    />

                    <FormErrorMessage color={"red"}>
                      {errors?.email}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors?.password}>
                    <FormLabel
                      color="primary"
                      htmlFor="password"
                      fontWeight="semibold"
                    >
                      Password
                    </FormLabel>
                    <InputGroup size="lg">
                      <Input
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        color={"black"}
                        backgroundColor={"gray.100"}
                        _hover={{ bgColor: "violet.100" }}
                        _placeholder={{ opacity: 1, color: "gray.500" }}
                        variant="filled"
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Masukkan password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          type="button"
                          h="1.75rem"
                          size="sm"
                          color={"primary"}
                          onClick={() => {
                            setShow(!show);
                          }}
                        >
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <div className="flex items-center justify-between">
                      <FormErrorMessage color={"red"}>
                        {errors?.password}
                      </FormErrorMessage>
                      <Link href={"/lupa-password"}>
                        <p className="mt-2 cursor-pointer text-right text-primary hover:pr-2 hover:text-secondary">
                          Lupa password
                        </p>
                      </Link>
                    </div>
                  </FormControl>
                </Stack>

                <Button
                  width={"full"}
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  h="50px"
                  color={"#ffffff"}
                  backgroundColor={"primary"}
                  _hover={{ bg: "secondary" }}
                >
                  LOGIN
                </Button>
              </Form>
            </FormikProvider>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 rounded bg-primary bg-opacity-25">
          <p className="px-3 py-1 font-mono text-xs text-primary">
            ⓒ {process.env.NEXT_PUBLIC_APP_NAME} {currentYear}
          </p>
        </div>
        <div className="absolute -left-12 -top-12 z-20 hidden lg:block">
          <Image
            className=""
            objectFit="cover"
            objectPosition="center"
            width={200}
            height={0}
            quality={100}
            alt={"playstore"}
            src={"/assets/images/bungaSatu.png"}
          />
        </div>
        <div className="absolute left-10 top-0 z-10 hidden lg:block">
          <Image
            className=""
            objectFit="cover"
            objectPosition="center"
            width={100}
            height={0}
            quality={100}
            alt={"playstore"}
            src={"/assets/images/lentera.png"}
          />
        </div>
      </section>

      <section className="relative hidden h-full w-[40%] rounded-tl-[70px] bg-primary lg:block">
        <div className="absolute -right-20 -top-14 z-20">
          <Image
            className=""
            objectFit="cover"
            objectPosition="center"
            width={350}
            height={0}
            quality={100}
            alt={"playstore"}
            src={"/assets/images/bungaTiga.png"}
          />
        </div>

        <div className="absolute bottom-0 right-0 z-10 rotate-180">
          <Image
            className=""
            objectFit="cover"
            objectPosition="center"
            width={700}
            height={0}
            quality={100}
            alt={"playstore"}
            src={"/assets/images/ornamentArabTrans.svg"}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
