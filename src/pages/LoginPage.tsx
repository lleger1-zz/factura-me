import { Formik, Form } from "formik";
import { TextBox } from "../components/TextBox";
import { useEffect } from "react";

import Swal from "sweetalert2";
import * as Yup from "yup";
import { useAuthStore } from "../hooks/useAuthStore";

export const LoginPage = () => {
  const { startLogin, errorMessage } = useAuthStore();

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="invoice__form-container">
      <h1>Factura-me</h1>
      <hr />
      <Formik
        initialValues={{
          user: "",
          password: "",
        }}
        onSubmit={(values) => {
          startLogin(values.user.toLowerCase().trim(), values.password);
          // console.log(invoiceState);
        }}
        validationSchema={Yup.object({
          user: Yup.string().email().required("Usuario es requerido"),
          password: Yup.string().required("Clave es requerida"),
        })}
      >
        {({ values }) => (
          <Form>
            <TextBox
              label={"Usuario"}
              name={"user"}
              type="text"
              placeholder="Usuario"
              autoFocus={true}
            />
            <TextBox
              label={"Clave"}
              name={"password"}
              type="password"
              placeholder="Clave"
            />
            <button className="w-100 btn btn-lg btn-primary mb-5" type="submit">
              Ingresar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
