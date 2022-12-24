import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Flex,
  Button,
  Heading,
  AlertDialog,
  useDisclosure,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [fetch, setFetch] = useState(null);

  function fetchUsers() {
    if (fetch == true) {
      alert("Fetching already in progress");
    } else {
      setFetch(null);
      axios
        .post("http://localhost:8080/post")
        // .post("https://cointab-backend-production-aa93.up.railway.app/post")
        .then((res) => {
          console.log(res.data);
          setFetch(true);
        });
    }
  }

  function deleteUser() {
    onClose();
    axios
      .delete("http://localhost:8080/delete")
      .then((res) => console.log(res.messege));
  }

  return (
    <Box>
      <Heading textAlign={"center"} mt="5rem">
        Home Page
      </Heading>
      <Flex justifyContent={"center"} mt="10%" gap={"1.5rem"}>
        <Button onClick={fetchUsers} colorScheme="facebook">
          Fetch Users
        </Button>
        <Box>
          <Button colorScheme="red" onClick={onOpen}>
            Delete Users
          </Button>

          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Users
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to delete? You can't undo this action
                  afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={deleteUser} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>
        <Link to={"/user"}>
          <Button colorScheme="green">User Details</Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default HomePage;
