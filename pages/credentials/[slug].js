import axios from "axios";
import Image from "next/image";

export default function Credential({ credential }) {
  const image = credential.image.formats.medium;
  return (
    <div>
      <Image src={image.url} width={image.width} height={image.height} alt={image.name} />
      <h3>{credential.title}</h3>
      <p>{credential.description}</p>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const res = await axios.get(`credentials?slug=${params.slug}`);
  const [credential] = res.data;
  return {
    props: {
      credential,
    },
  };
}

export async function getStaticPaths() {
  const res = await axios.get("credentials/paths");
  const paths = res.data;
  return { paths, fallback: false };
}
