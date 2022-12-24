import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Avatar,
} from "@chakra-ui/react";

const TableContent = ({ data }) => {
  console.log(data);
  return (
    <TableContainer>
      <Table size="md">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Age</Th>
            <Th>Gender</Th>
            <Th isNumeric>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((el) =>
              el.map((el) => (
                <Tr key={el.email}>
                  <Td>
                    <Avatar src={el.picture.large}></Avatar>
                  </Td>
                  <Td>{`${el.name.title} ${el.name.first} ${el.name.last}`}</Td>
                  <Td>{el.dob.age}</Td>

                  <Td>{el.gender}</Td>
                  <Td isNumeric>{el.email}</Td>
                </Tr>
              ))
            )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableContent;
