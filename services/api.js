import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createClient } from "@sanity/client";
import { SANITY_API_KEY } from "@env";

//Endpoint GraphQL
export const client = new ApolloClient({
  uri: "https://ypsoxphg.api.sanity.io/v2023-12-10/graphql/production/default",
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

//Endpoint SanityIO
export const clientSanity = createClient({
  projectId: "ypsoxphg",
  apiVersion: "2023-12-10",
  dataset: "production",
  token: `${SANITY_API_KEY}`, // Opcional, necessário se você configurou autenticação
  useCdn: true, // Configuração opcional para evitar o uso de cache CDN
});
