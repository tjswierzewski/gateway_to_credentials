import axios from "axios";
export default function Index({ credentials }) {
  const credentialList = credentials.map((credential) => {
    return (
      <div key={credential.id}>
        <p>{credential.title}</p>
      </div>
    );
  });
  return <div>{credentialList}</div>;
}

export async function getStaticProps() {
  const res = await axios.get("http://localhost:1337/credentials");
  const credentials = res.data;
  return { props: { credentials } };
}
