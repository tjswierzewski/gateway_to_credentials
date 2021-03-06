import { gql } from "graphql-request";
import CredentialTile from "../../components/credentialTile";
import { initializeGraphQL } from "../../lib/graphql-client";

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
  const graphQLClient = initializeGraphQL();
  const data = await graphQLClient.request(ALL_CREDENTIALS_QUERY);
  return { props: data };
}
