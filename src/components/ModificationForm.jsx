import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const ModificationForm = ({ setModify, user }) => {
  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      ...user,
      user_password: '',
      admin: false,
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required('Full Name is required'),
      gender: Yup.string().required('Gender is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      user_password: Yup.string().required('Password is required').min(9, "Password should be more than 8 characters"),
      user_address: Yup.string().required('Address is required'),
      phone: Yup.string().required('Phone number is required'),
      government: Yup.string().required('Government is required'),
      admin: Yup.string(),
    }),
    onSubmit: async values => {
      try {
        const res = await axios.put(`https://book-store-admin-taupe.vercel.app/api/users.php?id=${user.id}`, values);
        if (res.data?.success === true) {
          console.log(101)
          setModify(false)// Assuming Navigate is a function to redirect
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
    <div className="h-screen flex items-center justify-center flex-col mb-[30px] ">
      <h1 className="text-[20px] sm:text-[32px] flex justify-center font-semibold mb-[50px] text-blue-600 pl-[10px]    ">
        Modify User Information
      </h1>
      <form onSubmit={formik.handleSubmit} className="bg-white w-[80%] p-8 border-[1px] border-solid border-blue-600 rounded-md shadow-md sm:w-[500px]">

        <label>
          <h1 className="text-[18px] pl-[5px] ">Full Name</h1>
          <input
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Name"
            className="outline-none w-full p-2 mb-4 border border-blue-600 border-solid rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullname}
          />
          {formik.touched.fullname && formik.errors.fullname && <p className="text-red-600">{formik.errors.fullname}</p>}
        </label>
        <label>
          <h1 className="text-[18px] pl-[5px] ">Email</h1>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="outline-none w-full p-2 mb-4 border border-blue-600 border-solid rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && <p className="text-red-600">{formik.errors.email}</p>}
        </label>
        <label>
          <h1 className="text-[18px] pl-[5px] ">Password</h1>
          <input
            type="password"
            name="user_password"
            id="user_password"
            placeholder="Password"
            className="outline-none w-full p-2 mb-4 border border-blue-600 border-solid rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.user_password}
          />
          {formik.touched.user_password && formik.errors.user_password && <p className="text-red-600">{formik.errors.user_password}</p>}
        </label>
        <label>
          <h1 className="text-[18px] pl-[5px] ">Phone Number</h1>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone Number"
            className="outline-none w-full p-2 mb-4 border border-blue-600 border-solid rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone && <p className="text-red-600">{formik.errors.phone}</p>}
        </label>
        <label>
          <h1 className="text-[18px] pl-[5px] ">Government</h1>
          <select
            name="government"
            className="outline-none w-full p-2 mb-4 border border-blue-600 border-solid rounded"
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
          <h1 className="text-[18px] pl-[5px] ">Address</h1>
          <input
            id="user_address"
            name="user_address"
            type="text"
            placeholder="Address"
            className={'outline-none w-full p-2 mb-4 border border-blue-600 border-solid rounded'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.user_address}
          />
          {formik.touched.user_address && formik.errors.user_address && (<p className="text-red-500 text-sm mt-1">{formik.errors.user_address}</p>)}
        </label>
        <label className="items-center relative flex flex-col">
          <select
            name="admin"
            className="border w-full rounded px-2 py-1 mt-2 border-blue-600 border-solid rounded"
            value={formik.values.admin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value={0}>User</option>
            <option value={1}>Admin</option>

          </select>

          {formik.touched.admin && formik.errors.admin && <p className="text-red-600">{formik.errors.admin}</p>}
        </label>
        <label>
          <h1 className="text-[18px] pl-[5px] ">Gender</h1>
          <div className="flex flex-row gap-[20px]">
            <div className="flex items-center mb-4">
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
            <div className="flex items-center mb-4">
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




        <div className="flex justify-between space-x-3 sm:justify-evenly">
          <button
            onClick={() => setModify(false)}
            className="bg-blue-500 text-white w-full py-2 rounded border-[1px] border-solid border-blue-600 hover:bg-white hover:text-black transition-all">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 rounded border-[1px] border-solid border-blue-600 hover:bg-white hover:text-black transition-all">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModificationForm;
