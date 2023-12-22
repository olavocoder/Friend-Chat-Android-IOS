import { Button, NativeBaseProvider } from 'native-base'
import style from './style'
import { TouchableOpacity } from 'react-native'
export default function Header({ navigation, title }) {
  return (
    <NativeBaseProvider>
      <TouchableOpacity style={style.wrapper}>
        <Button onPress={() => navigation.navigate('Perfil')}>Menu</Button>
      </TouchableOpacity>
    </NativeBaseProvider>
  )
}
