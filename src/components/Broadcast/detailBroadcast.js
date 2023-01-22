import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getBroadcast, updateBroadcast } from '../../utilities/fetchApi';
import { IoIosCloseCircle } from "react-icons/io";

const DetailBroadcast = () => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [flyer, setFlyer] = useState("")
    const [status, setStatus] = useState("")
    const [file, setFile] = useState(null)
    const [data, setData] = useState({})
    const params = useParams()
    const navigate = useNavigate()
    const optionStatus = [
        {
            label: "Choose a Status",
            value: "",
        },
        {
            label: "Active",
            value: "active",
        },
        {
            label: "Inactive",
            value: "inactive",
        },
    ]

    useEffect(() => {
        fetchBroadcast()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchBroadcast = async () => {
        getBroadcast(params.uuid).then((res) => {
            setData(res.payload)
            setTitle(res.payload.title)
            setDesc(res.payload.desc)
            setFlyer(res.payload.flyer)
            setStatus(res.payload.status)
        }).catch((err) => {
            toast.error(err, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })  
    }

    const hanldeUpdate = async (e) => {
        e.preventDefault()

        const reqData = new FormData();
        reqData.append("title", title);
        reqData.append("desc", desc);
        reqData.append("status", status);

        if(file) {
            reqData.append("file", file);
        }

        updateBroadcast(params.uuid, reqData).then((res) => {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
            fetchBroadcast()
        }).catch((err) => {
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
        setFile(null)
    }

    return (
        <div className='min-h-[calc(100vh-4rem)] flex flex-col'>
            {/* header  */}
            <div className="flex flex-row justify-between my-5 mx-7 md:mx-5">
                <h1 className='font-ssp font-bold text-4xl md:text-3xl'>Detail Broadcast</h1>
            </div>
            {/* content */}
            <div className="flex flex-col lg:flex-row  justify-evenly gap-10 my-5 mx-7 md:mx-5">
                {/* detail broadcast */}
                <div className="flex flex-col bg-white drop-shadow-lg rounded-md px-3 py-4 gap-3 w-full lg:w-1/4 md:w-1/2 ">
                    {flyer && 
                        <img src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${flyer}`} alt={title} />
                    }
                    <div className="flex flex-col mt-3 p-3 gap-2">
                        <span className='font-ssp text-base'>{data.title}</span>
                        <span className='font-ssp text-sm font-light'>{data.desc}</span>
                    </div>
                </div>
                {/* form update */}
                <div className="flex bg-white drop-shadow-lg rounded-md px-2 py-4 w-full lg:w-2/3 md:w-10/12">
                    <form onSubmit={hanldeUpdate} className='flex flex-col px-5 w-full'>
                        <div className="relative z-0 mb-6 w-full group mt-3">
                            <input minLength={5} value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <textarea 
                                minLength={5} 
                                value={desc} 
                                onChange={(e) => setDesc(e.target.value)}
                                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                required
                                rows={5}
                            />
                            <label htmlFor="desc" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                        </div>
                        <div className="relative z-0 mb-6 mt-3 w-full group">
                            <select required value={status} onChange={(e) => setStatus(e.target.value)} id="underline_select" className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                {optionStatus.map((option, i) => (
                                    <option key={i} value={option.value} >{option.label} </option>
                                ))}
                            </select>
                            <label htmlFor="underline_select" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Status</label>
                        </div>
                        <div className="relative z-0 mb-6 mt-3 w-full group">
                            <label className="block mb-2 font-ssp text-xs font-medium text-gray-500" htmlFor="file_input">Flyer</label>
                            <input 
                                type="file" 
                                name="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                accept='.png,.jpeg,.jpg'
                                className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-gray-50 file:text-gray-500
                                    hover:file:bg-gray-100
                                    "
                            />
                            <p className="mt-1 font-ssp text-xs text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG or JPEG (MAX. 5MB).</p>
                        </div>
                        {file && 
                            <div className="relative flex flex-row mt-3 w-full group">
                                <img src={URL.createObjectURL(file)} alt="" className=" w-1/4" />
                                <IoIosCloseCircle  fontSize='25px' className='item-start -mt-3 -ml-3 bg-white rounded-full cursor-pointer' onClick={() => setFile(null)} />
                            </div>
                        }
                        <div className="relative z-0 mb-6 w-full flex gap-5 justify-center">
                            <button type="submit" className="cursor-pointer mt-5 text-white bg-green-400 hover:bg-green-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                            <span onClick={() => navigate(-1)} className="cursor-pointer mt-5 text-white bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Back</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DetailBroadcast