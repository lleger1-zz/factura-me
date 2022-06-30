import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { InvoiceContext } from "../context/InvoiceContext";

export const Navbar = () => {
  const { invoiceState, dispatch } = useContext(InvoiceContext);
  const { user } = invoiceState;

  const startLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-container__header">
          <div className="sidebar-container__header__logo">
            <i className="fa-brands fa-affiliatetheme" aria-hidden={true}></i>
          </div>

          <div className="sidebar-container__header__brand">
            {user ? user.agency!.name : " "}
          </div>
        </div>

        <div className="sidebar-container__list">
          <NavLink
            className={({ isActive }) =>
              `sidebar-container__list__item ${isActive ? "nav-active" : ""}`
            }
            to="/"
          >
            <div className="sidebar-container__list__item__img">
              <i className="fa-solid fa-receipt" aria-hidden={true}></i>
            </div>
            <div className="sidebar-container__list__item__title">Invoice</div>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `sidebar-container__list__item ${isActive ? "nav-active" : ""}`
            }
            to="/search"
          >
            <div className="sidebar-container__list__item__img">
              <i
                className="fa-solid fa-magnifying-glass"
                aria-hidden={true}
              ></i>
            </div>
            <div className="sidebar-container__list__item__title">search</div>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `sidebar-container__list__item ${isActive ? "nav-active" : ""}`
            }
            to="/dashboard"
          >
            <div className="sidebar-container__list__item__img">
              <i className="fa-solid fa-gauge" aria-hidden={true}></i>
            </div>
            <div className="sidebar-container__list__item__title">
              Dashboard
            </div>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `sidebar-container__list__item ${isActive ? "nav-active" : ""}`
            }
            to="/settings"
          >
            <div className="sidebar-container__list__item__img">
              <i className="fa-solid fa-gear" aria-hidden={true}></i>
            </div>
            <div className="sidebar-container__list__item__title">Settings</div>
          </NavLink>

          <button
            className="sidebar-container__list__item  btn__sidebar"
            onClick={startLogout}
          >
            <i
              className="fa-solid fa-arrow-right-from-bracket"
              aria-hidden={true}
            ></i>
            <p className="sidebar-container__list__item__title">Logout</p>
          </button>
        </div>
        <div className="sidebar-container__footer">
          <div className="sidebar-container__footer__logo"></div>
          <div className="sidebar-container__footer__data">
            <div className="sidebar-container__footer__data__title">
              Invoice app
            </div>
            <div className="sidebar-container__footer__data__subtitle">
              Purpose
            </div>
          </div>
        </div>
      </div>

      {/* <nav>
                <a href="#first"><i className="fa-solid fa-receipt"></i></a>
                <a href="#second"><i className="fa-solid fa-magnifying-glass"></i></a>
                <a href="#third"><i className="fa-solid fa-gauge"></i></a>
                <a href="#fourth"><i className="fa-solid fa-gear"></i></a>
            </nav>

            <div className='container'>
                <section id='first'>
                    <InvoiceScreen />
                </section>

                <section id='second'>
                    <h1>Second</h1>
                </section>

                <section id='third'>
                    <h1>Third</h1>
                </section>

                <section id='fourth'>
                    <h1>Fourth</h1>
                </section>
            </div> */}
    </>
  );
};
