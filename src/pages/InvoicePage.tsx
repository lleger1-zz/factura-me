import { Form, Formik } from "formik";
import { useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import { Print } from "../components/Print";
import { TextBox } from "../components/TextBox";
import { InvoiceContext } from "../context/InvoiceContext";
import { IInvoice } from "../interfaces/interfaces";
import invoiceApi from "../apis/invoiceApi";
import Swal from "sweetalert2";
import moment from "moment";

export const InvoicePage = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const { invoiceState } = useContext(InvoiceContext);
  const { user } = invoiceState;

  const startInvoice = async (a: IInvoice) => {
    try {
      // console.log(a);
      const { data } = await invoiceApi.post("/invoices", { ...a });
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("token-init-date", new Date().getTime().toString());
      // dispatch({ type: "LOGIN", payload: data.user });
      // navigate("/");
      handlePrint();
    } catch (error) {
      Swal.fire(
        "Error en la autenticacion.",
        "Usuario o clave incorrecta",
        "error"
      );
      console.log(error);
    }
  };

  return (
    <div className="invoice__form-container">
      <h1>Factura-me</h1>
      <hr />
      <Formik
        initialValues={{
          client: "",
          concept: "",
          total: "",
        }}
        onSubmit={(values) => {
          const inv = {
            concept: values.concept,
            client: values.client,
            qty: 1,
            price: parseInt(values.total),
            taxes: 0,
            subtotal: parseInt(values.total),
            total: parseInt(values.total),
            created: moment().toDate(),
          };
          startInvoice(inv);
        }}
      >
        {({ values }) => (
          <Form>
            <TextBox
              label={"Cliente"}
              name={"client"}
              type="text"
              placeholder="Client"
            />
            <TextBox
              label={"Concepto"}
              name={"concept"}
              type="text"
              placeholder="Concepto"
            />
            <TextBox
              label={"Total"}
              name={"total"}
              type="number"
              placeholder="Total"
              autoFocus={true}
            />
            <button className="w-100 btn btn-lg btn-primary mb-5" type="submit">
              Aceptar
            </button>
            {user && (
              <div style={{ display: "none" }}>
                <Print
                  name={user.agency?.name!}
                  concept={values.concept}
                  //To be able to have the box empty in formik
                  total={typeof values.total === "number" ? values.total : 0}
                  client={values.client}
                  address={user ? user.agency?.address : ""}
                  phone={user ? user.agency?.phone : ""}
                  ref={componentRef}
                />
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
