import React from 'react';

const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'));
const Users = React.lazy(() => import('../views/users/Users'));
const User = React.lazy(() => import('../views/users/User'));
const Iglesias = React.lazy(() => import('./iglesias/Iglesias'));
const AddEditIglesia = React.lazy(() => import('./iglesias/AddEditIglesia'));
const UnionesTable = React.lazy(() => import('./uniones/UnionesTable'));
const AddEditUnion = React.lazy(() => import('./uniones/AddEditUnion'));
const Asociaciones = React.lazy(() => import('./asociaciones/AsociacionesTable'));
const AddEditAsociacion = React.lazy(() => import('./asociaciones/AddEditAsociacion'));


const routes = [
  { path: '/', exact: true, name: 'Inico' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/iglesias', exact: true, name: 'Iglesias', component: Iglesias },
  { path: '/iglesias/add', exact: true, name: 'Añadir Iglesias', component: AddEditIglesia },
  { path: '/uniones', exact: true, name: 'Uniones', component: UnionesTable },
  { path: '/uniones/add', exact: true, name: 'Añadir Uniones', component: AddEditUnion },
  { path: '/uniones/edit/:id', exact: true, name: 'Editar Uniones', component: AddEditUnion },
  { path: '/asociaciones', exact: true, name: 'Asociaciones', component: Asociaciones },
  { path: '/asociaciones/add', exact: true, name: 'Añadir Asociaciones', component: AddEditAsociacion },

];


export default routes;
