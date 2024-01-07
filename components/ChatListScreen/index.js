import React from 'react'
import { Avatar, Button, FlatList, Text } from 'native-base'
import PostApi from '../../services/PostsApi'
import { useEffect, useState } from 'react'
import { NativeBaseProvider, Box } from 'native-base'
import { TouchableOpacity, RefreshControl } from 'react-native-gesture-handler'
import ListScroll from '../ListScroll'
import mapNavigation from '../../hooks/mapNavigation'

const ChatListScreen = ({ navigation, route }) => {
  const [allPosts, setAllPosts] = useState(null)
  const [refreshing, setRefreshing] = useState()

  async function CallPostApi() {
    const getPosts = await PostApi()
    if (getPosts.allPost) {
      getPosts.allPost = mapNavigation(
        getPosts.allPost,
        navigation,
        'Conversation',
        'Chat'
      )
    }
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

  return (
    <NativeBaseProvider>
      {allPosts && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={allPosts}
          renderItem={ListScroll}
        />
      )}
      <Button onPress={() => navigation.navigate('VentSend')}>Desabafar</Button>
    </NativeBaseProvider>
  )
}

export default ChatListScreen
