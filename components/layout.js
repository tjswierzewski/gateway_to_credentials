import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import getProvider from "../lib/getProvider";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  const route = useRouter();

  const isHome = () => {
    return route.pathname === "/";
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("/challenge");
    const output = await window.kilt.sporran.signWithDid(data);

    const res = await axios.post("/verify", output, { withCredentials: true });

    const user = res.data;

    if (res.status === 200) console.log(user);
    else console.log("error");
  };

  return (
    <>
      <div className={styles.header}>
        <h2 className={clsx({ [styles.hidden]: isHome() })}>
          <Link href="/">
            <a>Gateway to Blockchain</a>
          </Link>
        </h2>
        <a onClick={handleClick} className={styles.button}>
          Login
        </a>
      </div>
      <div>{children}</div>
    </>
  );
}
