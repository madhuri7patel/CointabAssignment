import React, { useEffect, useState } from "react";
import TableContent from "../Components/TableContent";
import Pagination from "../Components/Pagination";
import { Flex, Box, Button, Heading, Select } from "@chakra-ui/react";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [gender, setGender] = useState("");
  const [sortAge, setSortAge] = useState("");

  function getData() {
    fetch("http://localhost:8080")
      .then((res) => res.json())
      .then((res) => {
        if (res.length != 0) {
          setData(res);
          setFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handlePageChange = (val) => {
    setPage(val);
  };

  useEffect(() => {
    getData();
  }, [flag]);

  const newData = data.map((el) =>
    el.results.slice((page - 1) * 10, page * 10)
  );

  const filterData = newData.map((el) =>
    el.filter((el) => (gender ? el.gender == gender : ""))
  );

  const sortData = filterData.map((el) =>
    el.sort((a, b) =>
      sortAge == "asc" ? a.dob.age - b.dob.age : b.dob.age - a.dob.age
    )
  );

  return (
    <Box>
      <Heading textAlign={"center"} mt="2rem">
        Users Detail Page
      </Heading>
      <Flex w="43%" m={"auto"} mt="1rem">
        <Select
          placeholder="Gender"
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>
        <Select placeholder="Age" onChange={(e) => setSortAge(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Select>
      </Flex>
      <Flex justifyContent="center" mt={"3rem"}>
        {flag ? (
          <Box>
            <TableContent
              data={gender ? filterData && filterData : newData && newData}
            />
            <Box display={"flex"} justifyContent="center" mt={"1rem"}>
              <Button
                mr={".5rem"}
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page <= 1}
              >
                {"Prev"}
              </Button>
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                handlePageChange={handlePageChange}
              />
              <Button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page == totalPages}
              >
                {"Next"}
              </Button>
            </Box>
          </Box>
        ) : (
          <h1>{"No data found"}</h1>
        )}
      </Flex>
    </Box>
  );
};

export default UserPage;
