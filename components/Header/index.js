import { Button, NativeBaseProvider, HStack } from 'native-base'
import style from './style'
import { TouchableOpacity } from 'react-native'
export default function Header({ navigation, title }) {
  return (
    <NativeBaseProvider>
      <TouchableOpacity style={style.wrapper}>
        <HStack>
          <Button onPress={() => navigation.navigate('ConversationList')}>
            Chat
          </Button>
          <Button onPress={() => navigation.navigate('Perfil')}>Menu</Button>
        </HStack>
      </TouchableOpacity>
    </NativeBaseProvider>
  )
}
