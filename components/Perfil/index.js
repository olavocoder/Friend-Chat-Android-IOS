import { Text, View, Image } from 'react-native'
import style from './style'
import { NativeBaseProvider, Center, Avatar, Button } from 'native-base'

export default function Perfil({ navigation }) {
  return (
    <NativeBaseProvider style={style.wrapper}>
      <Center>
        <Avatar bg="blue.400" size="2xl" />
        <Text>Nome do author</Text>
      </Center>
    </NativeBaseProvider>
  )
}
