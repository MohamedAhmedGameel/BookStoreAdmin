
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const AddAuthor = () => {
  const Navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      author_name: '',
    },
    validationSchema: Yup.object({
      author_name: Yup.string()
        .matches(/^[a-zA-Z\s]*$/, 'Author name should only contain letters and spaces')
        .required('Author name is required'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post('http://127.0.0.1/phpreactcrud/api/author.php', values);
        if (res.data?.success == true) {
          Navigate('/authors')
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 h-screen flex items-center flex-col justify-center">
      <div>
        <h2 className="block text-gray-700 text-xl font-bold mb-2">Add New Author</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="author_name"
              name="author_name"
              placeholder="Author Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.author_name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.author_name && formik.errors.author_name && (
              <div className="text-red-500 text-xs ">{formik.errors.author_name}</div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Author
          </button>
        </form>
      </div>

    </div>
  );
};

export default AddAuthor;
