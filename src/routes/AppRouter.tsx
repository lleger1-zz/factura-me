import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from "./Navigation";

import { InvoiceContext } from "../context/InvoiceContext";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";
import { LoginPage } from "../pages/LoginPage";

export const AppRouter = () => {
  const { invoiceState } = useContext(InvoiceContext);
  const { user } = invoiceState;

  // console.log(user);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRouter uid={user?.name}>
                <LoginPage />
              </PublicRouter>
            }
          />

          <Route
            path="/*"
            element={
              <PrivateRouter uid={user?.name}>
                <Navigation />
              </PrivateRouter>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
