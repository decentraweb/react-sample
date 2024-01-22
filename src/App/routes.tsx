import React from 'react';
import DomainList from '../pages/DomainList';
import RegisterDomain from '../pages/RegisterDomain';
import ManageDomain from '../pages/ManageDomain';

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
  }
];

export default routes;
