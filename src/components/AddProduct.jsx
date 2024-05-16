import axios from "axios";
import UploadWidget from "./UploadWidget";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AddProduct({ setModify, book }) {
    console.log(book)
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);

    const [imageUrl, setImageUrl] = useState(book?.book_image || null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authorRes = await axios.get('http://127.0.0.1/phpreactcrud/api/author.php');
                setAuthors(authorRes.data);

                const categoryRes = await axios.get('http://127.0.0.1/phpreactcrud/api/category.php');
                setCategories(categoryRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const formik = useFormik({
        initialValues: {
            book_name: book?.book_name || '',
            author: book?.author_id || '',
            categ: book?.categ_id || '',
            img: book?.book_image || imageUrl,
            dscp: book?.dscp || '',
            price: book?.price || '',
        },
        validationSchema: Yup.object({
            book_name: Yup.string().required('Book Name is required'),
            author: Yup.string().required('Author is required'),
            categ: Yup.string().required('Category is required'),
            dscp: Yup.string().required('Description is required'),
            price: Yup.number().typeError('Sale Price must be a number').required('Sale Price is required'),
            img: Yup.string().required('Image is required')
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            if (!book) {
                try {
                    const res = await axios.post('http://127.0.0.1/phpreactcrud/api/action.php', values);
                    if (res.data?.success == true) {
                        navigate('/books');
                    }
                } catch (err) {
                    console.log(err);
                    // Display error message to the user
                } finally {
                    setSubmitting(false);
                    resetForm();
                    setImageUrl(null); // Reset the image URL to null
                }
            } else {
                try {
                    const res = await axios.post('http://127.0.0.1/phpreactcrud/api/action.php', values);
                    console.log(formik.values);
                    if (res.data?.success == true) {
                        navigate('/books');
                    }
                } catch (err) {
                    console.log(err);
                    // Display error message to the user
                } finally {
                    setSubmitting(false);
                    resetForm();
                    setImageUrl(null); // Reset the image URL to null
                }
            }

        },
    });

    useEffect(() => {
        formik.values.img = imageUrl;
    }, [imageUrl]);

    return (
        <div className="min-h-screen pt-40 bg-gray-100 flex justify-center items-center">
            <div className="max-w-[1000px] w-[90%]">
                <h1 className='text-[25px] text-blue-600 flex justify-center sm:text-[40px] items-center font-bold mb-5'>Create a New Product</h1>
                <div className='flex justify-center'>
                    <div className="w-[90%] p-10">
                        <div className="bg-white p-5 shadow rounded">
                            <h2 className="text-[18px] flex justify-center sm:block sm:text-[30px] mb-[20px]">General Information</h2>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-[14px] sm:text-[20px] font-bold text-blue-600">Book Name</label>
                                    <input
                                        type="text"
                                        id="book_name"
                                        name="book_name"
                                        placeholder="Book Name"
                                        className="text-[10px] pl-[10px] sm:text-[20px] sm:p-[10px] mt-1 block w-full border-gray-500 h-[25px] sm:h-[40px] border-solid border-b  focus:outline-none focus:ring focus:ring-blue-300 focus:border-white focus:rounded"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.book_name}
                                    />
                                    {formik.touched.book_name && formik.errors.book_name && <p className="text-red-600">{formik.errors.book_name}</p>}
                                </div>
                                <div className='block sm:flex sm:justify-between'>
                                    <div className="mb-4 w-full sm:w-[45%]">
                                        <label className="text-[14px] sm:text-[20px] font-bold text-blue-600">Author</label>
                                        <select
                                            id="author"
                                            name="author"
                                            className="text-[7px] sm:p-[10px] sm:text-[15px] mt-1 block w-full border-gray-500 shadow-sm h-[25px] sm:h-[40px] border-solid border rounded-[5px] focus:outline-none focus:ring focus:ring-blue-300 focus:border-white"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.author}
                                        >
                                            <option value="" disabled>Select Author</option>
                                            {authors.map(author => (
                                                <option key={author.author_id} value={author.author_id}>{author.author_name}</option>
                                            ))}
                                        </select>
                                        {formik.touched.author && formik.errors.author && <p className="text-red-600">{formik.errors.author}</p>}
                                    </div>
                                    <div className="mb-4 w-full sm:w-[45%]">
                                        <label className="text-[14px] sm:text-[20px] font-bold text-blue-600">Category</label>
                                        <select
                                            id="categ"
                                            name="categ"
                                            className="text-[7px] sm:text-[15px] sm:p-[10px] mt-1 block w-full border-gray-500 shadow-sm h-[25px] sm:h-[40px] border-solid border rounded-[5px] focus:outline-none focus:ring focus:ring-blue-300 focus:border-white"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.categ}
                                        >
                                            <option value="" disabled>Select Category</option>
                                            {categories.map(category => (
                                                <option key={category.categ_id} value={category.categ_id}>{category.categ_name}</option>
                                            ))}
                                        </select>
                                        {formik.touched.categ && formik.errors.categ && <p className="text-red-600">{formik.errors.categ}</p>}
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label className="text-[14px] sm:text-[20px] font-bold text-blue-600">Description</label>
                                    <textarea
                                        id="dscp"
                                        name="dscp"
                                        rows={5}
                                        placeholder="Enter Description....  "
                                        className="block w-full mt-1 p-3 rounded-[5px] border border-solid focus:outline-none focus:ring focus:ring-blue-300 focus:border-white text-[10px] sm:text-[20px] shadow-sm"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.dscp}
                                    />
                                    {formik.touched.dscp && formik.errors.dscp && <p className="text-red-600">{formik.errors.dscp}</p>}

                                </div>
                                <div className='flex justify-center'>
                                    <div className="mb-4 w-[45%] flex flex-col justify-center">
                                        <label className="text-[14px] sm:text-[20px] font-bold text-blue-600 text-center">Sale Price</label>
                                        <input type='text'
                                            id="price"
                                            name="price"
                                            placeholder="$ 100,00"
                                            className="text-[7px] text-center sm:p-[10px] p-[5px] sm:text-[15px] mt-1 block w-full border-gray-500 h-[25px] sm:h-[40px] border-solid border-b  focus:outline-none focus:ring focus:ring-blue-300 focus:border-white focus:rounded "
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.price}
                                        />
                                        {formik.touched.price && formik.errors.price && <p className="text-red-600">{formik.errors.price}</p>}
                                    </div>
                                </div>
                                <div className='mt-4 mb-6'>
                                    <h1 className='text-[14px] sm:text-[20px] font-bold text-gray-700 mb-2'>Upload Product Image</h1>
                                    <UploadWidget value={formik.values.img} setImageUrl={setImageUrl} imageUrl={imageUrl} />

                                    {!imageUrl && formik.errors.img && <p className="text-red-600">{formik.errors.img}</p>}
                                    {/* <div className='flex justify-center items-center w-[100%] mt-[20px]'>
                                        <img src={imageUrl} alt="" />
                                    </div> */}
                                </div>
                                <div className="flex justify-between space-x-3 sm:justify-evenly">
                                    <button type="button" onClick={() => { { book ? setModify(false) : navigate('/books') } }} className="text-[10px] sm:text-[20px] bg-gray-200 text-gray-700 rounded px-4 py-2">Cancel</button>
                                    <button type="submit" className="text-[10px] sm:text-[20px] bg-blue-600 text-white rounded px-4 py-2">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
