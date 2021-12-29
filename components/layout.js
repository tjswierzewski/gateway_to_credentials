import axios from "axios";
import clsx from "clsx";
import { gql } from "graphql-request";
import Link from "next/link";
import { useRouter } from "next/router";
import { initializeGraphQL } from "../lib/graphql-client";
import useUser from "../lib/useUser";
import styles from "../styles/Layout.module.css";

export const LOGOUT = gql`
  mutation LogOut {
    endSession
  }
`;

const client = initializeGraphQL();

export default function Layout({ children }) {
  const route = useRouter();
  const { user, error } = useUser();

  const authenticatedUser = user?.authenticatedItem?.DID;

  const isHome = () => {
    return route.pathname === "/";
  };

  const handleLogInClick = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("/challenge", { withCredentials: true });
    const output = await window.kilt.sporran.signWithDid(data);

    const res = await axios.post("/verify", output, { withCredentials: true });

    const user = res.data;

    if (res.status === 200) console.log(user);
    else console.log("error");
  };

  const handleLogOutClick = async (e) => {
    e.preventDefault();
    client.request(LOGOUT);
  };

  const signin = authenticatedUser ? (
    <a onClick={handleLogOutClick} className={styles.button}>
      Log Out
    </a>
  ) : (
    <a onClick={handleLogInClick} className={styles.button}>
      Log in
    </a>
  );
  return (
    <>
      <div className={styles.header}>
        <h2 className={clsx({ [styles.hidden]: isHome() })}>
          <Link href="/">
            <a>Gateway to Blockchain</a>
          </Link>
        </h2>
        {signin}
      </div>
      <div>{children}</div>
    </>
  );
}
