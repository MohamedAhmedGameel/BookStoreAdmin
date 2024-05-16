import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import AddProduct from './AddProduct'

function ProductTable() {
    const [products, setProducts] = useState([]);
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modify, setModify] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('hhttps://moga-library.000webhostapp.com/api/action.php');
                setProducts(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`https://book-store-admin-taupe.vercel.app/api/action.php?id=${productId}`);
            setProducts(products.filter((product) => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    function handleModify(book) {
        setBook(book)
        setModify(true)
    }

    if (loading) {
        return <div className='min-h-screen flex justify-center items-center'>  <PulseLoader color="#06abc9" /></div>;
    }

    if (modify) {
        return (
            <div className=""><AddProduct setModify={setModify} book={book} /></div>

        )
    }

    return (
        <div className="mx-auto min-h-screen pt-40 flex items-center justify-center flex-col gap-8">
            <div className='w-[90%]'>
                <Link to={"/books/add"} className="sm:text-[20px] bg-blue-600 text-white rounded px-4 py-2 mb-6">
                    Add New Product
                </Link>
            </div>
            <div className='overflow-auto w-[90%]'>
                <table className="basic min-w-[700px]">
                    <thead>
                        <tr className="bg-gray-100 ">
                            <th className="p-2 max-h-14">Product</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Author</th>
                            <th className="p-2 max-w-[200px] max-h-14mb-whitespace-nowrap overflow-hidden overflow-ellipsis">Description</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Category</th>
                            <th className="p-2">Modify</th>
                            <th className="p-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b border-gray-300">
                                <td className="p-2 text-center max-h-14">
                                    <img className="max-h-full max-w-full" src={product.book_image} alt={product.book_name} />
                                </td>
                                <td className="p-2 text-center">{product.book_name}</td>
                                <td className="p-2 text-center">{product.author_name}</td>
                                <td className="p-2 max-w-[200px] overflow-auto max-h-14 whitespace-pre-line text-ellipsis">{product.dscp}</td>
                                <td className="p-2 text-center">${product.price}</td>
                                <td className="p-2 text-center">{product.categ_name}</td>
                                <td className="p-2 text-center">
                                    <button
                                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => handleModify(product)}
                                    >
                                        Modify
                                    </button>
                                </td>
                                <td className="p-2 text-center">
                                    <button
                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductTable;
