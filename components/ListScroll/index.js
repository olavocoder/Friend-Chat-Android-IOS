import React from 'react'
import { Avatar, Button, FlatList, Text } from 'native-base'
import { NativeBaseProvider, Box } from 'native-base'
import { TouchableOpacity, RefreshControl } from 'react-native-gesture-handler'

const ListScroll = ({ item }) => {
  console.log('item dentro da lista', item)
  return (
    <NativeBaseProvider>
      <TouchableOpacity
        onPress={() => item?.navigation?.navigate(item?.navAvatar, { ...item })}
      >
        {item?.author?.defaultImage && (
          <Avatar
            bg="amber.400"
            source={{ uri: item.author.defaultImage }}
            size="xl"
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => item?.navigation?.navigate(item?.navText, { ...item })}
      >
        <Text>{item?.author?.nickName}</Text>
        <Text>{item?.body || item?.text || item?.conversation[0]?.text}</Text>
      </TouchableOpacity>
    </NativeBaseProvider>
  )
}

export default ListScroll
