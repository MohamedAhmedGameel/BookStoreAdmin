import { Route, Routes, useNavigate } from 'react-router-dom';
import Products from './Product/Products';
import AddProduct from '../components/AddProduct';
import Authors from './Author/Authors';
import AddAuthor from '../components/AddAuthor';
import Categories from './Category/Categories';
import AddCategory from '../components/AddCategory';
import { useEffect, useState } from 'react';
import Analysis from './Analysis';
import Orders from './Orders/Orders'
import NotFound from '../components/NotFound';
import UsersTable from '../components/UsersTable';

function Home() {
    const [user, setUser] = useState({});
    const Navigate = useNavigate();

    useEffect(() => {
        let x = sessionStorage.getItem('user');
        let y = localStorage.getItem('user');
        setUser(JSON.parse(y) || JSON.parse(x));
        if (user === undefined) {
            Navigate('/login');
        }
    }, []); // Empty dependency array ensures useEffect runs only once after initial render

    return (!user ? (
        <div className="h-screen flex items-center justify-center">
            Please log in to view this page.
        </div>
    ) : (
        <Routes>
            <Route path="/" element={<Analysis />} ></Route>
            <Route path="/books" element={<Products />} ></Route>
            <Route path="/books/add" element={<AddProduct />} ></Route>
            <Route path="/authors" element={<Authors />} ></Route>
            <Route path="/authors/add" element={<AddAuthor />} ></Route>
            <Route path="/categories" element={<Categories />} ></Route>
            <Route path="/categories/add" element={<AddCategory />} ></Route>
            <Route path="/orders" element={<Orders />} ></Route>
            <Route path="/users" element={<UsersTable />} ></Route>
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    )
    )
}

export default Home;
