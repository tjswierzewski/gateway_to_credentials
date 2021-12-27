import { gql } from "@apollo/client";
import axios from "axios";
import Image from "next/image";
import { initializeApollo } from "../../lib/apollo-client";

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
        url(size: sm)
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
      <Image src={image.url} width={image.width} height={image.height} alt={image.name} />
      <h3>{credential.title}</h3>
      <p>{credential.description}</p>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: CREDENTIAL_QUERY,
    variables: { slug: params.slug },
  });
  return {
    props: data,
  };
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({ query: CREDENTIALS_PATHS_QUERY });
  const { credentials } = data;
  const paths = credentials.map((credential) => {
    return { params: { slug: credential.slug } };
  });
  return { paths, fallback: false };
}
