import { useEffect } from "react";
import { Table } from "../components/Table";
import { useInvoiceStore } from "../hooks/useInvoiceStore";

export const SearchPage = () => {
  const { invoices, startLoadingInvoices } = useInvoiceStore();

  useEffect(() => {
    startLoadingInvoices();
  }, []);

  return (
    <div className="invoice__form-container">
      <h1>Busqueda</h1>
      <hr />
      {!!invoices ? (
        <Table data={invoices!} />
      ) : (
        // <AgTable invoices={invoices}/>
        <h2>No hay facturas creadas</h2>
      )}
    </div>
  );
};
