import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Text,
  NativeBaseProvider
} from 'native-base'
import style from './style'
import { useState } from 'react'
import LoginApi from '../../services/LoginApi'
import SignUpApi from '../../services/SignUpApi'

export default function SignUp({ navigation }) {
  async function VerifySignUp() {
    const response = await LoginApi(login)
    if (response?.allAuthor?.length == 0 && senha == senhaClone) {
      SignUpApi(login, senha)
      setAproved(true)
      navigation.navigate('Inicio')
    } else {
      setAproved(false)
    }
  }

  return (
    <NativeBaseProvider>
      <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50'
            }}
            fontWeight="semibold"
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200'
            }}
            fontWeight="medium"
            size="xs"
          >
            Sign up to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input type="password" />
            </FormControl>
            <Button
              mt="2"
              colorScheme="indigo"
              onPress={() => navigation.navigate('Login')}
            >
              Sign up
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  )
}

function FormField({ type, name }) {
  return (
    <FormControl>
      <FormControl.Label>{name}</FormControl.Label>
      <Input type={type} />
    </FormControl>
  )
}
