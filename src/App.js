import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Root from './components/root';
import Dashboard from './components/dashboard';
import Overview from './components/Dashboard/Overview';
import Login from './components/login';
import Signup from './components/signup';
import React, { Suspense } from 'react';
import Service from './components/Dashboard/Service';
import Calendar from './components/Dashboard/Calendar';
import Account from './components/Dashboard/Account';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/"
        element={<Root />}
      >
        <Route path='dashboard'
          element={<Dashboard />}
        >
          <Route index
            element={<Overview />}
          />
          <Route path='service'
            element={<Service />}
          />
          <Route path='calendar'
            element={<Calendar />}
          />
          <Route path='account'
            element={<Account />}
          />
        </Route>
        <Route path='signup'
          element={<Signup />}
        />
        <Route path='login'
          element={<Login />}
        />
      </Route>
    </>
  )
)

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;