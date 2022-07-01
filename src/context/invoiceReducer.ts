import { IInvoice, InvoiceState, IUser } from "../interfaces/interfaces";

export type InvoiceAction =
  | { type: "LOGIN"; payload: IUser }
  | { type: "LOGOUT" }
  | { type: "GETINVOICES"; payload: [] };

export const invoiceReducer = (
  state: InvoiceState,
  action: InvoiceAction
): InvoiceState => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {};
    case "GETINVOICES":
      return {
        ...state,
        invoices: action.payload,
      };
    default:
      return state;
  }
};
