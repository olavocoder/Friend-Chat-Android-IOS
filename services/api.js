import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createClient } from "@sanity/client";
import {STRIPE_API_KEY} from "@env"

//Endpoint GraphQL
export const client = new ApolloClient({
    uri:'https://lxpq608x.api.sanity.io/v2023-08-01/graphql/production/default',
    cache: new InMemoryCache()
})

//Endpoint SanityIO
export const clientSanity = createClient({
    projectId: 'lxpq608x',
    apiVersion: '2023-08-01',
    dataset: 'production',
    token: {STRIPE_API_KEY}, // Opcional, necessário se você configurou autenticação
    useCdn: true, // Configuração opcional para evitar o uso de cache CDN
});