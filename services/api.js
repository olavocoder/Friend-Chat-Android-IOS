import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createClient } from '@sanity/client'
import { SANITY_API_KEY } from '@env'
import axios from 'axios'

//Endpoint GraphQL
export const client = new ApolloClient({
  uri: 'https://ypsoxphg.api.sanity.io/v2023-12-10/graphql/production/default',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  }
})

//Endpoint SanityIO
export const clientSanity = createClient({
  projectId: 'ypsoxphg',
  apiVersion: '2023-12-10',
  dataset: 'production',
  token: `${SANITY_API_KEY}`, // Opcional, necessário se você configurou autenticação
  useCdn: true // Configuração opcional para evitar o uso de cache CDN
})

export const GeneralAPI = axios.create({
  baseURL: 'https://ypsoxphg.api.sanity.io/v2023-12-10/data/mutate/production',
  headers: {
    Authorization: `Bearer ${SANITY_API_KEY}`, // Substitua pelo seu token de acesso real
    'Content-Type': 'application/json'
  }
})

/* 
curl 'https://ypsoxphg.api.sanity.io/v2021-06-07/data/mutate/production' \
    -H 'Authorization: Bearer skFyoccwvKktOiaH6vEm0QHlvASq1jAcQdkiUkOcRz5vE6iHkkcFiYA84j0F8czDd4uElq5z7DdQbivkAnENsZi0oPG7GxFEUoNrAJQX01ZZdHnUMPKBYmMgXW2oTSzbVU81k9OXf9J7DYmREyTM4vrtuuQZHUXfrsQV6G1PBqpGzXInQPnZ' \
    -H 'Content-Type: application/json' \
    --data-binary '{"mutations":[{"create":{"_type": "post", "title": "nickName", "body": "body"}}]}'
*/
