import axios from 'axios';
import { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function CategoryAnalysis() {
    const [cat, setcat] = useState([]);
    const [catCount, setCount] = useState([]);
    const [catName, setName] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://moga-library.000webhostapp.com/api/category_analysis.php');
                setcat(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {

        const govCountfunc = () => {
            const counts = [];
            const names = [];
            cat.forEach((item, index) => {
                counts[index] = item.book_count;
                names[index] = item.categ_name;
            });
            setCount(counts);
            setName(names);
        };

        govCountfunc();
    }, [cat]); // Trigger calculation whenever gov state changes


    const data = {
        labels: catName,
        datasets: [
            {
                label: 'Number of Governments',
                data: catCount,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderWidth: 1
            }
        ]
    }

    const options = {

    }
    return (
        <div >
            <div className="flex items-center lg:min-h-screen flex-col justify-between py-5">
                <div className="main-header text-center ">
                    <h1 className=" mx-auto mb-20 p-[15px] border-b-[3px] border-solid border-blue-500 p-30 max-w-max md:text-4xl text-2xl relative">
                        Category
                        <span className="absolute w-5 h-5 left-1/2 transform -translate-x-1/2 top-[88%] bg-blue-500 rounded-full"></span>
                    </h1>
                </div>
                <div className="w-[90vw] md:w-[60vw]  h-[80vh] md:h-[60vh] flex justify-center items-center">
                    <PolarArea
                        data={data}
                        options={options}
                    ></PolarArea>
                </div>
            </div>
        </div>
    )
}

export default CategoryAnalysis