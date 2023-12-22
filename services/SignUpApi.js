import { clientSanity } from "./api";

// Mutation create para criar usuario dentro do banco do SanityIO
const SignUpApi = async (user, password) => {
  const newUser = {
    _type: "author",
    name: user,
    pass: password,
  };

  try {
    const resposta = await clientSanity.create(newUser);
    return resposta;
  } catch (erro) {
    console.error("Erro ao criar o usuario:", erro.message);
    throw erro;
  }
};

export default SignUpApi;
