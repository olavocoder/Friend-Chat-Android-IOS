import React from 'react'
import { Avatar, Button, FlatList, Text } from 'native-base'
import { NativeBaseProvider, Box } from 'native-base'
import { TouchableOpacity, RefreshControl } from 'react-native-gesture-handler'

const ListScroll = ({ item }) => {
  return (
    <NativeBaseProvider>
      <TouchableOpacity
        onPress={() => item?.navigation?.navigate('Chat', { ...item })}
      >
        {item?.author?.defaultImage && (
          <Avatar
            bg="amber.400"
            source={{ uri: item.author.defaultImage }}
            size="xl"
          />
        )}
        <Text>{item?.author?.nickName}</Text>
        <Text>{item?.body || item?.text}</Text>
      </TouchableOpacity>
    </NativeBaseProvider>
  )
}

export default ListScroll
