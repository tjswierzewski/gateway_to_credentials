import { gql } from "graphql-request";
import useSWR from "swr";

export default function useUser() {
  const { data: user, error } = useSWR(
    gql`
      query User {
        authenticatedItem {
          ... on User {
            id
            DID
            isAdmin
          }
        }
      }
    `,
    { fallbackData: null, refreshInterval: 0 },
  );
  return { user, error };
}
