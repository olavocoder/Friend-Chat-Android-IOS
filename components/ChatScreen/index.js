import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { Text, TextArea, FlatList, Button } from 'native-base'
import ListScroll from '../ListScroll'
import { useState } from 'react'
import SendCommentApi from '../../services/SendCommentApi'

const ChatScreen = ({ route }) => {
  const { body, comments, _id, author } = route.params
  const [textValue, setTextValue] = useState()

  async function SendPostComment() {
    const key = GenerateKey().replace(/\s/g, '')
    try {
      const response = await SendCommentApi(_id, author['_id'], textValue, key)
      console.log(response)
    } catch (e) {
      console.error('erro na chamada da api', e)
    }
  }

  function GenerateKey() {
    const dataActual = new Date()
    return `cmt${author['nickName'] + dataActual}`
  }
  return (
    <NativeBaseProvider>
      <Text>{body}</Text>
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
