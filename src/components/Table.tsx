import React from "react";
import moment from "moment";
import { IInvoice } from "../interfaces/interfaces";

interface Props {
  data: IInvoice[];
}
export const Table = ({ data }: Props) => {
  return (
    <>
      <table className="table table-sm table-dark search_table">
        <thead className="w-100">
          <tr>
            <th>Cliente</th>
            <th>Concepto</th>
            <th>Total</th>
            <th>Creacion</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => (
            <tr key={index}>
              <td>{d.client}</td>
              <td>{d.concept}</td>
              <td>{d.total}</td>
              <td>{moment(d.created).format("DD/MM/YYYY h:mm:ss a")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
