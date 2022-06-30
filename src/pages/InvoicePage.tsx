import { Form, Formik } from "formik";
import { useRef, useContext } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import * as Yup from "yup";

import { useReactToPrint } from "react-to-print";
import { Print } from "../components/Print";
import { TextBox } from "../components/TextBox";
import { InvoiceContext } from "../context/InvoiceContext";
import { IInvoice } from "../interfaces/interfaces";
import invoiceApi from "../apis/invoiceApi";

export const InvoicePage = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  const initialValues = {
    client: "",
    concept: localStorage.getItem("lastConcept") || "",
    total: "",
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const { invoiceState } = useContext(InvoiceContext);
  const { user } = invoiceState;

  const startInvoice = async (a: IInvoice, reset: () => void) => {
    try {
      // console.log(a);
      const { data } = await invoiceApi.post("/invoices", { ...a });
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("token-init-date", new Date().getTime().toString());
      // dispatch({ type: "LOGIN", payload: data.user });
      // navigate("/");
      handlePrint();
      localStorage.setItem("lastConcept", a.concept);
      setTimeout(() => {
        Swal.fire({
          title: "Desea imprimir copia?",
          showDenyButton: true,
          // showCancelButton: true,
          confirmButtonText: "Si",
          denyButtonText: `No`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            handlePrint();
            reset();
          } else if (result.isDenied) {
            // Swal.fire('Changes are not saved', '', 'info')
            reset();
          }
        });
      }, 1000);
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
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          const inv = {
            concept: values.concept,
            client: values.client || undefined,
            qty: 1,
            price: parseInt(values.total),
            taxes: 0,
            subtotal: parseInt(values.total),
            total: parseInt(values.total),
            created: moment().toDate(),
          };
          startInvoice(inv, resetForm);
        }}
        validationSchema={Yup.object({
          concept: Yup.string()
            .max(50, "debe de ser de 50 caracteres o menos.")
            .required("conceptop es requerido"),
          total: Yup.number().required("Total es requerido"),
        })}
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
