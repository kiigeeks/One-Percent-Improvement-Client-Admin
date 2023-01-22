import React, { useEffect, useState } from 'react';
import { getBestImprovements } from '../../utilities/fetchApi';
import { toast } from 'react-toastify';

const BestEmployee = () => {
    const [datas, setDatas] = useState([])

    useEffect(() => {
        fetchBestImprovement()
    }, [])

    const fetchBestImprovement = async () => {
        getBestImprovements().then((res) => {
            setDatas(
                res.payload.sort((p1, p2) => {
                    return p2.done - p1.done
                }).filter((data) => data.done !== null)
            )
        }).catch((err) => {
            toast.error(err, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    return (
        <div className="flex flex-col bg-white rounded-md drop-shadow-xl gap-2 w-full md:w-full lg:w-[37%] p-3 mt-7 lg:mt-0">
            <span className='font-ssp font-semibold text-2xl mb-3 mx-3 text-darkPrimary'>Best Employee</span>
            <div className="flex flex-col mb-5 gap-3 w-full">
                <div className="overflow-x-auto relative">
                    <table className="w-full text-sm text-left text-gray-500">
                        <tbody>
                            {datas.slice(0, 7).map((data, i) => (
                                <tr key={i} className="bg-white">
                                    <th className='p-4 font-bold text-xl'>{i+1}</th>
                                    <th className="p-4 font-medium text-gray-900 whitespace-pre-wrap flex flex-row items-center gap-2">
                                        <img 
                                            src={process.env.REACT_APP_PUBLIC_FOLDER+"/employee/noAvatar.png"}
                                            alt="Profile Pictures" 
                                            className="w-7 h-7 rounded-full object-cover"
                                        />
                                        <span className='font-ssp text-base'>{data.fullname}</span>
                                    </th>
                                    <td className="p-4">
                                        <span className='font-ssp text-lg md:text-xl font-bold'>{data.done}%</span>
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

export default BestEmployee