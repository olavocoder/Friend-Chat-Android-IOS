import { client } from './api'
import { gql } from '@apollo/client'

// Query para login de funcionarios buscando o banco do sanityIO
const MsgApi = async (name = '') => {
  const queryUser = gql`
    query getMsgs {
      allAuthor(where:{nickName:{eq:"${name}"}}){
        authorsChat{
          author{
            nickName
            defaultImage
          }
          conversation{
            text
            author{
              nickName
            }
          }
        }
      }
    }
  `

  try {
    const resposta = await client.query({ query: queryUser })
    return resposta.data
  } catch (erro) {
    console.error('Erro ao criar o usuario:', erro.message)
    throw erro
  }
}

export default MsgApi
