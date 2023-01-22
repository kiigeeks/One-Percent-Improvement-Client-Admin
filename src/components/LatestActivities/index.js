import React, { useEffect, useState } from 'react';
import { getAllImprovement } from '../../utilities/fetchApi';
import { toast } from 'react-toastify';
import ReactTimeAgo from 'react-time-ago';

const LatestActivities = () => {
    const [datas, setDatas] = useState([])

    useEffect(() => {
        fetchImprovements()
    }, [])

    const fetchImprovements = async () => {
        getAllImprovement().then((res) => {
            setDatas(
                res.payload.filter((improvements) => improvements.User.role === "employee").sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt)
                })
            )
        }).catch((err) => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }
    
    return (
        <div className="flex flex-col bg-white rounded-md drop-shadow-xl w-full lg:w-3/5 md:w-full p-3 gap-2">
            <span className=' font-ssp font-semibold text-2xl mx-3 text-darkPrimary'>Latest Activities</span>
            <div className="flex flex-col mb-5 gap-3 w-full mt-5">
                <div className="overflow-x-auto relative">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Employee
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Time
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Improvement
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas.slice(0, 5).map((data, i) => (
                                <tr key={i} className="bg-white border-b">
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap flex flex-row gap-2 items-center">
                                        <img 
                                            src={process.env.REACT_APP_PUBLIC_FOLDER+"/employee/noAvatar.png"}
                                            alt="Profile Pictures" 
                                            className="w-7 h-7 rounded-full object-cover"
                                        />
                                        <span>{data.User.fullname}</span>
                                    </th>
                                    <td className="py-4 px-6">
                                        <ReactTimeAgo date={Date.parse(data.createdAt)} locale="en-US"/>
                                    </td>
                                    <td className="py-4 px-6">
                                        "{data.message}"
                                    </td>
                                    <td className="py-4 px-6">
                                        {data.status === "done"
                                            ? <span className='bg-green-500 text-white font-ssp font-light text-sm px-2 py-1 rounded-xl'>{data.status}</span>
                                        : data.status ==="pending"
                                            ? <span className='bg-red-500 text-white font-ssp font-light text-sm px-2 py-1 rounded-xl'>{data.status}</span>
                                        : <span className='bg-yellow-500 text-white font-ssp font-light text-sm px-2 py-1 rounded-xl'>{data.status}</span>
                                        }
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default LatestActivities