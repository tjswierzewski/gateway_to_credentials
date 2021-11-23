import axios from "axios";
import Layout from "../../utils/components/layout";
export default function Index({ credentials }) {
  const credentialList = credentials.map((credential) => {
    return (
      <div key={credential.id}>
        <p>{credential.title}</p>
      </div>
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
