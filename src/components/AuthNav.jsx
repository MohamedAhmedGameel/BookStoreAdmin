import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AuthNav() {
    const [user, setUser] = useState({})
    useEffect(() => {
        let x = sessionStorage.getItem('user');
        let y = localStorage.getItem('user');
        setUser(JSON.parse(y)?.user || JSON.parse(x)?.user);
        console.log()
    }, [])

    const logOut = () => {
        sessionStorage.removeItem("user");
        localStorage.removeItem("user");
        window.location.reload(false);
    }

    return (
        <div className="absolute top-[100%] flex justify-evenly items-center w-[100vw] content-center bg-white p-[10px] left-0 right-0 rounded-b-[20px] shadow-md">
            {!user ? <>
                <Link to={"/signup"} className="py-[5px] px-[10px] text-white bg-blue-600 rounded-[10px]">
                    Start Now
                </Link>
                <Link to={"/Login"} className="py-[5px] px-[10px] text-white bg-blue-600 rounded-[10px]">
                    Sign In
                </Link>
            </> :
                <div className="flex justify-evenly items-center w-[100vw]">
                    <span className="max-w-[200px]  whitespace-nowrap overflow-hidden overflow-ellipsis capitalize">
                        Hi {user.fullname}
                    </span>
                    <button onClick={logOut} className="py-[5px] px-[10px] text-white bg-blue-600 rounded-[10px]">Sign out</button>
                </div>
            }

        </div >
    )

}

export default AuthNav;