import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ApolloProvider } from '@apollo/client'
import { client } from './services/api'
import Perfil from './components/Perfil'
import { StripeProvider } from '@stripe/stripe-react-native'
import { GOOGLE_API_KEY, GOOGLE_API_OAUTH } from '@env'
import ChatListScreen from './components/ChatListScreen'
import ChatScreen from './components/ChatScreen'
import VentScreen from './components/VentScreen'
import Header from './components/Header'
import Login from './components/Login'
import SignUp from './components/SignUp'
import AvatarView from './components/AvatarView'

export default function App() {
  const Stack = createStackNavigator()

  const OptionsNavigator = ({ navigation }) => {
    return {
      headerTitle: 'TimeLine',
      headerRight: () => <Header navigation={navigation} />
    }
  }

  return (
    <StripeProvider publishableKey={GOOGLE_API_KEY}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Avatar" component={AvatarView} />
            <Stack.Screen
              name="ChatList"
              component={ChatListScreen}
              options={OptionsNavigator}
            />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="VentSend" component={VentScreen} />
            <Stack.Screen name="Perfil" component={Perfil} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </StripeProvider>
  )
}
