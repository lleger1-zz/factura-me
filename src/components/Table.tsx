import { useState, useRef, useCallback } from "react";
import moment from "moment";
import { IInvoice } from "../interfaces/interfaces";
import { Print } from "./Print";
import { useAuthStore } from "../hooks";
import { useReactToPrint } from "react-to-print";

interface Props {
  data: IInvoice[];
}
export const Table = ({ data }: Props) => {
  const { user } = useAuthStore();
  const [invtoPrint, setInvtoPrint] = useState<IInvoice>();

  const componentRef = useRef<HTMLDivElement>(null);

  const handleBeforePrint = () => {
    console.log("`onBeforeGetContent` called"); // tslint:disable-line no-console

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setInvtoPrint(invtoPrint);
        resolve();
      }, 2000);
    });
  };

  const handleOnBeforeGetContent = useCallback(() => {
    // console.log("`onBeforeGetContent` called"); // tslint:disable-line no-console

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setInvtoPrint(invtoPrint);
        resolve();
      }, 0);
    });
  }, [invtoPrint]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Factura-me",
    onBeforeGetContent: handleOnBeforeGetContent,
  });

  const [currentInterval, setCurrentInterval] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const pageNumber = data.length / 5;

  const totalPage =
    pageNumber % 1 !== 0 ? Math.round(pageNumber) : Math.floor(pageNumber);

  const filteredInvoices = (): IInvoice[] => {
    return data.slice(currentInterval, currentInterval + 5);
  };

  const nextPage = () => {
    if (data.length > currentInterval + 5) {
      setCurrentInterval(currentInterval + 5);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentInterval > 0) {
      setCurrentInterval(currentInterval - 5);
      setCurrentPage(currentPage - 1);
    }
  };

  const clickedRow = (invoice: IInvoice) => {
    setInvtoPrint((p) => (p = invoice));
    handlePrint();
  };

  return (
    <>
      <table className="table table-sm table-dark search_table">
        <thead>
          <tr>
            <th style={{ width: 200 }}>Cliente</th>
            <th style={{ width: 200 }}>Concepto</th>
            <th style={{ width: 200 }}>Total</th>
            <th style={{ width: 200 }}>Creacion</th>
            <th style={{ width: 100 }}>Accion</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices().map((inv) => (
            <tr key={inv.id}>
              <td>{inv.client}</td>
              <td>{inv.concept}</td>
              <td>{inv.total}</td>
              <td>{moment(inv.created).format("DD/MM/YYYY h:mm:ss a")}</td>
              <td>
                <button
                  onClick={() => clickedRow(inv)}
                  className="search_table__list__item  btn__sidebar"
                >
                  <i className="fa-solid fa-print" aria-hidden={true}></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="btn btn-primary" onClick={() => prevPage()}>
          {"<"}
        </button>
        <p className="mx-2">
          {currentPage} de {totalPage}
        </p>
        <button className="btn btn-primary" onClick={() => nextPage()}>
          {">"}
        </button>
      </div>
      <p>Total de facturas:{data.length}</p>

      {invtoPrint && (
        <div style={{ display: "none" }}>
          <Print
            name={user!.agency?.name!}
            concept={invtoPrint.concept || ""}
            //To be able to have the box empty in formik
            total={typeof invtoPrint.total === "number" ? invtoPrint.total : 0}
            client={invtoPrint.client || ""}
            address={user ? user.agency?.address : ""}
            phone={user ? user.agency?.phone : ""}
            ref={componentRef}
          />
        </div>
      )}
    </>
  );
};
