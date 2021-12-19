import { randomAsHex } from "@polkadot/util-crypto";
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
    const input = randomAsHex(16);
    const output = await window.kilt.sporran.signWithDid(input);

    const method = "POST";
    const url = "/api/validate-signature";
    const body = JSON.stringify({ output, input });
    const headers = { ContentType: "application/json" };

    console.log(body);

    const res = await fetch(url, { method, headers, body });
    if (res.ok) console.log("success");
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
