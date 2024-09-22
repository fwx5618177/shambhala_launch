import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(input: { id: $id }) {
      user {
        id
        address
        hashKey
        points
        inviteCode
        createdAt
        updatedAt
        deletedAt
      }
    }
  }
`;

export const useRefetchUser = (id: string) => {
  const { loading, error, data, refetch } = useQuery(GET_USER, {
    variables: { id },
    skip: !id,
  });

  return { loading, error, data, refetch };
};
