import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { Text, TextArea, FlatList, Button } from 'native-base'
import ListScroll from '../ListScroll'
import { useState } from 'react'
import SendCommentApi from '../../services/SendCommentApi'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ChatScreen = ({ route }) => {
  const { body, comments, _id } = route.params
  const [textValue, setTextValue] = useState()
  function GenerateKey(author) {
    const dataActual = new Date()
    return `cmt${author['nickName'] + dataActual}`
  }
  async function SendPostComment() {
    try {
      const dataLogin = await AsyncStorage.getItem('LoginData')
      const author = JSON.parse(dataLogin)
      const key = GenerateKey(author[0]).replace(/\s/g, '')

      if (author !== null) {
        const response = await SendCommentApi(
          _id,
          author[0]['_id'],
          textValue,
          key,
          comments
        )
        console.log(response)
      }
    } catch (e) {
      console.error('erro na chamada da api', e)
    }
  }

  async function GetDataPerfil() {
    try {
      const dataSignUp = await AsyncStorage.getItem('SignUpData')
      const dataAvatar = await AsyncStorage.getItem('avatarLink')
      if (dataSignUp !== null && dataAvatar !== null) {
        const dataExtract = { ...JSON.parse(dataSignUp), avatar: dataAvatar }
        setInfosPerfil(dataExtract)
      }
    } catch (e) {
      console.error('nao conseguimos receber os dados')
    }
  }

  return (
    <NativeBaseProvider>
      {comments && <FlatList data={comments} renderItem={ListScroll} />}
      <TextArea
        placeholder="Comente o desabafo ..."
        onChange={(e) => {
          setTextValue(e.nativeEvent.text)
        }}
      />
      <Button onPress={SendPostComment}>Enviar o desabafo</Button>
    </NativeBaseProvider>
  )
}

export default ChatScreen
