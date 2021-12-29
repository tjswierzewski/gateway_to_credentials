import axios from "axios";
import { gql } from "graphql-request";
import Image from "next/image";
import { initializeGraphQL } from "../../lib/graphql-client";

export const CREDENTIAL_QUERY = gql`
  query Credential($slug: String!) {
    credential(where: { slug: $slug }) {
      id
      title
      description
      image {
        id
        width
        height
        url(size: md)
        sizesMeta
      }
      slug
    }
  }
`;
export const CREDENTIALS_PATHS_QUERY = gql`
  query CredentialsPaths {
    credentials {
      slug
    }
  }
`;

export default function Credential({ credential }) {
  const image = credential.image;
  return (
    <div>
      <Image
        src={image.url}
        width={image.sizesMeta.md.width}
        height={image.sizesMeta.md.height}
        alt={image.name}
      />
      <h3>{credential.title}</h3>
      <p>{credential.description}</p>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const graphQLClient = initializeGraphQL();
  const data = await graphQLClient.request(CREDENTIAL_QUERY, { slug: params.slug });
  return {
    props: data,
  };
}

export async function getStaticPaths() {
  const graphQLClient = initializeGraphQL();
  const data = await graphQLClient.request(CREDENTIALS_PATHS_QUERY);
  const { credentials } = data;
  const paths = credentials.map((credential) => {
    return { params: { slug: credential.slug } };
  });
  return { paths, fallback: false };
}
