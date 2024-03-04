"use client";
import React, { useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  MenuGroup,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import RouteButton from "./RouteButton";
import {
  FaClipboardList,
  FaRegPenToSquare,
  FaTrash,
  FaTriangleExclamation,
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
import PaginationMenu from "./PaginationMenu";
import "react-loading-skeleton/dist/skeleton.css";
import { useProfileService } from "@/app/auth/service/auth.service";
import CustomMenuButton from "./MenuButton";
import usePagination from "@/hook/usePagination";

interface TableProps {
  columns: any[];
  data: any[];
  actionColumn?: boolean;
  actionData?: any;
  actionColumnInTable?: any;
  onDeleteInTable?: any;
  onUpdateInTable?: any;
  isLoadingInTable?: boolean;
  isErrorInTable?: any;
  isDisableInTable?: any;
  updateRoute?: any;
  page?: number;
  pageSize?: number;
  setPage?: any;
  setPageSize?: any;
  totalData?: number;
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
  totalData,
}) => {
  const { data: dataProfile } = useProfileService();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const role = dataProfile?.data.role_id.role_name;
  const paginationData = useMemo(() => {
    return {
      page: page ?? 1,
      pageSize: pageSize ?? 10,
      paginationTotal: totalData ?? 0,
    };
  }, [page, pageSize, totalData]);

  const { totalPages, isCanPrevious, isCanNext } =
    usePagination(paginationData);
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
                        <Th className="bg-primary" color={"white"}>
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
                          <Td>
                            <CustomMenuButton>
                              {dataProfile?.data.username ===
                              row.original?.created_by.username ? (
                                <MenuGroup title="Aksi">
                                  <MenuItem
                                    color={"yellow.500"}
                                    icon={<FaRegPenToSquare className="" />}
                                    as="a"
                                    href={`${updateRoute}${row.original?.id}`}
                                    _hover={{
                                      bg: "rgba(214,158,46,0.2)",
                                      boxShadow:
                                        "inset 3px 0px 0px 0px rgba(214,158,46,1)",
                                    }}
                                  >
                                    <RouteButton
                                      title={
                                        <p className="text-base font-normal capitalize text-yellow-500">
                                          edit
                                        </p>
                                      }
                                      h="35px"
                                      bg={"transparent"}
                                      fontSize={12}
                                      isLoading={isLoadingInTable}
                                      isDisabled={isLoadingInTable}
                                    />
                                  </MenuItem>
                                  <MenuItem
                                    color={"red.500"}
                                    icon={<FaTrash className="" />}
                                    onClick={() =>
                                      onDeleteInTable(row.original?.id)
                                    }
                                    _hover={{
                                      bg: "rgba(229,62,62,0.2)",
                                      boxShadow:
                                        "inset 3px 0px 0px 0px rgba(229,62,62,1)",
                                    }}
                                  >
                                    <Button
                                      type="button"
                                      isLoading={isLoadingInTable}
                                      isDisabled={isLoadingInTable}
                                      h="35px"
                                      backgroundColor={"transparent"}
                                      fontSize={12}
                                    >
                                      <p className="text-base font-normal capitalize text-red-500">
                                        hapus
                                      </p>
                                    </Button>
                                  </MenuItem>
                                  <MenuItem
                                    color={"primary"}
                                    icon={<FaClipboardList className="" />}
                                    _hover={{
                                      bg: "rgba(30,82,54,0.2)",
                                      boxShadow:
                                        "inset 3px 0px 0px 0px rgba(30,82,54,1)",
                                    }}
                                  >
                                    <Button
                                      type="button"
                                      isLoading={isLoadingInTable}
                                      isDisabled={isLoadingInTable}
                                      h="35px"
                                      backgroundColor={"transparent"}
                                      fontSize={12}
                                    >
                                      <p className="text-base font-normal capitalize text-primary">
                                        ubah status
                                      </p>
                                    </Button>
                                  </MenuItem>
                                </MenuGroup>
                              ) : undefined}
                              <MenuDivider />
                              <MenuGroup title="Lainnya">
                                <MenuItem
                                  color={"red.500"}
                                  icon={<FaTriangleExclamation className="" />}
                                >
                                  <Button
                                    type="button"
                                    isLoading={isLoadingInTable}
                                    isDisabled={isLoadingInTable}
                                    h="35px"
                                    backgroundColor={"transparent"}
                                    fontSize={12}
                                    _hover={{
                                      bg: "rgba(229,62,62,0.2)",
                                      boxShadow:
                                        "inset 3px 0px 0px 0px rgba(229,62,62,1)",
                                    }}
                                  >
                                    <p className="text-base font-normal capitalize text-red-500">
                                      laporkan
                                    </p>
                                  </Button>
                                </MenuItem>
                              </MenuGroup>
                            </CustomMenuButton>
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
        firstPageButtonIsDisabled={isCanPrevious}
        firstPageButtonOnClick={() => {
          setPage(1);
          return table.setPageIndex(0);
        }}
        previousPageButtonIsDisabled={isCanPrevious}
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
        nextPageButtonIsDisabled={isCanNext}
        nextPageButtonOnClick={() => {
          setPage(page + 1);
          return table.nextPage();
        }}
        lastPageButtonIsDisabled={isCanNext}
        lastPageButtonOnClick={() => setPage(totalPages)}
        pageFrom={table.getState().pagination.pageIndex + 1}
        pageTo={totalPages}
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
