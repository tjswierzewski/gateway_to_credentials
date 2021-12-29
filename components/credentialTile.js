import Image from "next/image";
import Link from "next/link";
import styles from "../styles/CredentialTile.module.css";
export default function CredentialTile({ title, description, image, slug }) {
  const link = `/credentials/${slug}`;
  return (
    <div className={styles.flexbox}>
      <Image
        src={image.url}
        width={image.sizesMeta.sm.width}
        height={image.sizesMeta.sm.height}
        alt={image.name}
      />
      <Link href={link} passHref>
        <h3>{title}</h3>
      </Link>
      <p>{description}</p>
    </div>
  );
}
