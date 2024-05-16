import axios from "axios";
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
    PointElement,
    LineElement,
    Title,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

function AuthorAnalysis() {
    const [gen, setGen] = useState([]);
    const [AuthCount, setCount] = useState([]);
    const [Authame, setName] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1/phpreactcrud/api/author_analysis.php');
                setGen(res.data);
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
            gen.forEach((item, index) => {
                counts[index] = item.book_count;
                names[index] = item.author_name;
            });
            setCount(counts);
            setName(names);
        };

        govCountfunc();
    }, [gen]); // Trigger calculation whenever gov state changes


    const data = {
        labels: Authame,
        datasets: [
            {
                label: 'Number of Governments',
                data: AuthCount,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            }
        ]
    }

    const options = {

    }
    return (
        <div>
            <div className="flex items-center flex-col justify-between py-5">
                <div className="main-header text-center ">
                    <h1 className=" mx-auto mb-20 p-[15px] border-b-[3px] border-solid border-blue-500 p-30 max-w-max md:text-4xl text-2xl relative">
                        Author
                        <span className="absolute w-5 h-5 left-1/2 transform -translate-x-1/2 top-[88%] bg-blue-500 rounded-full"></span>
                    </h1>
                </div>
                <div className="w-[80%] h-[300px] flex justify-center items-center">
                    <Line
                        data={data}
                        options={options}
                    ></Line>
                </div>
            </div>
        </div>
    )
}

export default AuthorAnalysis;