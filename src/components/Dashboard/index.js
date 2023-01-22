import React, { useEffect, useState } from 'react';
import { AiOutlineUsergroupAdd, AiFillGolden, AiOutlineTags } from "react-icons/ai";
import { HiSpeakerphone } from "react-icons/hi";
import Chart from '../Chart';
import { Link } from 'react-router-dom';
import BestEmployee from '../BestEmployee';
import LatestActivities from '../LatestActivities';
import { getAllMotivations, getBroadcasts, getDivisions, getEmployees } from '../../utilities/fetchApi';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [divisionActive, setDivisionActive] = useState("")
    const [employeeActive, setEmployeeActive] = useState("")
    const [broadcastActive, setBroadcastActive] = useState("")
    const [motivationActive, setMotivationActive] = useState("")

    useEffect(() => {
        fetchDivisions()
        fetchEmployees()
        fetchBroadcasts()
        fetchMotivations()
    }, [])

    const fetchDivisions = async () => {
        getDivisions().then((res) => {
            setDivisionActive(res.payload.filter((division) => division.statusActive === "active").length)
        }).catch((error) => {
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    const fetchEmployees = async () => {
        getEmployees().then((res) => {
            setEmployeeActive(res.payload.filter((employee) => employee.statusActive === "active").length)
        }).catch((err) => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })  
    }

    const fetchBroadcasts = async () => {
        getBroadcasts().then((res) => {
            setBroadcastActive( res.payload.length)
            // setBroadcastActive( res.payload.filter((bc) => bc.status === "active").length)
        }).catch((err) => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    const fetchMotivations = async () => {
        getAllMotivations().then((res) => {
            setMotivationActive(res.payload.filter((motivation) => motivation.status === "active").length)
        }).catch((err) => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    return (
        <div className='min-h-[calc(100vh-4rem)] flex flex-col'>
            {/* leaderboard  */}
            <div className="flex flex-wrap md:flex-row my-5 mx-7 md:mx-5 gap-5">
                <div className="flex flex-col bg-white rounded-md drop-shadow-xl p-1 flex-1 gap-2">
                    <div className="flex flex-row justify-between mb-2 text-gray-700">
                        <div className="flex flex-col justify-between flex-1 ml-3 ">
                            <span className=' font-ssp font-extrabold text-4xl md:text-5xl '>{divisionActive}</span>
                            <span className=' font-ssp font-medium text-base md:text-xl tracking-wide'>Division</span>
                        </div>
                        <div className="flex flex-1 items-center justify-end mr-3">
                            <AiFillGolden fontSize={50} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Link to={"/division"} className='font-ssp md:text-base text-sm transition-all duration-200 ease-in-out text-gray-400 hover:text-gray-700 font-semibold hover:underline cursor-pointer'>
                            More Info
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col bg-white rounded-md drop-shadow-xl p-1 flex-1 gap-2">
                    <div className="flex flex-row justify-between mb-2 text-gray-700">
                        <div className="flex flex-col justify-between flex-1 ml-3 ">
                            <span className=' font-ssp font-extrabold text-4xl md:text-5xl '>{employeeActive}</span>
                            <span className=' font-ssp font-medium text-base md:text-xl tracking-wide'>Employee</span>
                        </div>
                        <div className="flex flex-1 items-center justify-end mr-3">
                            <AiOutlineUsergroupAdd fontSize={50} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Link to={"/employee"} className='font-ssp md:text-base text-sm transition-all duration-200 ease-in-out text-gray-400 hover:text-gray-700 font-semibold hover:underline cursor-pointer'>
                            More Info
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col bg-white rounded-md drop-shadow-xl p-1 flex-1 gap-2">
                    <div className="flex flex-row justify-between mb-2 text-gray-700">
                        <div className="flex flex-col justify-between flex-1 ml-3 ">
                            <span className=' font-ssp font-extrabold text-4xl md:text-5xl '>{broadcastActive}</span>
                            <span className=' font-ssp font-medium text-base md:text-xl tracking-wide'>Broadcast</span>
                        </div>
                        <div className="flex flex-1 items-center justify-end mr-3">
                            <HiSpeakerphone fontSize={50} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Link to={"/broadcast"} className='font-ssp md:text-base text-sm transition-all duration-200 ease-in-out text-gray-400 hover:text-gray-700 font-semibold hover:underline cursor-pointer'>
                            More Info
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col bg-white rounded-md drop-shadow-xl p-1 flex-1 gap-2">
                    <div className="flex flex-row justify-between mb-2 text-gray-700">
                        <div className="flex flex-col justify-between flex-1 ml-3 ">
                            <span className=' font-ssp font-extrabold text-4xl md:text-5xl '>{motivationActive}</span>
                            <span className=' font-ssp font-medium text-base md:text-xl tracking-wide'>Motivation</span>
                        </div>
                        <div className="flex flex-1 items-center justify-end mr-3">
                            <AiOutlineTags fontSize={50} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Link to={"/motivation"} className='font-ssp md:text-base text-sm transition-all duration-200 ease-in-out text-gray-400 hover:text-gray-700 font-semibold hover:underline cursor-pointer'>
                            More Info
                        </Link>
                    </div>
                </div>
            </div>
            {/* chart  */}
            <div className="flex my-5 mx-7 md:mx-5 ">
                <Chart title={"Employee Analytics"} grid />
            </div>
            {/* widget */}
            <div className="flex flex-wrap-reverse justify-center lg:justify-between md:flex-row mt-5 mb-5 mx-7 md:mx-5 gap-2">
                <BestEmployee />
                <LatestActivities />
            </div>
        </div>
    )
}

export default Dashboard