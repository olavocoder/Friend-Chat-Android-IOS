import React from 'react'
import { Card, NativeBaseProvider } from 'native-base'
import { Text, TextArea, FlatList, Button } from 'native-base'
import ListScroll from '../ListScroll'
import { useState, useEffect } from 'react'
import SendCommentApi from '../../services/SendCommentApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MsgApi from '../../services/MsgApi'
import mapNavigation from '../../hooks/mapNavigation'
const ConversationListScreen = ({ route, navigation }) => {
  const [msgList, setMsgList] = useState(null)
  useEffect(() => {
    GetDataMsg()
  }, [])
  async function GetDataMsg() {
    try {
      const dataLogin = await AsyncStorage.getItem('LoginData')
      const authorData = JSON.parse(dataLogin)
      console.log('conversation list', authorData)
      if (authorData[0].nickName) {
        let msgData = await MsgApi(authorData[0].nickName)
        console.log('retorno da mensagem', msgData?.allAuthor[0]?.authorsChat)
        msgData = mapNavigation(
          msgData?.allAuthor[0]?.authorsChat,
          navigation,
          'Conversation',
          'Conversation'
        )

        setMsgList(msgData)
      }
    } catch (e) {
      console.error('erro ao recuperar os dados do localStorage', e)
    }
  }

  return (
    <NativeBaseProvider>
      {msgList && <FlatList data={msgList} renderItem={ListScroll} />}
    </NativeBaseProvider>
  )
}

export default ConversationListScreen
