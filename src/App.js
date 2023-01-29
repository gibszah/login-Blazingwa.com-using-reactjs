import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from '../src/component/pages/Loginpage'
import ErrorPage from "./component/auth/error";
import Register from "./component/pages/register";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./component/pages/dashboard";
import Profile from "./component/pages/profile";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />,
  },
   {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/profile',
    element: <Profile />,
    errorElement: <ErrorPage />,
   },

])

function App() {
  return <RouterProvider router={router} />;
}
export default App;