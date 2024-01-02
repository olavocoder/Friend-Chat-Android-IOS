import React from 'react'
import { UseBackgroundQueryResult } from '@apollo/client'
import SendPostApi from '../../services/SendPostApi'
import { useState } from 'react'
import { TextArea, Button, Text, FlatList } from 'native-base'
import { NativeBaseProvider } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'

const VentScreen = ({ navigation }) => {
  const [comment, setComment] = useState()

  async function SendVent() {
    const dataLogin = await AsyncStorage.getItem('LoginData')
    if (dataLogin !== null) {
      const dataExtract = JSON.parse(dataLogin)
      const { nickName, _id } = dataExtract[0]
      const response = await SendPostApi(comment, nickName, _id)
      if (response) navigation.navigate('ChatList', { change: true })
    }
  }

  return (
    <NativeBaseProvider>
      <TextArea
        placeholder="Digite aqui seu desabafo ..."
        onChange={(e) => {
          setComment(e.nativeEvent.text)
        }}
      />
      <Button onPress={SendVent}>Enviar Desabafo</Button>
    </NativeBaseProvider>
  )
}

export default VentScreen
