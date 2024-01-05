import DomainList from "../pages/DomainList";
import RegisterDomain from "../pages/RegisterDomain";
import React from "react";

const routes = [
  {
    path: '/',
    element: <DomainList/>
  },
  {
    path: '/register/:domain',
    element: <RegisterDomain/>
  },
];

export default routes;
