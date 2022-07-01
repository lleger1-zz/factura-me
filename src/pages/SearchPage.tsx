import { useContext, useState } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
import invoiceApi from "../apis/invoiceApi";
import { Table } from "../components/Table";

export const SearchPage = () => {
  const { invoiceState, dispatch } = useContext(InvoiceContext);
  const [invoices, setInvoices] = useState();

  const startGetInvoice = async () => {
    try {
      const { data } = await invoiceApi.get("/invoices");
      setInvoices(data.invoices);

      // dispatch({ type: "GETINVOICES", data });
      console.log(invoices);
    } catch (error) {
      console.log(error);
    }
  };
  // startGetInvoice();

  return (
    <div className="invoice__form-container">
      <h1>SearchPage</h1>
      <hr />
      <button className="btn btn-primary mb-3" onClick={startGetInvoice}>
        Actualizar
      </button>
      {!!invoices ? (
        <Table data={invoices!} />
      ) : (
        <h2>No hay facturas creadas</h2>
      )}
    </div>
  );
};
