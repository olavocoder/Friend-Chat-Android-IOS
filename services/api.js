import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createClient } from "@sanity/client";

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
    token: 'skvJTyFSBHkAH1jyRhSOjn7F8cH7sC3nO8MU2SCcsdXQYcIVg7FzANuCPdKdfTYxnlXmLu25WdrFuQDqQkFORzRZ8oAhmEjG7HABmd1n4ZipiqgX0bCA9jFx2gjiWLdq1anqnd5cS1L8IoPEih8HVfmD7YCWjSTqGnyTFpHTIsM53TBwxGHS', // Opcional, necessário se você configurou autenticação
    useCdn: true, // Configuração opcional para evitar o uso de cache CDN
});