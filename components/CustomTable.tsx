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
}

const CustomTable: React.FC<TableProps> = ({
  columns,
  data,
  actionData,
  actionColumn = false,
  actionColumnInTable = false,
  onDeleteInTable,
  onUpdateInTable,
  isErrorInTable,
  isLoadingInTable,
  isDisableInTable,
  updateRoute,
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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

  // console.log("page", table.getState().pagination.pageSize);

  return (
    <div className="h-full w-full overflow-y-scroll">
      <TableContainer
        overflowY={"scroll"}
        className="mb-5 h-[600px] rounded-lg border border-primary"
      >
        <Table>
          <Thead position={"sticky"} top={"0px"} zIndex={500}>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      className="bg-primary text-white"
                      color={"#ffffff"}
                    >
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

                {actionColumn && (
                  <Th className="bg-primary text-white" color={"#ffffff"}>
                    Action
                  </Th>
                )}

                {actionColumnInTable && (
                  <Th className="bg-primary text-white" color={"#ffffff"}>
                    Action
                  </Th>
                )}
              </Tr>
            ))}
          </Thead>

          <Tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Tr key={row.id} className="">
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id} className="">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}

                  {actionColumn && (
                    <Td className="text-primary" color={"#ffffff"}>
                      {actionData}
                    </Td>
                  )}

                  {actionColumnInTable && (
                    <Td className="" color={"#ffffff"}>
                      <div className="flex w-full flex-col space-y-2">
                        <RouteButton
                          to={`${updateRoute}${row.original?.id}`}
                          title={<FaRegPenToSquare color="#ffffff" />}
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
                          color={"#ffffff"}
                          _hover={{ bgColor: "red.600" }}
                          fontSize={12}
                          onClick={() => onDeleteInTable(row.original?.id)}
                        >
                          <FaTrash color="#ffffff" />
                        </Button>
                      </div>
                    </Td>
                  )}
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
                      highlightColor="#1c1e3b"
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
          const page = e.target.value ? Number(e.target.value) - 1 : 0;
          table.setPageIndex(page);
          setPage(page + 1);
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
        pageSizeOnClick={(pageSize: number) => {
          setPageSize(pageSize);
          table.setPageSize(pageSize);
        }}
      />
    </div>
  );
};

export default CustomTable;
