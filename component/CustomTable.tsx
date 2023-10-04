'use client';
import React from 'react';
import { useTable } from 'react-table';
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
} from '@chakra-ui/react';

interface TableProps {
  columns: any[];
  data: any[];
  actionColumn?: boolean;
  actionData?: any;
}

const CustomTable: React.FC<TableProps> = ({
  columns,
  data,
  actionColumn = false,
  actionData,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="w-full h-full overflow-y-scroll">
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
                    className="text-white bg-primary"
                    color={'#ffffff'}
                    {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
                  </Th>
                ))}
                {actionColumn && (
                  <Th className="text-white bg-primary" color={'#ffffff'}>
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
                    <Td className="text-primary"  {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </Td>
                  ))}
                  {actionColumn && (
                    <Td className="text-primary" color={'#ffffff'}>
                      {actionData}
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
