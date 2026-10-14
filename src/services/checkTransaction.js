import { toast } from "../components/Common/Toast/Toast";
import getTransactionLogs from "./apis/checkTransactionLogs";

export const checkTransaction = async (userAddress, navigate) => {
  try {
    const txLogs = await getTransactionLogs(userAddress);
    if (txLogs?.result?.tx_result?.data === null) {
      toast.error("Transaction failed");
      navigate("/dashboard");
      return false;
    } else {
      toast.success("Transaction successful");
      navigate("/dashboard");
      return true;
    }
  } catch (error) {
    toast.error("Failed to fetch transaction status.");
    return false;
  }
};
