import axios from 'axios';
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';

function OrdersTable() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1/phpreactcrud/api/orders.php');
                setOrders(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const parseBooks = (booksJson) => {
        try {
            return JSON.parse(booksJson);
        } catch (error) {
            console.error('Error parsing books JSON:', error);
            return [];
        }
    };

    if (loading) {
        return <div className='min-h-screen  flex justify-center items-center'>  <PulseLoader color="#06abc9" /></div>;
    }

    return (
        <div className="mx-auto min-h-screen pt-40 flex items-center justify-center flex-col overflow-auto w-[90%]">
            <table className="basic">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 text-center">ID</th>
                        <th className="p-2 text-center">Order Time</th>
                        <th className="p-2 text-center">Full Name</th>
                        <th className="p-2 text-center">Phone</th>
                        <th className="p-2 text-center">Address</th>
                        <th className="p-2 text-center">Books</th>
                        <th className="p-2 text-center">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-300">
                            <td className="p-2 text-center">{order.id}</td>
                            <td className="p-2 text-center">{order.order_time}</td>
                            <td className="p-2 text-center">{order.name}</td>
                            <td className="p-2 text-center">{order.phone}</td>
                            <td className="p-2 text-center">{order.address}</td>
                            <td className="p-2 text-center">
                                {parseBooks(order.books).map((book, index) => (
                                    <div key={index}>{book.quantity} * {book.title}</div>
                                ))}
                            </td>
                            <td className="p-2 text-center">${order.total_price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrdersTable;
