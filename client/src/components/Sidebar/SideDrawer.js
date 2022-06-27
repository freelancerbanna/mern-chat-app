import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
} from "@chakra-ui/react";

import UserMenuCard from "helpers/UserMenuCard";
import { toast } from "react-toastify";
import axios from "axios";
import ModalLoading from "helpers/ModalLoading";

const SideDrawer = ({ isOpen, onClose, btnRef, user, notification }) => {
  let [loading, setLoading] = useState(false);
  let [results, setResults] = useState([]);
  let [search, setSearch] = useState("");
  let clear = () => {
    setResults([]);
    setSearch("");
  };
  let handleSearchUser = async () => {
    setLoading(true);
    if (!search) {
      setLoading(false);
      return false;
    }
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}user/searchusers?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setTimeout(() => {
        data && setLoading(false);
      }, [1000]);
      data && setResults(data);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton onClick={clear} />
        <DrawerHeader>Search</DrawerHeader>
        <DrawerBody overflowX="hidden" overflowY="autho">
          <Box position="relative" display="flex" gap="5px">
            <Input
              placeholder="Search user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <IconButton
              aria-label="Search user"
              icon={<BiSearchAlt />}
              onClick={handleSearchUser}
            />
          </Box>
          {loading ? (
            <ModalLoading />
          ) : (
            results?.map((item, index) => (
              <Box marginY="10px" key={index}>
                <UserMenuCard item={item} groupModal={true} />
              </Box>
            ))
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SideDrawer;
