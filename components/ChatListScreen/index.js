import React from 'react'
import { Avatar, Button, FlatList, Text } from 'native-base'
import PostApi from '../../services/PostsApi'
import { useEffect, useState } from 'react'
import { NativeBaseProvider, Box } from 'native-base'
import { TouchableOpacity, RefreshControl } from 'react-native-gesture-handler'

const ChatListScreen = ({ navigation, route }) => {
  const { user } = route.params
  console.log(user)
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

  const data = [
    { id: '1', title: 'Chat 1' },
    { id: '2', title: 'Chat 2' }
    // ... add more chats
  ]

  const onRefresh = async () => {
    setRefreshing(true)
    setAllPosts([])
    await CallPostApi()
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Chat', { chatId: item['body'] })}
    >
      {item?.author?.image?.asset?.url && (
        <Avatar
          bg="amber.400"
          source={{ uri: item.author.image.asset.url }}
          size="xl"
        />
      )}
      <Text>{item?.author?.name}</Text>
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
