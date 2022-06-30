import { IInvoice, InvoiceState, IUser } from "../interfaces/interfaces";

export type InvoiceAction =
  | { type: "LOGIN"; payload: IUser }
  | { type: "LOGOUT" }
  | { type: "TOGGLE_TODO"; payload: { id: string } };

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
    default:
      return state;
  }
};
