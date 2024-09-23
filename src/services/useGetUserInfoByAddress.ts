import { useQuery, gql } from "@apollo/client";

export const GET_USER_INFO = gql`
  query GetUser($address: String!) {
    getUser(input: { address: $address }) {
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

export const useGetUserInfoByAddress = (address: string) => {
  return useQuery(GET_USER_INFO, {
    variables: { address },
    skip: !address, // 如果没有地址，跳过查询
    fetchPolicy: "network-only", // 保证每次都从网络获取最新数据
  });
};
