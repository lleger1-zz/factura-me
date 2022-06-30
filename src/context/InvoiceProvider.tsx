import moment from "moment";
import { useReducer } from "react";
import { InvoiceState } from "../interfaces/interfaces";
import { InvoiceContext } from "./InvoiceContext";
import { invoiceReducer } from "./invoiceReducer";

const INITIAL_STATE: InvoiceState = {
  // user: {
  //   uid: "62b920511915ea5061086a3a",
  //   email: "info@gruposweetvictory.com",
  //   name: "Grupo Sweet Victory",
  //   agency: {
  //     name: "Grupo Sweet Victory",
  //     rnc: "123456",
  //     address:
  //       "Calle Eusebio manzueta #22 casi esq. Dr. Betances.Santo Domingo DN",
  //     phone: "829-688-2144",
  //     whatsapp: "829-688-2144",
  //     instagram: "sweetvictorydr",
  //     facebook: "sweetvictorydr",
  //     twitter: "sweetvictorydr",
  //     bornDate: moment.now(),
  //   },
  // },
  // invoices: [
  //   {
  //     id: "62b9b0f9a9e7a4219ec465c5",
  //     client: "Prueba",
  //     concept: "Libro el poder de la honrra",
  //     qty: 1,
  //     price: 100,
  //     taxes: 0,
  //     subtotal: 100,
  //     total: 100,
  //     status: false,
  //     created: moment().toDate(),
  //     user: { uid: "62b920511915ea5061086a3a", name: "Grupo Sweet victory" },
  //   },
  // ],
};

interface props {
  children: JSX.Element | JSX.Element[];
}

export const InvoiceProvider = ({ children }: props) => {
  const [invoiceState, dispatch] = useReducer(invoiceReducer, INITIAL_STATE);

  return (
    <InvoiceContext.Provider
      value={{
        invoiceState,
        dispatch,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
