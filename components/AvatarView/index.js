import {
  Center,
  Box,
  Heading,
  VStack,
  Button,
  HStack,
  NativeBaseProvider,
  Avatar
} from 'native-base'
import GetAvatarAPi from '../../services/GetAvatarApi'
import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AvatarView({ navigation }) {
  const [genderName, setGenderName] = useState(false)

  return (
    <NativeBaseProvider>
      <Center w="100%">
        <Box safeArea p="2" py="8" w="100%" maxW="330">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            marginBottom={29}
            textAlign={'center'}
            _dark={{
              color: 'warmGray.50'
            }}
          >
            Selecione um Avatar
          </Heading>
          <HStack marginBottom={29} justifyContent="center">
            <Button marginRight={15} onPress={() => setGenderName(true)}>
              Male
            </Button>
            <Button onPress={() => setGenderName(false)}>Female</Button>
          </HStack>
          {genderName == true && (
            <RowAvatar gender="male" navigation={navigation} />
          )}
          {genderName == false && (
            <RowAvatar gender="female" navigation={navigation} />
          )}
        </Box>
      </Center>
    </NativeBaseProvider>
  )
}

function ColumnAvatar({ init, end, gender, navigation }) {
  const [configs, setConfigs] = useState(null)

  async function CallAvatarApi() {
    const getAvatar = await GetAvatarAPi()
    gender == 'female'
      ? setConfigs(getAvatar?.avatarsFemale)
      : setConfigs(getAvatar?.avatarsMale)
  }

  async function NextView(avatarLink) {
    try {
      await AsyncStorage.setItem('avatarLink', avatarLink)
      navigation.navigate('Perfil')
    } catch (e) {
      console.error('os dados nao foi salvo', e)
    }
  }

  useEffect(() => {
    CallAvatarApi()
  }, [])
  return (
    <HStack space={3}>
      {configs &&
        configs?.map((item, index) => {
          if (index >= init && index <= end) {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => NextView(item?.asset?.url)}
              >
                <Avatar
                  bg="amber.400"
                  source={{ uri: item?.asset?.url }}
                  size="xl"
                />
              </TouchableOpacity>
            )
          }
        })}
    </HStack>
  )
}

function RowAvatar({ gender, navigation }) {
  return (
    <VStack space={3}>
      <ColumnAvatar init={0} end={2} gender={gender} navigation={navigation} />
      <ColumnAvatar init={3} end={5} gender={gender} navigation={navigation} />
      <ColumnAvatar init={6} end={8} gender={gender} navigation={navigation} />
      <ColumnAvatar init={9} end={11} gender={gender} navigation={navigation} />
    </VStack>
  )
}
