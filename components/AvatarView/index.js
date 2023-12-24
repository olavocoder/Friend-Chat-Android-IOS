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
  NativeBaseProvider,
  Avatar
} from 'native-base'
import GetAvatarAPi from '../../services/GetAvatarApi'
import { useEffect, useState } from 'react'

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
          {genderName == true && <RowAvatar gender="male" />}
          {genderName == false && <RowAvatar gender="female" />}
        </Box>
      </Center>
    </NativeBaseProvider>
  )
}

function ColumnAvatar({ init, end, gender }) {
  const [configs, setConfigs] = useState(null)
  async function CallAvatarApi() {
    const getAvatar = await GetAvatarAPi()
    gender == 'female'
      ? setConfigs(getAvatar?.avatarsFemale)
      : setConfigs(getAvatar?.avatarsMale)
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
              <Avatar
                key={index}
                bg="amber.400"
                source={{ uri: item?.asset?.url }}
                size="xl"
              />
            )
          }
        })}
    </HStack>
  )
}

function RowAvatar({ gender }) {
  return (
    <VStack space={3}>
      <ColumnAvatar init={0} end={2} gender={gender} />
      <ColumnAvatar init={3} end={5} gender={gender} />
      <ColumnAvatar init={6} end={8} gender={gender} />
      <ColumnAvatar init={9} end={11} gender={gender} />
    </VStack>
  )
}
