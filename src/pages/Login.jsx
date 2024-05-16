import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup"
function LoginPage() {

    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);
    const [loginMsg, setLoginMsg] = useState("")

    const formik = useFormik({
        initialValues: {
            email: "",
            user_password: "",
            remember: false, // Add remember property to initialValues
        },

        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email is required"),
            user_password: Yup.string().required("Password is required").min(9, "Password should be more than 8 characters"),
        }),

        onSubmit: async (values) => {
            try {
                const res = await axios.post('https://book-store-admin-taupe.vercel.app/login/admin.php', values);
                if (res.status === 200) {
                    if (res.data?.success == true) {
                        console.log(101)
                        let userString = JSON.stringify(res.data);
                        sessionStorage.setItem('user', userString);
                        // Set user data in localStorage if rememberMe is true
                        if (rememberMe) {
                            localStorage.setItem('user', userString);
                        }
                        window.location = "/"
                        navigate('/')
                    } else {
                        setLoginMsg(res.data.error)
                    }
                }
            } catch (err) {
                setLoginMsg(err)
            }
        },
    })


    return (
        <form onSubmit={formik.handleSubmit} className=" h-screen flex items-center justify-center flex-col">
            <div className="bg-white p-8 border-[1px] border-solid border-blue-600 rounded-md shadow-md w-[90%] sm:w-[500px]">
                <h1 className="text-2xl flex justify-center font-semibold mb-4 ">Login</h1>
                <div>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        className=" outline-none w-full p-2 border border-blue-600 border-solid rounded"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? <p className="text-red-600">{formik.errors.email}</p> : null}
                </div>
                <div>
                    <input
                        id="user_password"
                        name="user_password"
                        type="password"
                        placeholder="Password"
                        className=" outline-none w-full p-2 mt-4 border border-blue-600 border-solid rounded"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.user_password}
                    />
                    {formik.touched.user_password && formik.errors.user_password ? <p className="text-red-600">{formik.errors.user_password}</p> : null}
                </div>
                <label>
                    <input
                        type="checkbox"
                        name="remember"
                        className="mr-2 mt-4"
                        checked={rememberMe} // Bind checkbox value to rememberMe state
                        onChange={(e) => setRememberMe(e.target.checked)} // Update rememberMe state on change
                    />
                    Remember me
                </label>
                <button
                    type="submit"
                    className="mt-2 bg-blue-500 text-white w-full py-2 rounded border-[1px] border-solid border-blue-600 hover:bg-white hover:text-black transition-all ">
                    Login
                </button>
                {loginMsg && <p className="text-red-600 w-[100%] text-center">{loginMsg}</p>}
            </div>
            <div className="w-[90%] sm:w-[500px]">
                <p className="text-center bg-white p-[20px] border-[1px] border-solid border-blue-600 rounded-md shadow-md "> Don't have an account? <Link to={"/signup"} className="text-blue-600"><u>Register</u></Link>
                </p>
            </div>
        </form>
    );
}

export default LoginPage;
