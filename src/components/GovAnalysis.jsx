import axios from "axios";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";
import { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2"

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)


function GovAnalysis() {
    const [gov, setGov] = useState([]);
    const [govCount, setGovCount] = useState([]);
    const [govName, setGovName] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://book-store-admin-taupe.vercel.app/api/gov_analysis.php');
                setGov(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures useEffect runs only once after initial render

    useEffect(() => {
        // Calculate govCount after gov state has been updated
        const govCountfunc = () => {
            const counts = [];
            const names = [];
            gov.forEach((item, index) => {
                counts[index] = item.count;
                names[index] = item.government;
            });
            setGovCount(counts);
            setGovName(names);
        };

        govCountfunc();
    }, [gov]); // Trigger calculation whenever gov state changes


    const data = {
        labels: govName,
        datasets: [
            {

                label: 'analysis of Governments',
                data: govCount,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }
        ]
    }

    const options = {

    }
    return (
        <div id="analysis">
            <div className="flex items-center flex-col justify-between py-5">
                <div className="main-header text-center ">
                    <h1 className=" mx-auto mb-20 p-[15px] border-b-[3px] border-solid border-blue-500 p-30 max-w-max md:text-4xl text-2xl relative">
                        Government
                        <span className="absolute w-5 h-5 left-1/2 transform -translate-x-1/2 top-[88%] bg-blue-500 rounded-full"></span>
                    </h1>
                </div>
                <div className="w-[80%] h-[300px] flex justify-center items-center">
                    <Bar
                        data={data}
                        options={options}
                    ></Bar>
                </div>
            </div>
        </div>
    )
}

export default GovAnalysis