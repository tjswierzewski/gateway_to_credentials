import axios from "axios";
import CredentialTile from "../../components/credentialTile";
import Layout from "../../components/layout";
export default function Index({ credentials }) {
  const credentialList = credentials.map((credential) => {
    return (
      <CredentialTile
        key={credential.id}
        title={credential.title}
        description={credential.description}
        image={credential.image.formats.small}
        slug={credential.slug}
      ></CredentialTile>
    );
  });
  return (
    <div>
      <Layout>{credentialList}</Layout>
    </div>
  );
}

export async function getStaticProps() {
  const res = await axios.get("credentials");
  const credentials = res.data;
  return { props: { credentials } };
}
