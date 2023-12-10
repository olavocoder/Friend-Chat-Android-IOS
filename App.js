import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import GoogleMap from "./components/GoogleMap";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { ApolloProvider } from "@apollo/client";
import {client} from "./services/api";
import LoginApi from "./services/LoginApi";
import Buy from "./components/Buy";
import Perfil from "./components/Perfil";
import { StripeProvider } from "@stripe/stripe-react-native";
import {GOOGLE_API_KEY} from '@env'

export default function App() {
  const Stack = createStackNavigator()

  return(
    <StripeProvider publishableKey={GOOGLE_API_KEY}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Inicio" component={Login} />
            <Stack.Screen name="Map" component={GoogleMap} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Buy" component={Buy} />
            <Stack.Screen name="Perfil" component={Perfil} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </StripeProvider>
  );
}
