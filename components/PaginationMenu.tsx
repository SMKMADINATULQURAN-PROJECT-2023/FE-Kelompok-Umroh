import { Button, Input } from "@chakra-ui/react";
import { NextPage } from "next";
import { ChangeEventHandler, MouseEventHandler } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";

interface Props {
  firstPageButtonIsDisabled: boolean;
  firstPageButtonOnClick: MouseEventHandler<HTMLButtonElement> | undefined;
  previousPageButtonIsDisabled: boolean;
  previousPageButtonOnClick: MouseEventHandler<HTMLButtonElement> | undefined;
  inputPageOnChange: ChangeEventHandler<HTMLInputElement> | undefined;
  inputValue: number;
  lastPageButtonIsDisabled: boolean;
  lastPageButtonOnClick: MouseEventHandler<HTMLButtonElement> | undefined;
  nextPageButtonIsDisabled: boolean;
  nextPageButtonOnClick: MouseEventHandler<HTMLButtonElement> | undefined;
  pageFrom: number | string;
  pageTo: number | string;
  currentPageSize: any;
  pageSizeOnClick: number | string | undefined | any;
  className?: string;
}

const PaginationMenu: NextPage<Props> = ({
  firstPageButtonIsDisabled,
  firstPageButtonOnClick,
  previousPageButtonIsDisabled,
  previousPageButtonOnClick,
  inputPageOnChange,
  inputValue,
  nextPageButtonIsDisabled,
  nextPageButtonOnClick,
  lastPageButtonIsDisabled,
  lastPageButtonOnClick,
  pageFrom,
  pageTo,
  currentPageSize,
  pageSizeOnClick,
  className = "",
}) => {
  return (
    <div className={`${className} flex w-full flex-col`}>
      <section className="mb-7 grid w-full grid-cols-1 items-center gap-y-3 lg:mb-3 lg:flex lg:justify-start lg:gap-y-0">
        <div className="flex items-center justify-center space-x-5 lg:justify-start">
          <div className="flex items-center space-x-2">
            <Button
              size={"sm"}
              backgroundColor={"primary"}
              isDisabled={firstPageButtonIsDisabled}
              onClick={firstPageButtonOnClick}
              _hover={{ bg: "secondary" }}
            >
              <FaAnglesLeft color="#ffffff" />
            </Button>
            <Button
              size={"sm"}
              backgroundColor={"primary"}
              isDisabled={previousPageButtonIsDisabled}
              onClick={previousPageButtonOnClick}
              _hover={{ bg: "secondary" }}
            >
              <FaAngleLeft color="#ffffff" />
            </Button>
          </div>

          <div>
            <Input
              type="number"
              size={"sm"}
              borderRadius={"5px"}
              border={"primary"}
              width={"60px"}
              value={inputValue}
              onChange={inputPageOnChange}
              className="w-16 rounded border p-1 text-center"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button
              size={"sm"}
              backgroundColor={"primary"}
              isDisabled={nextPageButtonIsDisabled}
              onClick={nextPageButtonOnClick}
              _hover={{ bg: "secondary" }}
            >
              <FaAngleRight color="#ffffff" />
            </Button>
            <Button
              size={"sm"}
              backgroundColor={"primary"}
              isDisabled={lastPageButtonIsDisabled}
              onClick={lastPageButtonOnClick}
              _hover={{ bg: "secondary" }}
            >
              <FaAnglesRight color="#ffffff" />
            </Button>
          </div>
        </div>

        <div className="ml-2">
          <span className="flex items-center justify-center gap-1 lg:justify-start">
            <div className="hidden lg:block"> | Halaman</div>
            <div className="block lg:hidden">Halaman</div>
            <strong>
              {pageFrom} dari {pageTo}
            </strong>
          </span>
        </div>
      </section>

      <section className="flex w-full items-center">
        <div className="flex w-full flex-col items-center space-x-4 space-y-2 lg:flex-row lg:space-y-0">
          <p className="">Jumlah Per Halaman:</p>
          <div className="flex items-center space-x-2">
            {[10, 20, 30, 40, 50].map((pageSize, i) => (
              <Button
                size={"sm"}
                key={pageSize}
                backgroundColor={
                  pageSize === currentPageSize ? "primary" : "abu"
                }
                color={pageSize === currentPageSize ? "white" : "primary"}
                onClick={() => pageSizeOnClick(pageSize)}
                className={`rounded-full px-3 py-1`}
              >
                {pageSize}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaginationMenu;
