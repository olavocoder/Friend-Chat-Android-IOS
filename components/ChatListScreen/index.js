import React from 'react'
import { Avatar, Button, FlatList, Text } from 'native-base'
import PostApi from '../../services/PostsApi'
import { useEffect, useState } from 'react'
import { NativeBaseProvider, Box } from 'native-base'
import { TouchableOpacity, RefreshControl } from 'react-native-gesture-handler'

const ChatListScreen = ({ navigation, route }) => {
  const [allPosts, setAllPosts] = useState(null)
  const [refreshing, setRefreshing] = useState()

  async function CallPostApi() {
    const getPosts = await PostApi()
    console.log(getPosts)
    setAllPosts(getPosts.allPost)
    setRefreshing(false)
  }

  useEffect(() => {
    CallPostApi()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    setAllPosts([])
    await CallPostApi()
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Chat', { chatId: item['body'] })}
    >
      {item?.author?.defaultImage && (
        <Avatar
          bg="amber.400"
          source={{ uri: item.author.defaultImage }}
          size="xl"
        />
      )}
      <Text>{item?.author?.nickName}</Text>
      <Text>{item?.body}</Text>
    </TouchableOpacity>
  )

  return (
    <NativeBaseProvider>
      {allPosts && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={allPosts}
          renderItem={renderItem}
        />
      )}
      <Button onPress={() => navigation.navigate('VentSend')}>Desabafar</Button>
    </NativeBaseProvider>
  )
}

export default ChatListScreen
