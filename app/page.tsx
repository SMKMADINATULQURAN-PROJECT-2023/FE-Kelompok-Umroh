'use client';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { Form, Formik, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLoginService } from './auth/service';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .default('')
    .required('Email tidak boleh kosong')
    .email('Gunakan Format Email'),
  password: yup.string().default('').required('Passowrd tidak boleh kosong'),
});

type LoginValues = yup.Asserts<typeof loginSchema>;

export default function Home() {
  const handleClick = () => setShow(!show);
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
      router.push('/admin/catatan');
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
    <div className="h-screen w-screen bg-white flex">
      {JSON.stringify(session)}

      <section className="w-[60%] h-full flex justify-center items-center">
        <div className="w-[50%]">
          <div className="mb-[50px]">
            <p className="text-black font-bold text-[35px]">LOGIN</p>
            <p className="text-black">
              Masukkan email dan password untuk masuk!
            </p>
          </div>
          <div className="space-y-[15px]"> 
            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                <Stack spacing={5} className="mb-10">
                  <FormControl isInvalid={!!errors?.email}>
                    <FormLabel
                      color="#1564C0"
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
                      color={'black'}
                      backgroundColor={'gray.100'}
                      _hover={{ bgColor: 'blue.100' }}
                      _placeholder={{ opacity: 1, color: 'gray.500' }}
                      // borderColor={'gray'}
                      variant="filled"
                      placeholder="Masukkan Email"
                      size="lg"
                    />

                    <FormErrorMessage color={'red'} fontWeight="bold">
                      {errors?.email}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors?.password}>
                    <FormLabel
                      color="#1564C0"
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
                        color={'black'}
                        backgroundColor={'gray.100'}
                        _hover={{ bgColor: 'blue.100' }}
                        _placeholder={{ opacity: 1, color: 'gray.500' }}
                        // borderColor={'gray'}
                        variant="filled"
                        pr="4.5rem"
                        type={show ? 'text' : 'password'}
                        placeholder="Masukkan password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          type="button"
                          h="1.75rem"
                          size="sm"
                          color={'black'}
                          onClick={() => {
                            setShow(!show);
                          }}
                        >
                          {show ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <div className="flex justify-between items-center">
                      <FormErrorMessage
                        size={'xs'}
                        color={'red'}
                        fontWeight="bold"
                      >
                        {errors?.password}
                      </FormErrorMessage>
                      <p className="text-right biru cursor-pointer hover:text-[#034fa4] hover:pr-2">
                        Lupa password
                      </p>
                    </div>
                  </FormControl>
                </Stack>

                <Button
                  width={'full'}
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  h="50px"
                  backgroundColor={'#1564C0'}
                  _hover={{ bgColor: '#034fa4' }}
                >
                  LOGIN
                </Button>
              </Form>
            </FormikProvider>
          </div>
        </div>
      </section>
      <section className="w-[40%] h-full bg-[#1564C0] rounded-tl-[70px]"></section>
    </div>
  );
}
