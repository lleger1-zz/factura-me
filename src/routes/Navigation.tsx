import { Routes, Route, Navigate } from "react-router-dom";

import { Navbar } from "./Navbar";
import { DashboardPage, SettingPage, SearchPage, InvoicePage } from "../pages/";

export const Navigation = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<InvoicePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/settings" element={<SettingPage />} />

        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
};
