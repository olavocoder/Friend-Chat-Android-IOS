import { Text, View, Image } from 'react-native'
import style from './style'
import {
  NativeBaseProvider,
  Center,
  Avatar,
  Button,
  Heading,
  TextArea,
  VStack
} from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import SignUpApi from '../../services/SignUpApi'

export default function Perfil({ navigation }) {
  const [infosPerfil, setInfosPerfil] = useState(null)
  const [bio, setBio] = useState('')
  useEffect(() => {
    GetDataPerfil()
  }, [])

  async function SendDataRemote() {
    const response = await SignUpApi(infosPerfil, bio)
    console.log(response)
    navigation.navigate('Login')
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
    <NativeBaseProvider style={style.wrapper}>
      {infosPerfil && (
        <Center>
          <Avatar
            m="6"
            bg="blue.400"
            size="2xl"
            source={{ uri: infosPerfil?.avatar }}
          />

          <Heading
            m="6"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.200'
            }}
            fontWeight="medium"
            size="md"
          >
            {infosPerfil?.name}
          </Heading>
          <TextArea
            mb="60"
            h={40}
            placeholder="Digite aqui sua biografia..."
            w="75%"
            maxW="300"
            onChange={(e) => setBio(e.nativeEvent.text)}
          />
          <Button onPress={SendDataRemote}>Save</Button>
        </Center>
      )}
    </NativeBaseProvider>
  )
}
