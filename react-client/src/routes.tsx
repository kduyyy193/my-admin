import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import Notfound from "./views/Notfound";
import DefaultLayout from "./components/layouts/DefaultLayout";
import GuestLayout from "./components/layouts/GuestLayout";
import Dashboard from "./views/Dashboard";
import Addnew from "./views/Addnew";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to={'/users'} />,
            },
            {
                path: '/users',
                element: <Users />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/users/new',
                element: <Addnew key="userCreate" />
            },
            {
                path: '/users/:id',
                element: <Addnew key="userUpdate" />
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '*',
        element: <Notfound />,
    },
])

export default router