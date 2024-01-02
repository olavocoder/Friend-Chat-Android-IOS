import { clientSanity } from './api'

// Mutation create para criar usuario dentro do banco do SanityIO
const SignUpApi = async ({ name, pass, email, avatar }, bio) => {
  const newUser = {
    _type: 'author',
    nickName: name,
    pass: pass,
    email: email,
    defaultImage: avatar,
    bio: bio
  }

  try {
    const resposta = await clientSanity.create(newUser)
    return resposta
  } catch (erro) {
    console.error('Erro ao criar o usuario:', erro.message)
    throw erro
  }
}

export default SignUpApi
