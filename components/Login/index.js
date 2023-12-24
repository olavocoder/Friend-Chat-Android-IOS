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
  Avatar,
  NativeBaseProvider
} from 'native-base'
import style from './style'
import { useEffect, useState } from 'react'
import LoginApi from '../../services/LoginApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GOOGLE_API_OAUTH } from '@env'

export default function Login({ navigation }) {
  return (
    <NativeBaseProvider>
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50'
            }}
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: 'warmGray.200'
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Sign in to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
            </FormControl>
            <Button
              mt="2"
              colorScheme="indigo"
              onPress={() => navigation.navigate('Avatar')}
            >
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200'
                }}
              >
                I'm a new user.
              </Text>
              <Link
                _text={{
                  color: 'indigo.500',
                  fontWeight: 'medium',
                  fontSize: 'sm'
                }}
                onPress={() => navigation.navigate('SignUp')}
              >
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  )
}
