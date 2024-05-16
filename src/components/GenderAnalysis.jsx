import axios from "axios";
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2"


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

function GenderAnalysis() {
    const [gen, setGen] = useState([]);
    const [govCount, setCount] = useState([]);
    const [govName, setName] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://moga-library.000webhostapp.com/api/gender_analysis.php');
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
                counts[index] = item.count;
                names[index] = item.gender;
            });
            setCount(counts);
            setName(names);
        };

        govCountfunc();
    }, [gen]); // Trigger calculation whenever gov state changes


    const data = {
        labels: govName,
        datasets: [
            {
                label: 'Number of Governments',
                data: govCount,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],

                borderWidth: 1
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
                        Gender
                        <span className="absolute w-5 h-5 left-1/2 transform -translate-x-1/2 top-[88%] bg-blue-500 rounded-full"></span>
                    </h1>
                </div>
                <div className="w-[80%] h-[300px] flex justify-center items-center">
                    <Doughnut
                        data={data}
                        options={options}
                    ></Doughnut>
                </div>
            </div>
        </div>
    )
}

export default GenderAnalysis