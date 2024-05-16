
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import CategoryAnalysis from './CategoryAnalysis';

function CategTable() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://moga-library.000webhostapp.com/api/category.php');
                setCategories(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);



    const handleDelete = async (categoryId) => {
        try {
            const res = await axios.delete(`https://moga-library.000webhostapp.com/api/category.php?categ_id=${categoryId}`);
            const updatedCategories = categories.filter((category) => category.categ_id !== categoryId);
            setCategories(updatedCategories);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };
    if (loading) {
        return <div className='min-h-screen flex justify-center items-center'>  <PulseLoader color="#06abc9" /></div>;
    }
    return (
        <div className="mx-auto min-h-screen pt-40 flex items-center justify-center flex-col overflow-auto w-[90%]">
            <div className="self-start mb-4">
                <Link to={'/categories/Add'}
                    className="sm:text-[20px] bg-blue-600 text-white rounded px-4 py-2">
                    Add Category
                </Link>
            </div>
            <table className="basic">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2">Category ID</th>
                        <th className="p-2">Category Name</th>
                        <th className="p-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.categ_id} className="border-b border-gray-300">
                            <td className="p-2 text-center">{category.categ_id}</td>
                            <td className="p-2 text-center">{category.categ_name}</td>
                            <td className="p-2 text-center">
                                <button
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={() => handleDelete(category.categ_id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CategoryAnalysis />
        </div>
    );
}

export default CategTable;
