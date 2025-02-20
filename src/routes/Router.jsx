import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";




const router = createBrowserRouter([
    {
      path:"/",
      element:<PrivateRoute><App/></PrivateRoute>,
    },
    {
        path:"/login",
        element:<Login/>
    }
])

export default router