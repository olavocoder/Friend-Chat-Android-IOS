import { clientSanity } from "./api";

// Mutation create para criar usuario dentro do banco do SanityIO
const SendPostApi = async (body = "") => {
  const newPost = {
    _type: "post",
    title: "olavo",
    body: body,
  };

  try {
    const resposta = await clientSanity.create(newPost);
    console.log(resposta);
    return resposta;
  } catch (erro) {
    console.error("Erro ao criar o post:", erro.message);
    throw erro;
  }
};

export default SendPostApi;