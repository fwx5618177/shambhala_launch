import { PointsMarketSectionProps } from "@/Section/PointsMarketSection";
import { gql, QueryResult, useQuery } from "@apollo/client";

export interface PointLog {
    id: string;
    userId: string;
    pointChange: number;
    type: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface LoadPointDataParams {
    type?: PointsMarketSectionProps['type'];
    userId: string;
    pageSize?: number;
    pageNum?: number;
}

export interface LoadPointDataResponse {
    pointLogs: PointLog[];
}

export const LOAD_POINT_DATA = gql`
  query LoadPointData($userId: ID!, $pageSize: Int = 10, $pageNum: Int = 0) {
    pointLogs(input: { userId: $userId, pageSize: $pageSize, pageNum: $pageNum }) {
      id
      userId
      pointChange
      type
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const useGetPointLogsByUserId = ({
    userId,
    type = 'myRewards',
    pageSize = 10,
    pageNum = 0,
}: LoadPointDataParams) => {
    return useQuery<LoadPointDataResponse, Omit<LoadPointDataParams, 'type'>>(LOAD_POINT_DATA, {
        variables: { userId, pageSize, pageNum },
        skip: !(userId && ['myRewards', 'pointsMarket'].includes(type)),
        fetchPolicy: "network-only",
    })
};

