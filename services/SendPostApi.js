import { clientSanity } from './api'

// Mutation create para criar usuario dentro do banco do SanityIO
const SendPostApi = async (body = '', nickName, id, key) => {
  const newPost = {
    _type: 'post',
    title: nickName,
    body: body,
    author: {
      _ref: id,
      _type: 'reference'
    },
    comments: [
      {
        _key: key,
        text: body,
        author: {
          _ref: id,
          _type: 'reference'
        }
      }
    ]
  }

  try {
    const resposta = await clientSanity.create(newPost, { dryRun: false })
    console.log(resposta)
    return resposta
  } catch (erro) {
    console.error('Erro ao criar o post:', erro.message)
    throw erro
  }
}

export default SendPostApi
