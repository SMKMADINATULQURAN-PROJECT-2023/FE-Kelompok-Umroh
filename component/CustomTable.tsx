"use client";
import React from "react";
import { useTable } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import RouteButton from "./RouteButton";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";

interface TableProps {
  columns: any[];
  data: any[];
  actionColumn?: boolean;
  actionData?: any;
  actionColumnInTable?: any;
  onDeleteInTable?: any;
  onUpdateInTable?: any;
  isLoadingInTable?: any;
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
  isLoadingInTable,
  isDisableInTable,
  updateRoute,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="h-full w-full overflow-y-scroll">
      <TableContainer>
        <Table
          // variant="striped"
          // colorScheme="telegram"
          className="table"
          {...getTableProps()}
        >
          <Thead>
            {headerGroups.map((headerGroup, i) => (
              <Tr className="text-white" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    className="bg-primary text-white"
                    color={"#ffffff"}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </Th>
                ))}
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

          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td className="text-primary" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </Td>
                  ))}
                  {actionColumn && (
                    <Td className="text-primary" color={"#ffffff"}>
                      {actionData}
                    </Td>
                  )}

                  {actionColumnInTable && (
                    <Td className="text-primary" color={"#ffffff"}>
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
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomTable;
