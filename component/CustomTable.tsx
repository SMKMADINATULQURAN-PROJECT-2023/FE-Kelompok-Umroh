"use client";
import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Input,
} from "@chakra-ui/react";
import RouteButton from "./RouteButton";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
  FaRegPenToSquare,
  FaTrash,
} from "react-icons/fa6";
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
      <TableContainer className="mb-5 h-[600px] rounded-lg border border-primary">
        <Table>
          <Thead>
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
                      {isLoadingInTable
                        ? Array.from({ length: 6 }, (_, i) => (
                            <div
                              key={i}
                              className="flex w-full overflow-hidden rounded-[10px]"
                            >
                              <Skeleton
                                height={200}
                                count={1}
                                baseColor="#1c1e3b"
                              />
                            </div>
                          ))
                        : flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
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
                  Tidak ditemukan.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <section className="mb-3 flex w-full items-center">
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-2">
            <Button
              size={"sm"}
              backgroundColor={"#262A56"}
              disabled={!table.getCanPreviousPage()}
              onClick={() => {
                setPage(0);
                return table.setPageIndex(0);
              }}
            >
              <FaAnglesLeft color="#ffffff" />
            </Button>
            <Button
              size={"sm"}
              backgroundColor={"#262A56"}
              disabled={!table.getCanPreviousPage()}
              onClick={() => {
                setPage(page - 1);
                return table.previousPage();
              }}
            >
              <FaAngleLeft color="#ffffff" />
            </Button>
          </div>

          <div>
            <Input
              type="number"
              size={"sm"}
              borderRadius={"5px"}
              border={"1px solid #262A56"}
              width={"60px"}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 rounded border p-1 text-center"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button
              size={"sm"}
              backgroundColor={"#262A56"}
              disabled={!table.getCanNextPage()}
              onClick={() => {
                setPage(page + 1);
                return table.nextPage();
              }}
            >
              <FaAngleRight color="#ffffff" />
            </Button>
            <Button
              size={"sm"}
              backgroundColor={"#262A56"}
              disabled={!table.getCanNextPage()}
              onClick={() => {
                setPage(table.getPageCount() - 1);
                return table.setPageIndex(table.getPageCount() - 1);
              }}
            >
              <FaAnglesRight color="#ffffff" />
            </Button>
          </div>
        </div>

        <div className="ml-2">
          <span className="flex items-center gap-1">
            <div> | Halaman</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} dari{" "}
              {table.getPageCount()}
            </strong>
          </span>
        </div>
      </section>

      <section className="flex w-full items-center">
        <div className="flex items-center space-x-4">
          <p className="">Jumlah Per Halaman</p>
          <div className="flex items-center space-x-2">
            {[10, 20, 30, 40, 50].map((pageSize, i) => (
              <Button
                size={"sm"}
                key={pageSize}
                backgroundColor={
                  pageSize === table.getState().pagination.pageSize
                    ? "#262a56"
                    : ""
                }
                color={
                  pageSize === table.getState().pagination.pageSize
                    ? "white"
                    : "#262a56"
                }
                onClick={(e) => {
                  table.setPageSize(Number(pageSize));
                }}
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

export default CustomTable;
