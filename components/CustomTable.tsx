"use client";
import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import RouteButton from "./RouteButton";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";
import Skeleton from "react-loading-skeleton";
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import PaginationMenu from "./PaginationMenu";
import "react-loading-skeleton/dist/skeleton.css";
import { useProfileService } from "@/app/auth/service/auth.service";

interface TableProps {
  columns: any[];
  data: any[];
  actionColumn?: boolean;
  actionData?: any;
  actionColumnInTable?: any;
  onDeleteInTable?: any;
  onUpdateInTable?: any;
  isLoadingInTable?: any;
  isErrorInTable?: any;
  isDisableInTable?: any;
  updateRoute?: any;
  page?: number;
  pageSize?: number;
  setPage?: any;
  setPageSize?: any;
}

const CustomTable: React.FC<TableProps> = ({
  columns,
  data,
  actionColumnInTable = false,
  onDeleteInTable,
  onUpdateInTable,
  isErrorInTable,
  isLoadingInTable,
  isDisableInTable,
  updateRoute,
  page = 1,
  pageSize = 10,
  setPage,
  setPageSize,
}) => {
  const { data: dataProfile } = useProfileService();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const role = dataProfile?.data.role_id.role_name;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="h-full w-full overflow-y-scroll">
      <TableContainer
        overflowY={"scroll"}
        className="mb-5 h-[600px] rounded-lg border border-white bg-white shadow-md"
      >
        <Table className="bg-white">
          <Thead position={"sticky"} top={"0px"} zIndex={500}>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th key={header.id} className="bg-primary" color={"white"}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none flex items-center space-x-1"
                              : "flex items-center space-x-1",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: <TiArrowSortedUp size={15} />,
                            desc: <TiArrowSortedDown size={15} />,
                          }[header.column.getIsSorted() as string] ?? (
                            <TiArrowUnsorted size={15} />
                          )}
                        </div>
                      )}
                    </Th>
                  );
                })}

                {role === "Admin"
                  ? isLoadingInTable
                    ? undefined
                    : actionColumnInTable && (
                        <Th className="bg-primary" color={"primary"}>
                          Action
                        </Th>
                      )
                  : undefined}
              </Tr>
            ))}
          </Thead>

          <Tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Tr key={row.id} className="">
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id} className="">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  ))}

                  {role === "Admin"
                    ? isLoadingInTable
                      ? undefined
                      : actionColumnInTable && (
                          <Td className="" color={"primary"}>
                            <div className="flex w-full flex-col space-y-2">
                              <RouteButton
                                to={`${updateRoute}${row.original?.id}`}
                                title={<FaRegPenToSquare color="white" />}
                                h="35px"
                                width={"full"}
                                bg={"yellow.500"}
                                color={"white"}
                                _hover={{ bg: "yellow.600" }}
                                fontSize={12}
                              />
                              <Button
                                width={"full"}
                                type="button"
                                isLoading={isLoadingInTable}
                                isDisabled={isDisableInTable}
                                h="35px"
                                backgroundColor={"red.500"}
                                _hover={{ bgColor: "red.600" }}
                                fontSize={12}
                                onClick={() =>
                                  onDeleteInTable(row.original?.id)
                                }
                              >
                                <FaTrash color="white" />
                              </Button>
                            </div>
                          </Td>
                        )
                    : undefined}
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={columns.length} className="h-24 text-center">
                  {isLoadingInTable ? (
                    <Skeleton
                      className="mb-5"
                      height={70}
                      count={6}
                      baseColor="#9FA1B5"
                      // highlightColor="#003F37"
                    />
                  ) : (
                    "Tidak ditemukan."
                  )}
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <PaginationMenu
        className={""}
        firstPageButtonIsDisabled={!table.getCanPreviousPage()}
        firstPageButtonOnClick={() => {
          setPage(1);
          return table.setPageIndex(0);
        }}
        previousPageButtonIsDisabled={!table.getCanPreviousPage()}
        previousPageButtonOnClick={() => {
          setPage(page - 1);
          return table.previousPage();
        }}
        inputValue={page}
        inputPageOnChange={(e) => {
          const pageSum = e.target.value ? Number(e.target.value) - 1 : 0;

          setPage(pageSum + 1);
          table.setPageIndex(pageSum);
        }}
        nextPageButtonIsDisabled={!table.getCanNextPage()}
        nextPageButtonOnClick={() => {
          setPage(page + 1);
          return table.nextPage();
        }}
        lastPageButtonIsDisabled={!table.getCanNextPage()}
        lastPageButtonOnClick={() => {
          setPage(table.getPageCount() - 1);
          return table.setPageIndex(table.getPageCount() - 1);
        }}
        pageFrom={table.getState().pagination.pageIndex + 1}
        pageTo={table.getPageCount()}
        currentPageSize={table.getState().pagination.pageSize}
        pageSizeOnClick={(size: number) => {
          setPageSize(size);
          table.setPageSize(size);
        }}
      />
    </div>
  );
};

export default CustomTable;
