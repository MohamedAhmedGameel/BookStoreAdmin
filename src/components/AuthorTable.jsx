
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

function AuthorTable() {

    const [loading, setLoading] = useState(true);

    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://moga-library.000webhostapp.com/api/author.php');
                setAuthors(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (authorId) => {
        try {
            const res = await axios.delete(`https://moga-library.000webhostapp.com/api/author.php?authorId=${authorId}`);
            const updatedAuthors = authors.filter((author) => author.author_id !== authorId);
            setAuthors(updatedAuthors);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (loading) {
        return <div className='min-h-screen flex justify-center items-center'>  <PulseLoader color="#06abc9" /></div>;
    }

    return (
        <div className="mx-auto min-h-screen  py-16 flex items-center justify-center flex-col overflow-auto w-[90%]">
            <div className="self-start mb-4">
                <Link to={"/authors/add"}
                    className="sm:text-[20px] bg-blue-600 text-white rounded px-4 py-2">
                    Add Authors
                </Link>
            </div>
            <table className="basic">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2">Author ID</th>
                        <th className="p-2">Author Name</th>
                        <th className="p-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author) => (
                        <tr key={author.author_id} className="border-b border-gray-300">
                            <td className="p-2 text-center">{author.author_id}</td>
                            <td className="p-2 text-center">{author.author_name}</td>
                            <td className="p-2 text-center">
                                <button
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={() => handleDelete(author.author_id)}
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
}

export default AuthorTable;
