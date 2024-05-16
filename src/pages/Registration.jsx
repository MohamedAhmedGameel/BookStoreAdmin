import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const RegistrationForm = () => {
    const Navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);
    const [loginMsg, setLoginMsg] = useState("")

    const phonePrefixError = "Phone number must start with 010, 011, 012, or 015";
    const phoneLengthError = "Phone number must be 11 digits long";

    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            encpass: "",
            phone: "",
            government: "",
            user_address: '',
            gender: '',
            acceptTerms: false,
            remember: false,
        },

        validationSchema: Yup.object({
            fullname: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
            encpass: Yup.string().required("Password is required").min(9, "Password should be more than 8 characters"),
            phone: Yup.string()
                .required("Phone Number is required")
                .matches(/^[0-9]*$/, "Phone number must contain only digits")
                .matches(/^(010|011|012|015)/, "Phone number must start with 010, 011, 012, or 015")
                .length(11, "Phone number must be 11 digits long"),


            government: Yup.string().required("Government is required"),
            acceptTerms: Yup.boolean().oneOf([true], "You must accept the terms"),
            user_address: Yup.string().required('Address is required'),
            gender: Yup.string().required("Gender is required"),

        }),
        onSubmit: async (values) => {
            try {
                const res = await axios.post('http://127.0.0.1/phpreactcrud/login/register.php', values);
                if (res.status === 200) {
                    console.log(res.data.success);
                    if (res.data.success) {
                        Navigate('/login');
                    } else {
                        setLoginMsg(res.data.error)
                    }

                }
            } catch (err) {
                console.log(err);
            }

        },
    });

    const governmentOptions = [

        { value: "New Valley", label: "New Valley" },
        { value: "Matruh", label: "Matruh" },
        { value: "Red Sea", label: "Red Sea" },
        { value: "Giza", label: "Giza" },
        { value: "South Sinai", label: "South Sinai" },
        { value: "North Sinai", label: "North Sinai" },
        { value: "Suez", label: "Suez" },
        { value: "Beheira", label: "Beheira" },
        { value: "Helwan", label: "Helwan" },
        { value: "Sharqia", label: "Sharqia" },
        { value: "Dakahlia", label: "Dakahlia" },
        { value: "Kafr el-Sheikh", label: "Kafr el-Sheikh" },
        { value: "Alexandria", label: "Alexandria" },
        { value: "Monufia", label: "Monufia" },
        { value: "Minya", label: "Minya" },
        { value: "Gharbia", label: "Gharbia" },
        { value: "Faiyum", label: "Faiyum" },
        { value: "Qena", label: "Qena" },
        { value: "Asyut", label: "Asyut" },
        { value: "Sohag", label: "Sohag" },
        { value: "Ismailia", label: "Ismailia" },
        { value: "Beni Suef", label: "Beni Suef" },
        { value: "Qalyubia", label: "Qalyubia" },
        { value: "Aswan", label: "Aswan" },
        { value: "Damietta", label: "Damietta" },
        { value: "Cairo", label: "Cairo" },
        { value: "Port Said", label: "Port Said" },
        { value: "Luxor", label: "Luxor" },
        { value: "6th of October", label: "6th of October" },
    ];
    return (
        <div className="min-h-screen flex items-center justify-center flex-col mb-[30px] pt-[200px]">
            <h1 className="text-[20px] sm:text-[32px] flex justify-center font-semibold mb-[50px] ">
                Welcome To Our <span className="text-blue-600 pl-[10px]">BOOK STORE</span>
            </h1>
            <form onSubmit={formik.handleSubmit} className="bg-white p-8 border-[1px] border-solid border-blue-600 rounded-md shadow-md w-[90%] sm:w-[500px]">
                <label>
                    <h1 className="text-[18px] pl-[5px] mb-[10px]">Full Name</h1>
                    <input
                        type="text"
                        name="fullname"
                        id="fullname"
                        placeholder="Name"
                        className="outline-none w-full p-2 mb-2 border border-blue-600 border-solid rounded"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullname}
                    />
                    {formik.touched.fullname && formik.errors.fullname && <p className="text-red-600">{formik.errors.fullname}</p>}
                </label>
                <label>
                    <h1 className="text-[18px] pl-[5px] mb-[10px]">Email</h1>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="outline-none w-full p-2 mb-2 border border-blue-600 border-solid rounded"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && <p className="text-red-600">{formik.errors.email}</p>}
                </label>
                <label>
                    <h1 className="text-[18px] pl-[5px] mb-[10px]">Password</h1>
                    <input
                        type="password"
                        name="encpass"
                        id="encpass"
                        placeholder="Password"
                        className="outline-none w-full p-2 mb-2 border border-blue-600 border-solid rounded"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.encpass}
                    />
                    {formik.touched.encpass && formik.errors.encpass && <p className="text-red-600">{formik.errors.encpass}</p>}
                </label>
                <label>
                    <h1 className="text-[18px] pl-[5px] mb-[10px]">Phone Number</h1>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Phone Number"
                        className="outline-none w-full p-2 mb-2 border border-blue-600 border-solid rounded"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone && <p className="text-red-600">{formik.errors.phone}</p>}
                </label>
                <label>
                    <h1 className="text-[18px] pl-[5px] mb-[10px]">Government</h1>
                    <select
                        name="government"
                        className="outline-none w-full p-2 mb-2 border border-blue-600 border-solid rounded"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.government}
                    >
                        <option value="" disabled selected>
                            Select Government
                        </option>
                        {governmentOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {formik.touched.government && formik.errors.government && <p className="text-red-600">{formik.errors.government}</p>}
                </label>
                <label>
                    <h1 className="text-[18px] pl-[5px] mb-[10px]">Address</h1>
                    <input
                        id="user_address"
                        name="user_address"
                        type="text"
                        placeholder="Address"
                        className={'outline-none w-full p-2 mb-2 border border-blue-600 border-solid rounded'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.user_address}
                    />
                    {formik.touched.user_address && formik.errors.user_address && (<p className="text-red-500 text-sm mt-1">{formik.errors.user_address}</p>)}
                </label>
                <label>
                    <h1 className="text-[18px] pl-[5px] mb-[10px]">Gender</h1>
                    <div className="flex flex-row gap-[20px]">
                        <div className="flex items-center mb-2">
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                checked={formik.values.gender === "male"}
                            />
                            <label htmlFor="male" className="ml-2">Male</label>
                        </div>
                        <div className="flex items-center mb-2">
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                checked={formik.values.gender === "female"}
                            />
                            <label htmlFor="female" className="ml-2">Female</label>
                        </div>
                    </div>
                    {formik.touched.gender && formik.errors.gender && (<p className="text-red-500 text-sm mt-1">{formik.errors.gender}</p>)}
                </label>

                <label className="">
                    <input
                        type="checkbox"
                        name="acceptTerms"
                        className="mr-2 mt-4"
                        checked={formik.values.acceptTerms}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    I Accept The <a href="#" className="text-blue-600">Terms Of Service And Privacy Policy</a>

                    {formik.touched.acceptTerms && formik.errors.acceptTerms && <p className="text-red-600">{formik.errors.acceptTerms}</p>}
                </label>
                <br />
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
                    className="bg-blue-500 text-white w-full py-2 rounded border-[1px] border-solid border-blue-600 hover:bg-white hover:text-black transition-all">
                    Register
                </button>
                {loginMsg && <p className="text-red-600 w-[100%] text-center">{loginMsg}</p>}
            </form>
            <div className="w-[90%] sm:w-[500px]">
                <p className="text-center bg-white p-[20px] border-[1px] border-solid border-blue-600 rounded-md shadow-md">
                    Have an account?<Link to={"/login"} className="text-blue-600"><u>Log-in</u></Link>
                </p>
            </div>

        </div>
    );
};

export default RegistrationForm;
