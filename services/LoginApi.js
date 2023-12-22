import { client } from "./api";
import { gql } from "@apollo/client";

function getPassNumber(passNumber) {
  return passNumber ? `, pass:{eq:"${passNumber}"}` : "";
}

// Query para login de funcionarios buscando o banco do sanityIO
const LoginApi = async (user, password) => {
  const queryUser = gql`
    query getUser {
      allAuthor {
        name
        bio
        image {
          asset {
            url
          }
        }
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
