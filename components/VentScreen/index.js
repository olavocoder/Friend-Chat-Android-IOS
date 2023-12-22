import React from "react";
import { UseBackgroundQueryResult } from "@apollo/client";
import SendPostApi from "../../services/SendPostApi";
import { useState } from "react";
import { TextArea, Button, Text } from "native-base";
import { NativeBaseProvider } from "native-base";

const VentScreen = ({ navigation }) => {
  const [comment, setComment] = useState();

  async function SendVent() {
    const response = await SendPostApi(comment);
    if (response) navigation.navigate("ChatList", { change: true });
  }

  return (
    <NativeBaseProvider>
      <TextArea
        placeholder="Digite aqui seu desabafo ..."
        onChange={(e) => {
          setComment(e.nativeEvent.text);
        }}
      />
      <Button onPress={SendVent}>Enviar Desabafo</Button>
    </NativeBaseProvider>
  );
};

export default VentScreen;
