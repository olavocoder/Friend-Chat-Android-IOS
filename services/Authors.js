import { client } from "./api";
import { gql } from "@apollo/client";

// Query para login de funcionarios buscando o banco do sanityIO
const AuthorApi = async (user, password) => {
  const queryUser = gql`
    query getUser {
      allAuthor {
        name
      }
    }
  `;

  try {
    const resposta = await client.query({ query: queryUser });
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao criar o usuario:", erro.message);
    throw erro;
  }
};

export default LoginApi;
