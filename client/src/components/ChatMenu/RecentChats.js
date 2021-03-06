import React from "react";
import classNames from "classnames";
import { Box, Text } from "@chakra-ui/react";

import { ChatState } from "context/ChatContext";
import RecentChatCard from "libs/RecentChatCard";

const RecentChats = ({ chats, loggedUser }) => {
  let { selectedChat, setSelectedChat } = ChatState();
  let startChat = (user) => {
    setSelectedChat(user);
    localStorage.setItem("deafultChat", JSON.stringify(user?._id));
  };

  return (
    <Box className={classNames("pt-4", chats && "mt-8")}>
      <Text
        textDecoration="underline"
        fontSize="18px"
        paddingLeft="5px"
        marginBottom="5px"
        className="text-primaryYellow"
      >
        #Recents
      </Text>
      <Box className="flex flex-col h-auto overflow-y-auto max-h-[220px]">
        {chats
          .filter((c) => c.isGroup !== true)
          ?.map((data, index) => (
            <RecentChatCard
              key={index}
              item={data}
              loggedUser={loggedUser}
              selectedChat={selectedChat}
              handleChat={() => startChat(data)}
            />
          ))}
      </Box>
    </Box>
  );
};

export default RecentChats;
