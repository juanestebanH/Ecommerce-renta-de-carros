import React from "react";
import { Outlet } from "react-router-dom";
// import componets cliente
import HeaderCliente from "../../components/cliente/HeaderCliente";
import FooterCliente from "../../components/cliente/FooterCliente";

function ClienteLayout() {
  return (
    <>
      <HeaderCliente />
      <main>
        <Outlet />
      </main>
      <FooterCliente />
    </>
  );
}

export default ClienteLayout;
