import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import ErrorPage from "@/pages/error/ErrorPage";




const router = createBrowserRouter([
    {
      path:"/",
      element:<PrivateRoute><App/></PrivateRoute>,
      errorElement:<ErrorPage/>
    },
    {
        path:"/login",
        element:<Login/>
    }
])

export default router