import { Link } from "react-router-dom"

function NotFound() {
    return (
        <div className='h-screen flex justify-center items-center flex-col'>
            <span className="text-[50px] text-red-500 font-bold">Page Not Found</span>
            <span className="text-blue-900 text-[30px]">error 404</span>
            <span>Go to <Link to={"/"} className="text-blue-600 underline">home page</Link> </span>
        </div>
    )
}

export default NotFound