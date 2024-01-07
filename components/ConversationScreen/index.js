import React from 'react'
import { Card, NativeBaseProvider } from 'native-base'
import { Text, TextArea, FlatList, Button } from 'native-base'
import ListScroll from '../ListScroll'
import { useState, useEffect } from 'react'
import SendCommentApi from '../../services/SendCommentApi'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ConversationScreen = ({ route }) => {
  console.log(route.params)
  useEffect(() => {
    GetDataMsg
  }, [])
  async function GetDataMsg() {
    try {
      const dataLogin = await AsyncStorage.getItem('LoginData')
      const author = JSON.parse(dataLogin)
      console.log('conversation list', author)
    } catch (e) {
      console.error('erro ao recuperar os dados do localStorage', e)
    }
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
  return (
    <NativeBaseProvider>
      {route?.params?.conversation && (
        <FlatList data={route?.params?.conversation} renderItem={ListScroll} />
      )}
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

export default ConversationScreen
