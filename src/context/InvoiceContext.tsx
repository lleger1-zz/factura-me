import { createContext } from "react";
import { InvoiceState } from "../interfaces/interfaces";
import { InvoiceAction } from "./invoiceReducer";

export type InvoiceContextProps = {
  invoiceState: InvoiceState;
  dispatch: React.Dispatch<InvoiceAction>;
};

export const InvoiceContext = createContext<InvoiceContextProps>(
  {} as InvoiceContextProps
);
