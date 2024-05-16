// import ProductImage from './images/9780374606176.jpg'
import { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const initialProducts = [
        {
            id: 1,
            image: <img src={""} alt="Book A" />,
            name: 'Book A',
            author: 'Author X',
            description: 'A fascinating book about...',
            price: 19.99,
        },
    ];

    useEffect(() => {
        const apiUrl = "http://127.0.0.1:80/phpreactcrud/api/action.php";
        let x = fetch(apiUrl, {
            method: "GET",
            mode: "cors", // Ensure CORS mode is set
        });

        x.then((response) => response.json()) // Parse the JSON response
            .then((data) => {
                setProducts(data);
                console.log(products)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const [products, setProducts] = useState(initialProducts);

    const handleDelete = (productId) => {
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
    };

    return (
        <div className=" mx-auto h-screen flex items-center justify-center flex-col overflow-auto w-[90%]">

            <table className=" basic">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2">ID</th>
                        <th className="p-2">Product</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Author</th>
                        <th className="p-2">Description</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-b border-gray-300">
                            <td className="p-2">{product.id}</td>
                            <td className="p-2 w-[100px]"> {product.image}</td>
                            <td className="p-2">{product.name}</td>
                            <td className="p-2">{product.author}</td>
                            <td className="p-2">{product.description}</td>
                            <td className="p-2">${product.price.toFixed(2)}</td>
                            <td className="p-2">
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
    );
};

export default AdminDashboard;
