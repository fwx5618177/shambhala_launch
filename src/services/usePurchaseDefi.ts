import { useMutation, gql } from "@apollo/client";
import { useGetUserInfoByAddress } from "./useGetUserInfoByAddress";
import { useAccount } from "wagmi";
import { message } from "@/providers/MessageProvider";

export const PURCHASE_DEFI = gql`
  mutation PurchaseDefi(
    $id: String!
    $userId: String!
    $signedTx: String!
    $userAddr: String!
    $chainCode: String!
    $amount: String!
  ) {
    purchaseDefi(
      input: {
        id: $id
        userId: $userId
        signedTx: $signedTx
        userAddr: $userAddr
        chainCode: $chainCode
        amount: $amount
      }
    ) {
      success
      id
      amount
    }
  }
`;

export const usePurchaseDefi = () => {
  const { address: accountAddress, chain } = useAccount();
  const [purchaseDefiMutation] = useMutation(PURCHASE_DEFI);

  // const {
  //   data: userData,
  //   loading: userLoading,
  //   error: userError,
  // } = useGetUserInfoByAddress(accountAddress || "");

  const purchaseDefi = async (params: any) => {
    // if (!userData || userError || !accountAddress) {
    //   message.error(
    //     "Failed to get user info or account address is not available"
    //   );
    //   return;
    // }

    try {
      // const userId = userData?.getUser?.user?.id || "";
      const response = await purchaseDefiMutation({
        variables: {
          id: params.id || "",
          // userId: userId,
          signedTx: params.signedTx,
          userAddr: accountAddress,
          chainCode: chain?.id || "",
          amount: params.amount,
        },
        fetchPolicy: "network-only",
      });

      if (response.data.purchaseDefi.success) {
        console.log("purchaseDefi success");
        message.success("Purchase Defi succeeded");
      } else {
        message.error("Purchase Defi failed");
      }
    } catch (error) {
      console.error("Error in purchaseDefi:", error);
      message.error("An error occurred during the purchase");
    }
  };

  return { purchaseDefi };
};
