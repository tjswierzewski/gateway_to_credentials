import Image from "next/image";
import styles from "../styles/CredentialTile.module.css";
export default function CredentialTile({ title, description, image }) {
  return (
    <div className={styles.flexbox}>
      <Image src={image.url} width={image.width} height={image.height} alt={image.name} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
