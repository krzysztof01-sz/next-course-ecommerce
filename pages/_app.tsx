import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Layout } from "../components/Layout";
import seo from "../next-seo.config";
import { DefaultSeo } from "next-seo";
import { CartContextProvider } from "../contexts/CartContext";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <QueryClientProvider client={client}>
        <Layout>
          <DefaultSeo {...seo} />
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </CartContextProvider>
  );
}

export default MyApp;
