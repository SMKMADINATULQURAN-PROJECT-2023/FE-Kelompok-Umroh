import React from "react";
import { FaFilter } from "react-icons/fa6";
import {
  Input,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { Form, FormikProvider } from "formik";
import CustomSelect from "./CustomSelect";

interface Props {
  formik: any;
  handleSubmit: any;
  isLoading: boolean;
  refetch: any;
  values: any;
  handleChange: any;
  handleBlur: any;
  errors: any;
  children: React.ReactNode;
}

const FilterDrawer: React.FC<Props> = ({
  formik,
  handleSubmit,
  isLoading,
  refetch,
  values,
  handleChange,
  handleBlur,
  errors,
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = React.useRef<HTMLButtonElement>(null);

  const statusOption = [
    {
      value: "Pending",
      label: "Pending",
    },
    {
      value: "Reject",
      label: "Reject",
    },
    {
      value: "Accept",
      label: "Accept",
    },
  ];
  const isMineOption = [
    {
      value: "All",
      label: "Semua Orang",
    },
    {
      value: "saya",
      label: "Saya",
    },
  ];
  return (
    <div className="mb-5">
      <IconButton
        aria-label="Filter menu"
        ref={btnRef}
        onClick={onOpen}
        bg={isOpen ? "primary" : "rgba(30, 82, 54, 0.2)"}
        color={isOpen ? "white" : "primary"}
        icon={<FaFilter />}
        _hover={{
          backgroundColor: "primary",
          color: "white",
        }}
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color={"primary"}>Filter</DrawerHeader>

          <FormikProvider value={formik}>
            <Form
              onSubmit={handleSubmit}
              className="flex h-full flex-col justify-between"
            >
              <DrawerBody>
                {children}
                <div className="mt-7 flex flex-col space-y-7">
                  <CustomSelect
                    id="status"
                    title="Status"
                    size={"lg"}
                    values={values.status.toString()}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    isInvalid={!!errors?.status}
                    errorMessage={errors?.status}
                  >
                    {statusOption.map((_, i) => {
                      return (
                        <option value={_.value} key={i}>
                          {_.label}
                        </option>
                      );
                    })}
                  </CustomSelect>
                  <CustomSelect
                    id="created_by"
                    title="Dibuat oleh"
                    size={"lg"}
                    values={values.created_by.toString()}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    isInvalid={!!errors?.created_by}
                    errorMessage={errors?.created_by}
                  >
                    {isMineOption.map((_, i) => {
                      return (
                        <option value={_.value} key={i}>
                          {_.label}
                        </option>
                      );
                    })}
                  </CustomSelect>
                </div>
              </DrawerBody>

              <DrawerFooter>
                <Button
                  variant="outline"
                  colorScheme="red"
                  mr={3}
                  type="reset"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  onClick={() => formik.resetForm()}
                >
                  Reset
                </Button>
                <Button
                  bg={"primary"}
                  color={"white"}
                  _hover={{
                    bg: "secondary",
                  }}
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  Terapkan
                </Button>
              </DrawerFooter>
            </Form>
          </FormikProvider>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FilterDrawer;
