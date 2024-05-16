import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModificationForm from "./ModificationForm";


function UsersTable() {

    const [loading, setLoading] = useState(true);
    const [modify, setModify] = useState(false)
    const [user, setUser] = useState({})

    const [Users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1/phpreactcrud/api/users.php');
                setUsers(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);



    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://127.0.0.1/phpreactcrud/api/users.php?id=${userId}`);
            setUsers(Users.filter((user) => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    function handleModify(user) {
        setUser(user)
        setModify(true)
    }

    if (modify) {
        return (
            <div className="pt-40"><ModificationForm setModify={setModify} user={user} /></div>

        )
    }

    return (
        <div className="mx-auto min-h-screen pt-40 flex items-center justify-center flex-col overflow-auto w-[90%]">
            <table className="basic">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 text-center">ID</th>
                        <th className="p-2 text-center">Full Name</th>
                        <th className="p-2 text-center">Gender</th>
                        <th className="p-2 text-center">Email</th>
                        <th className="p-2 text-center">Address</th>
                        <th className="p-2 text-center">Phone</th>
                        <th className="p-2 text-center">Government ID</th>
                        <th className="p-2 text-center">Admin Status</th>
                        <th className="p-2 text-center">Modify</th>
                        <th className="p-2 text-center">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {Users?.map((k) => (
                        <tr key={Users.id} className="bUsers-b bUsers-gray-300">
                            <td className="p-2 text-center">{k.id}</td>
                            <td className="p-2 text-center">{k.fullname}</td>
                            <td className="p-2 text-center">{k.gender}</td>
                            <td className="p-2 text-center">{k.email}</td>
                            <td className="p-2 text-center">{k.user_address}</td>
                            <td className="p-2 text-center">{k.phone}</td>
                            <td className="p-2 text-center">{k.government}</td>
                            <td className="p-2 text-center">{k.admin == 0 ? "User" : "Admin"}</td>
                            <td className="p-2 text-center">
                                <Link
                                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={() => handleModify(k)}
                                >
                                    Modify
                                </Link>
                            </td>
                            <td className="p-2 text-center">
                                <button
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={() => handleDelete(k.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UsersTable;
