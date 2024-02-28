import React from 'react';
import DomainList from '../pages/DomainList';
import RegisterDomain from '../pages/RegisterDomain';
import ManageDomain from '../pages/ManageDomain';
import MyDomains from "../pages/MyDomains";

const routes = [
  {
    path: '/',
    element: <DomainList />
  },
  {
    path: '/register/:domain',
    element: <RegisterDomain />
  },
  {
    path: '/manage/:domain',
    element: <ManageDomain />
  },
  {
    path: '/my-domains',
    element: <MyDomains />
  }
];

export default routes;
