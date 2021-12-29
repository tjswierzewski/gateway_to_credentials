import axios from "axios";
import { useEffect } from "react";
import { SWRConfig } from "swr";
import Layout from "../components/layout";
import getProvider from "../lib/getProvider";
import { initializeGraphQL } from "../lib/graphql-client";
import useUser from "../lib/useUser";
import "../styles/globals.css";

axios.defaults.baseURL = process.env.CMS_URL || "http://localhost:3006/";

const client = initializeGraphQL();

const fetcher = (query) => client.request(query);

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    (async () => {
      await getProvider();
    })();
  }, []);
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        onError: (err) => {
          console.log(err);
        },
      }}
    >
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;
