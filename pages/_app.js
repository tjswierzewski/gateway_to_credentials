import axios from "axios";
import "../styles/globals.css";

axios.defaults.baseURL = process.env.CMS_URL | "http://localhost:1337/";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
