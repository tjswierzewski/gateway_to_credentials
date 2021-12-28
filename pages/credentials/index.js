import { gql } from "@apollo/client";
import CredentialTile from "../../components/credentialTile";
import { initializeApollo } from "../../lib/apollo-client";

export const ALL_CREDENTIALS_QUERY = gql`
  query allCredentials {
    credentials {
      id
      title
      description
      image {
        id
        width
        height
        url(size: sm)
        sizesMeta
      }
      slug
    }
  }
`;

export default function Index({ credentials }) {
  const credentialList = credentials.map((credential) => {
    return (
      <CredentialTile
        key={credential.id}
        title={credential.title}
        description={credential.description}
        image={credential.image}
        slug={credential.slug}
      ></CredentialTile>
    );
  });
  return <div>{credentialList}</div>;
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({ query: ALL_CREDENTIALS_QUERY });
  return { props: data };
}
