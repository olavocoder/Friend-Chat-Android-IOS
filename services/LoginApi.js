import { client } from './api'
import { gql } from '@apollo/client'

function getPassNumber(userName, passNumber) {
  return passNumber && userName
    ? `(where: {
    nickName:{eq: "${userName}"},
    pass: {eq: "${passNumber}"}
  })`
    : ''
}

// Query para login de funcionarios buscando o banco do sanityIO
const LoginApi = async (user, password) => {
  const queryUser = gql`
    query getUser {
      allAuthor${getPassNumber(user, password)} {
        nickName
        defaultImage
        bio
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

export default LoginApi
