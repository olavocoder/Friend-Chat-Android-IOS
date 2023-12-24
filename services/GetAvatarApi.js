import { client } from './api'
import { gql } from '@apollo/client'

const GetAvatarAPi = async () => {
  const AvatarApi = gql`
    query getApi {
      allConfigs {
        avatarsMale {
          asset {
            url
          }
        }
        avatarsFemale {
          asset {
            url
          }
        }
      }
    }
  `
  try {
    const resposta = await client.query({ query: AvatarApi })
    return resposta.data.allConfigs[0]
  } catch (erro) {
    console.error('Erro ao ler os avatars:', erro.message)
    throw erro
  }
}

export default GetAvatarAPi
