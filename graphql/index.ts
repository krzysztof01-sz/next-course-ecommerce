import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cla31zii22kel01upgirz7sb8/master",
  cache: new InMemoryCache(),
});
