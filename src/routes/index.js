import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUser from "../pages/AllUser";
import Products from "../pages/Products";
import ProductCategory from "../pages/ProductCategory";
import ProductDetail from "../components/ProductDetail";
import Cart from "../pages/Cart";
import SearchProduct from "../components/SearchProduct";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
        {
            path: "",
            element: <Home/>,
        },
        {
            path:"Login",
            element: <Login/>,
        },
        {
            path:"forgot-password",
            element: <ForgotPassword/>
        },
        {
            path:"sign-up",
            element: <SignUp/>
        },
        {
            path:"product-category",
            element: <ProductCategory/>
        },
        {
            path:"product/:id",
            element:<ProductDetail/>
        },
        {
            path:"cart",
            element: <Cart/>
        },
        {
            path:'search',
            element: <SearchProduct/>
        
        },
        {
            path:"admin-panel",
            element: <AdminPanel/>,
            children: [
                {
                    path:"all-users",
                    element: <AllUser/>
                },
                {
                    path:"products",
                    element: <Products/>
                },
            ]
        }
        ],
    }
]);

export default router;