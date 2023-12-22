import { client } from "./api";
import { gql } from "@apollo/client";

// Query para login de funcionarios buscando o banco do sanityIO
const PostApi = async (user, password) => {
  const queryUser = gql`
    query getPost {
      allPost {
        _id
        body
        author {
          name
          image {
            asset {
              url
            }
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

export default PostApi;
