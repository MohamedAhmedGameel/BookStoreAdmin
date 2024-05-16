
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const AddCategory = () => {
  const Navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      categ_name: '',
    },
    validationSchema: Yup.object({
      categ_name: Yup.string()
        .matches(/^[a-zA-Z\s]*$/, 'Category name should only contain letters and spaces')
        .required('Category name is required'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post('http://127.0.0.1/phpreactcrud/api/category.php', values);
        console.log(res.data.success)
        if (res.data?.success == true) {
          Navigate('/categories')
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 h-screen flex flex-col justify-center items-center">
      <div>
        <h2 className="block text-gray-700 text-xl font-bold mb-2">Add New Category</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="categ_name"
              name="categ_name"
              placeholder="Category Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.categ_name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.categ_name && formik.errors.categ_name && (
              <div className="text-red-500 text-xs ">{formik.errors.categ_name}</div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Category
          </button>
        </form>
      </div>

    </div>
  );
};

export default AddCategory;
