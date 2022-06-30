import { Formik, Form } from "formik";
import { TextBox } from "../components/TextBox";
import { useContext } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
import { invoiceApi } from "../apis";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export const LoginPage = () => {
  const { invoiceState, dispatch } = useContext(InvoiceContext);

  const navigate = useNavigate();

  const startLogin = async (email: string, password: string) => {
    try {
      const { data } = await invoiceApi.post("/auth", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch({ type: "LOGIN", payload: data.user });
      // navigate("/");
    } catch (error) {
      Swal.fire(
        "Error en la autenticacion.",
        "Usuario o clave incorrecta",
        "error"
      );
      // console.log(error);
    }
  };

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
          startLogin(values.user, values.password);
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
