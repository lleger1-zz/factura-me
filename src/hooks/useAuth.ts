import { useContext } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
export const useAuth = () => {
  const { invoiceState } = useContext(InvoiceContext);
  const { user } = invoiceState;
  return {};
};
