import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  NativeBaseProvider
} from 'native-base'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SignUp({ navigation }) {
  const [nickName, setNickName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [passConfirm, setPassConfirm] = useState('not')
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  async function SendSignUp() {
    if (
      VerifyFields(nickName.length >= 6) &&
      VerifyFields(regexEmail.test(email)) &&
      VerifyFields(pass == passConfirm)
    ) {
      const data = {
        name: nickName,
        email: email,
        pass: pass
      }
      try {
        await AsyncStorage.setItem('SignUpData', JSON.stringify(data))
        navigation.navigate('Avatar')
      } catch (e) {
        console.error('os dados nao foi salvo', e)
      }
    }
  }

  function VerifyFields(condition) {
    if (condition) return true
    else return false
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
            <FormField
              name="Nickname"
              setValues={setNickName}
              msg="Numero minimo de 6 caracters"
              validation={() => VerifyFields(nickName.length >= 6)}
            />
            <FormField
              name="Email"
              setValues={setEmail}
              validation={() => VerifyFields(regexEmail.test(email))}
            />
            <FormField name="Password" type="password" setValues={setPass} />
            <FormField
              name="Confirm Password"
              type="password"
              setValues={setPassConfirm}
              validation={() => VerifyFields(pass == passConfirm)}
              msg="Numero minimo de 6 caracters"
            />
            <Button mt="2" colorScheme="indigo" onPress={SendSignUp}>
              Sign up
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  )
}

function FormField({
  type = '',
  name,
  setValues,
  msg,
  validation = () => true
}) {
  return (
    <FormControl isRequired>
      <FormControl.Label>{name}</FormControl.Label>
      <Input
        type={type}
        onChange={(e) => {
          setValues(e.nativeEvent.text)
        }}
      />
      {!validation() && (
        <FormControl.HelperText
          _text={{
            fontSize: 'xs'
          }}
        >
          {msg}
        </FormControl.HelperText>
      )}
    </FormControl>
  )
}
