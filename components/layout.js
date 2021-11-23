import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <div>
        <h2>
          <Link href="/">
            <a>Gateway to Blockchain</a>
          </Link>
        </h2>
      </div>
      <div>{children}</div>
    </div>
  );
}
