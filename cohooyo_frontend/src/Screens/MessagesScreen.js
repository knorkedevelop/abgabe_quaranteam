import React, { useState, useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { AuthContext } from "../../App";

export default function MessagesScreen() {
  const { authState } = React.useContext(AuthContext);

  const [messages, setMessages] = React.useState([
    {
      _id: 1,
      text: authState.userIsWorker ? "" : "Hallo, ich hätte Interesse!",
      createdAt: authState.userIsWorker ? null : new Date(),
      user: {
        _id: 2,
        name: "GiftedChat",
        avatar: authState.userIsWorker
          ? null
          : "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
      },
    },
  ]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <GiftedChat messages={messages} onSend={(messages) => onSend(messages)} />
    </View>
  );
}
