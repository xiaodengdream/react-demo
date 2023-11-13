import { Navigate } from 'react-router-dom'
import Login from '../pages/login'
import Home from '../pages/home'
import Admin from '../pages/admin'
import User from '../pages/user'
import Role from '../pages/role'
import Categrory from '../pages/category'
import Product from '../pages/product'
import Bar from '../pages/charts/bar'
import Line from '../pages/charts/line'
import Pie from '../pages/charts/pie'
const routes = [
    { path: "/login", element: <Login /> },
    {
        path: "/", element: <Admin />,
        children: [
            { path: 'home', element: <Home />},
            { path: 'user', element: <User /> },
            { path: 'role', element: <Role /> },
            { path: 'category', element: <Categrory /> },
            { path: 'product', element: <Product /> },
            { path: 'bar', element: <Bar /> },
            { path: 'line', element: <Line /> },
            { path: 'pie', element: <Pie /> },
            { path: "/", element: <Navigate to="home" /> }
        ]
    },
   /*  { path: "/", element: <Navigate to="/admin/*" /> } */
]
export default routes