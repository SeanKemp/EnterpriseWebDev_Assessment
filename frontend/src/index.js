import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from "react-query";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import 'bootstrap/dist/css/bootstrap.min.css';
import Quotes from './quotes';
import Login from './login';
import Logout from './logout';
import CreateQuote from './createQuote';
import PrivateRoute from './privateroute';
import { Provider, useDispatch } from 'react-redux';
import reduxstore from './reduxstore';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: 
        <PrivateRoute>
          <Logout />,
        </PrivateRoute>,
      },
      {
        path: "quotes",
        element: <Quotes />,
      },
      {
        path: "createQuote",
        element: <CreateQuote />,
      },
    ]
  },
]);



const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={reduxstore}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
