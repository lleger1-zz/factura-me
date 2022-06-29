import React from "react";

interface Props {
  name: string;
  client?: string;
  concept: string;
  address?: string;
  phone?: string;
  total: number;
}

export const Print = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { concept, total, client, name, address, phone } = props;

  return (
    <div className="receipt" ref={ref}>
      <div className="receipt__header">
        <p>{name}</p>
      </div>
      <div className="receipt_info">
        <p>
          {address}
          <br />
          {phone}
          <br />
          {client && `Cliente: ${client}`}
        </p>
      </div>

      <div className="receipt__data">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Ctd</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{concept}</td>
              <td>1</td>
              <td>{total}</td>
            </tr>
            <tr className="bold">
              <td colSpan={2}>Impuestos</td>
              <td>0</td>
            </tr>
            <tr className="bold">
              <td colSpan={2}>Total</td>
              <td>{total}</td>
            </tr>
          </tbody>
          <tfoot className="receipt__footer">
            <tr>
              <td colSpan={3}>Dios te bendiga</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
});
