import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Root from './components/root';
import Dashboard from './components/dashboard';
import Overview, { getAllBracelet } from './components/Dashboard/Overview';
import Login from './components/login';
import Signup from './components/signup';
import React, { Suspense } from 'react';
import BraceletDetail, { getBraceletDetail } from './components/Dashboard/BraceletDetail';
import UsersList, { usersListLoader } from './components/Dashboard/UsersList';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/"
        element={<Root />}
      >
        <Route path='dashboard'
          element={<Dashboard />}
        >
          <Route path='bracelet'
          >
            <Route index
              element={<Overview />}
              loader={getAllBracelet}
            />
            <Route path=':id'
              element={<BraceletDetail />}
              loader={getBraceletDetail}
            />
          </Route>
          <Route path='account'
          element={<UsersList />}
          loader={usersListLoader}
        />
        </Route>
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