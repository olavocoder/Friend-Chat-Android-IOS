import { clientSanity } from './api'

// Mutation create para criar usuario dentro do banco do SanityIO
const SendConversationApi = async (
  postId,
  authorId,
  commentText,
  key,
  index
) => {
  const commentObj = {
    _key: key,
    text: commentText,
    author: {
      _ref: authorId,
      _type: 'reference'
    }
  }
  try {
    const resposta = await clientSanity
      .patch(postId)
      .insert('after', `comments[-1]`, [commentObj])
      .commit('', { dryRun: false })
    console.log(resposta)
    return resposta
  } catch (erro) {
    console.error('Erro ao criar o post:', erro.message)
    throw erro
  }
}

export default SendConversationApi
