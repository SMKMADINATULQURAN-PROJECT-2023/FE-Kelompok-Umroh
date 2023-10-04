"use client";
import { CustomHeader } from "@/component";
import type { NextPage } from "next";
import * as yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import CustomInput from "@/component/CustomInput";
import { Avatar, Button } from "@chakra-ui/react";
import CustomSelect from "@/component/CustomSelect";
import { FaSquarePlus, FaTrash } from "react-icons/fa6";
import { TambahUserPayload } from "../interface/user.interface";
import useUserModule from "../service/user.service";
import "./index.css";
import { useRouter } from "next/navigation";

const TambahUser: NextPage = () => {
  const router = useRouter();
  const { useTambahUser } = useUserModule();
  const { mutate, isLoading } = useTambahUser();

  const createUserSchema = yup.object().shape({
    username: yup.string().nullable().default("").required("Wajib isi"),
    email: yup
      .string()
      .default("")
      .required("Wajib pilih")
      .email("Gunakan Format Email"),
    role_id: yup.number().nullable().default(0).required("Wajib pilih"),
    password: yup.string().default("").required("Wajib pilih"),
    file_create: yup.mixed().nullable().default(undefined),
  });

  const option = [
    {
      value: 1,
      label: "Admin",
    },
    {
      value: 2,
      label: "Content Creator",
    },
  ];

  const onSubmit = async (values: TambahUserPayload) => {
    console.log(values);
    mutate(values, {
      onSuccess: () => {
        resetForm();
        setValues(createUserSchema.getDefault());
        return router.replace("/admin/user");
      },
    });
  };

  const formik = useFormik<TambahUserPayload>({
    initialValues: createUserSchema.getDefault(),
    validationSchema: createUserSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
    values,
    errors,
    resetForm,
    setValues,
  } = formik;
  return (
    <div className="h-full w-full ">
      <CustomHeader />

      <section className="w-full rounded-[10px] bg-primary p-5">
        <FormikProvider value={formik}>
          <Form
            className="flex h-full flex-col space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="flex h-full w-full items-center justify-between gap-x-10">
              <div className="flex w-[50%] flex-col items-start space-y-3">
                <CustomInput
                  id="username"
                  title="Username"
                  type="text"
                  values={values.username}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.username}
                  errorMessage={errors?.username}
                  backgroundColor="#ffffff"
                />
                <CustomInput
                  id="email"
                  title="Email"
                  type="email"
                  values={values.email}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.email}
                  errorMessage={errors?.email}
                  backgroundColor="#ffffff"
                />
                <CustomInput
                  id="password"
                  title="Password"
                  type="password"
                  values={values.password}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.password}
                  errorMessage={errors?.password}
                  backgroundColor="#ffffff"
                />
              </div>
              <div className="flex h-full w-[50%] flex-col justify-between space-y-3">
                <div className="flex h-full w-full items-center space-x-5 rounded-[10px] bg-white p-5">
                  <div className="flex items-center">
                    {values.file_create ? (
                      <Avatar
                        size="xl"
                        name=""
                        src={URL.createObjectURL(values.file_create)}
                      />
                    ) : (
                      <Avatar size="xl" name="" src="" />
                    )}
                  </div>
                  <div className="flex flex-col items-start">
                    <input
                      className="w-fit cursor-pointer text-primary"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]; // Use optional chaining to handle null
                        if (file) {
                          // Check file size
                          if (file.size > 10 * 1024 * 1024) {
                            alert("File size exceeds 10 MB.");
                            return;
                          }

                          // Set the image source and display file size
                          setFieldValue("file_create", file);
                        }
                      }}
                    />
                    {values.file_create && (
                      <span className="text-primary">
                        {(values.file_create.size / (1024 * 1024)).toFixed(2)}{" "}
                        MB
                      </span>
                    )}
                  </div>
                </div>
                <CustomSelect
                  id="role_id"
                  title="Role"
                  size={"lg"}
                  values={values.role_id.toString()}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.role_id}
                  errorMessage={errors?.role_id}
                  backgroundColor="#ffffff"
                >
                  {option.map((_, i) => {
                    return (
                      <option value={_.value} key={i}>
                        {_.label}
                      </option>
                    );
                  })}
                </CustomSelect>
              </div>
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="w-[20%]">
                <Button
                  width={"full"}
                  fontWeight="normal"
                  type="reset"
                  colorScheme={"red"}
                  variant={"outline"}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  h="45px"
                  color={"red.500"}
                  leftIcon={<FaTrash color="##E53E3E" />}
                  onClick={() => formik.resetForm()}
                >
                  Reset Form
                </Button>
              </div>
              <div className="w-[20%]">
                <Button
                  width={"full"}
                  fontWeight="normal"
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  h="45px"
                  backgroundColor={"blue.500"}
                  color={"#ffffff"}
                  leftIcon={<FaSquarePlus color="#ffffff" />}
                  _hover={{ bgColor: "blue.600" }}
                >
                  Buat Akun
                </Button>
              </div>
            </div>
          </Form>
        </FormikProvider>
      </section>
    </div>
  );
};

export default TambahUser;
