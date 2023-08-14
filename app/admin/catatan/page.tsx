"use client";
import React from "react";
import useCatatan from "./service";
import { useRouter } from "next/navigation";
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
  Badge,
  Button,
} from "@chakra-ui/react";
import { dateUtil } from "@/utils";

const Page = () => {
  const { useCatatanList } = useCatatan();
  const router = useRouter();

  const { data } = useCatatanList();
  return (
    <>
      {/* <div>{JSON.stringify(data)}</div> */}
      <Button
        onClick={() => {
          router.push("tambah");
        }}
        colorScheme="teal"
        variant="outline"
        spinnerPlacement="start"
      >
        Tambah
      </Button>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Tanggal</Th>
              <Th>Nama Siswa</Th>
              <Th>Kategori</Th>
              <Th>Keterangan</Th>
              <Th isNumeric>Poin</Th>
              <Th>dibuat oleh</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.data.map((item, index) => (
                <Tr key={item.id}>
                  <Td>{index + 1}</Td>
                  <Td>{dateUtil.formatDateInd(item.tanggal)}</Td>
                  <Td>{item.siswa.nama_siswa}</Td>
                  <Td>
                    {item.kategori === 2 ? (
                      <Badge
                        variant="outline"
                        paddingX={5}
                        rounded={"lg"}
                        colorScheme="green"
                      >
                        Prestasi
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        paddingX={5}
                        rounded={"lg"}
                        colorScheme="red"
                      >
                        Pelanggaran
                      </Badge>
                    )}
                  </Td>
                  <Td>{item.keterangan}</Td>
                  <Td isNumeric>{item.poin}</Td>
                  <Td>{item.created_by.nama}</Td>
                </Tr>
              ))}
          </Tbody>
          {/* <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot> */}
        </Table>
      </TableContainer>
    </>
  );
};

export default Page;
