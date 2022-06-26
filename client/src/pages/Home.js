import { Box } from "@chakra-ui/react";
import { Home } from "components";
import { ChatState } from "context/ChatContext";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Main = () => {
  const history = useHistory();
  const { user } = ChatState();
  //
  useEffect(() => {
    if (!localStorage?.getItem("userInfo")) {
      history.push("/login");
    }
  }, []);
  return (
    <Box>
      {/* sidebar drawer */}
      <Home />
    </Box>
  );
};

export default Main;
