import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDivisions, getEmployee, getListImprovement, getPercentage, updateEmployee } from '../../utilities/fetchApi';
import { toast } from 'react-toastify';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ReactTimeAgo from 'react-time-ago';

const DetailEmployee = () => {
    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [divisionId, setDivisionId] = useState("")
    const [divisons, setDivisions] = useState([])
    const [confirmPassword, setConfirmPassword] = useState("")
    const [donePercent, setDonePercent] = useState("");
    const [lengthImprove, setLengthImprove] = useState("");
    const params = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [listImprovement, setListImprovement] = useState([])
    
    useEffect(() => {
        fetchEmployee()
        fetchDivisions()
        fetchPercentage()
        fetchListImprovement()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchEmployee = async () => {
        getEmployee(params.uuid).then((res) => {
            setData(res.payload)
            setFullname(res.payload.fullname)
            setUsername(res.payload.username)
            setDivisionId(res.payload.Division.id)
        }).catch((err) => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })  
    }

    const fetchDivisions = async () => {
        getDivisions().then((res) => {
            setDivisions(res.payload.filter((division) => division.statusActive === "active"))
        }).catch((error) => {
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    const fetchPercentage = async () => {
        getPercentage(0, params.uuid).then((res) => {
            const improvements = res.payload
            const lengthData = res.payload.length

            setLengthImprove(lengthData)
            if (lengthData !== 0) {
                setDonePercent(
                    Math.floor(((improvements.filter((data) => data.status === "done")).length/lengthData)*100)
                )
            }else {
                setDonePercent(" - ")
            }
        }).catch((error) => {
            toast.error("Something Wrong "+error.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    const fetchListImprovement = async () => {
        getListImprovement(params.uuid).then((res) => {
            setListImprovement(
                res.payload.sort((p1, p2) => {
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

    const hanldeUpdate = async (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            return toast.error("Password not match", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        }

        const reqData = {
            fullname,
            username,
            divisionId,
            password
        }

        updateEmployee(params.uuid, reqData).then((res) => {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
            //set all
            setData(res.payload) 
            setFullname(res.payload.fullname)
            setUsername(res.payload.username)
            setDivisionId(res.payload.divisionId)
        }).catch((err) => {
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
        setPassword("")
        setConfirmPassword("")
    }

    const columns = [
        { 
            field: 'time', 
            headerName: 'Time', 
            width: 150, 
            renderCell: (params) => {
                return (
                    <div className="font-ssp">
                        {
                            <ReactTimeAgo date={Date.parse(params.row.createdAt)} locale="en-US"/>
                        }
                        {/* {
                            new Date(params.row.createdAt).toLocaleString(
                                "ID",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: '2-digit', 
                                    minute: '2-digit', 
                                    second: '2-digit',
                                }
                            )
                        } */}
                    </div>
                )
            } 
        },
        { 
            field: 'improvement', 
            headerName: 'Improvement', 
            width: 400, 
            renderCell: (params) => {
                return (
                    <div className='flex justify-center items-center font-ssp'>
                        {params.row.message}
                    </div>
                )
            } 
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="font-ssp">
                        {params.row.status === "done"
                            ? <span className="px-2 py-1 bg-green-400 rounded-full text-white">{params.row.status}</span>
                        : params.row.status === "pending"
                            ? <span className="px-2 py-1 bg-red-400 rounded-full text-white">{params.row.status}</span>
                        : <span className="px-2 py-1 bg-yellow-400 rounded-full text-white">{params.row.status}</span>
                        }
                    </div>
                )
            } 
        },
        {
            field: 'review',
            headerName: 'Review',
            width: 400,
            renderCell: (params) => {
                return (
                    <div className="font-ssp">
                        {params.row.note}
                    </div>
                    
                )
            } 
        },
    ]

    return (
        <div className='min-h-[calc(100vh-4rem)] flex flex-col'>
            {/* header  */}
            <div className="flex flex-row justify-between my-5 mx-7 md:mx-5">
                <h1 className='font-ssp font-bold text-4xl md:text-3xl'>Detail Employee</h1>
            </div>
            {/* content */}
            <div className="flex flex-col lg:flex-row  justify-evenly gap-10 my-5 mx-7 md:mx-5">
                {/* detail employee */}
                <div className="flex flex-col bg-white drop-shadow-lg rounded-md px-3 py-4 w-full lg:w-1/4 md:w-1/2 ">
                    <div className="flex flex-row gap-5 p-3">
                        <img className='h-20 w-20 object-cover rounded-full' src={process.env.REACT_APP_PUBLIC_FOLDER+"/employee/noAvatar.png"} alt="" />
                        <div className="flex flex-col justify-center">
                            <span className='font-ssp text-2xl font-bold '>{data.fullname}</span>
                            <span className='font-ssp text-lg font-light'>{data.Division?.name}</span>
                        </div>
                    </div>
                    <div className="flex flex-col mt-3 p-3">
                        <span className='text-gray-500 font-ssp text-xl font-semibold italic tracking-wide'>Account Details</span>
                        <div className="flex flex-row gap-2 mt-3">
                            <span className='font-ssp font-semibold text-base'>Fullname :</span>
                            <span className=' font-ssp text-base'>{data.fullname}</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <span className='font-ssp font-semibold text-base'>Username :</span>
                            <span className=' font-ssp text-base'>{data.username}</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <span className='font-ssp font-semibold text-base'>Division :</span>
                            <span className=' font-ssp text-base'>{data.Division?.name}</span>
                        </div>
                    </div>
                    <div className="flex flex-col mt-3 p-3">
                        <span className='text-gray-500 font-ssp text-xl font-semibold italic tracking-wide'>Percentage Improvement</span>
                        <div className="flex flex-row gap-2 mt-3">
                            <span className='font-ssp font-semibold text-4xl'>{donePercent}%</span>
                            <span className='flex items-center font-ssp text-base'>success percentage</span>
                        </div>
                        <div className="flex flex-row gap-2 mt-3 items-center">
                            <span className='font-ssp font-semibold text-lg'>Total</span>
                            <span className=' font-ssp text-base'>{lengthImprove} Times</span>
                        </div>
                    </div>
                </div>
                {/* form update */}
                <div className="flex bg-white drop-shadow-lg rounded-md px-2 py-4 w-full lg:w-2/3 md:w-10/12">
                    <form onSubmit={hanldeUpdate} className='flex flex-col px-5 w-full'>
                        <div className="relative z-0 mb-6 w-full group mt-3">
                            <input minLength={3} value={fullname} onChange={(e) => setFullname(e.target.value)} type="text" name="fullname" id="fullname" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="fullname" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fullname</label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input minLength={3} value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                        </div>
                        <div className="relative z-0 mb-6 mt-3 w-full group">
                            <select required value={divisionId} onChange={(e) => setDivisionId(e.target.value)} id="underline_select" className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                <option value="">Choose a division</option>
                                {divisons.map((option, i) => (
                                    <option key={i} value={option.id} >{option.name} </option>
                                ))}
                            </select>
                            <label htmlFor="underline_select" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Division</label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="floating_password" id="floating_password" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input minLength={6} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm New Password</label>
                        </div>
                        <div className="relative z-0 mb-6 w-full flex gap-5 justify-center">
                            <button type="submit" className="cursor-pointer mt-5 text-white bg-green-400 hover:bg-green-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                            <span onClick={() => navigate(-1)} className="cursor-pointer mt-5 text-white bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Back</span>
                        </div>
                    </form>
                </div>
            </div>
            {/* sub header  */}
            <div className="flex flex-row justify-between my-5 mx-7 md:mx-5">
                <h3 className='font-ssp font-bold text-3xl md:text-2xl'>List Improvement - <span className='italic'>{data.fullname}</span></h3>
            </div>
            {/* list improvement */}
            <div className="flex mb-5 mx-7 md:mx-5">
                <div className="flex bg-white drop-shadow-lg p-2 w-full rounded-md">
                    <DataGrid
                        autoHeight {...listImprovement}
                        rows={listImprovement}
                        columns={columns}
                        pageSize={5}
                        getRowId={(row) => row.uuid}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        components={{ Toolbar: GridToolbar, }}
                    />
                </div>
            </div>
        </div>
    )
}

export default DetailEmployee