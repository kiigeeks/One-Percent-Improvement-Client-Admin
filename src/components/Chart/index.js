import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';
import { getChart } from '../../utilities/fetchApi';

const Chart = ({ title, grid }) => {
    const [datas, setDatas] = useState([])
    const optionDurations = [
        {
            label: "in Last Week",
            value: 1,
        },
        {
            label: "in Last 5 Month",
            value: 2,
        },
        {
            label: "in Last Years",
            value: 3,
        },
    ]
    const [duration, setDuration] = useState(optionDurations[0])

    useEffect(() => {
        fetchChart(duration.value)
    }, [duration])

    const fetchChart = async (timeline) => {
        getChart(timeline).then((res) => {
            setDatas(res.payload)
        }).catch((error) => {
            toast.error("Something Wrong"+error.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    const handleDuration = (e) => {
        const filterLabel = optionDurations.filter((data) => (data.value).toString() === e.target.value)
        setDuration(filterLabel[0])
    }

    return (
        <>
            <div className='flex flex-col bg-white rounded-md drop-shadow-xl p-3 w-full gap-2'>
                <div className="flex flex-row w-full justify-between mb-3">
                    <h3 className='font-ssp font-semibold text-2xl mx-3 text-darkPrimary'>{title}</h3>
                    <select 
                        onChange={handleDuration} 
                        className="block w-fit text-sm mx-3 text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                        {optionDurations.map((option, i) => (
                            <option key={i} value={option.value}>{option.label} </option>
                        ))}
                    </select>
                </div>
                <ResponsiveContainer width="99%" aspect={3} >
                    <LineChart 
                        data={datas}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="label" stroke='#000' />
                        <Line type="monotone" dataKey={"values"} stroke='#000'/>
                        <Tooltip />
                        {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray="5 5"/>}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default Chart