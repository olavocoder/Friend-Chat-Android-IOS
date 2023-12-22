import React from "react";
import { NativeBaseProvider } from "native-base";
import { Text, TextArea } from "native-base";

const ChatScreen = ({ route }) => {
  const { chatId } = route.params;

  return (
    <NativeBaseProvider>
      <Text>{chatId}</Text>
      <TextArea placeholder="Comente o desabafo ..." />
    </NativeBaseProvider>
  );
};

export default ChatScreen;
