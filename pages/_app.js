import axios from "axios";
import { useEffect } from "react";
import Layout from "../components/layout";
import getProvider from "../lib/getProvider";
import "../styles/globals.css";

axios.defaults.baseURL = process.env.CMS_URL || "http://localhost:3006/";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    (async () => {
      await getProvider();
    })();
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}

export default MyApp;
