import React, { useEffect, useRef, useState } from 'react';
import { RiCloseFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { addBroadcast } from '../../utilities/fetchApi';
import { IoIosCloseCircle } from "react-icons/io";

const ModalAddBroadcast = ({ setShowModalAdd, setFetchMore }) => {
    const clickRef = useRef(null)
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [status, setStatus] = useState("")
    const options = [
        {
            label: "Active",
            value: "active"
        },
        {
            label: "Inactive",
            value: "inactive"
        },
    ]

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (clickRef.current && !clickRef.current.contains(event.target)) {
                setShowModalAdd(null)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clickRef])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const reqData = new FormData();
        reqData.append("title", title);
        reqData.append("desc", desc);
        reqData.append("status", status);

        if(file) {
            reqData.append("file", file);
        }

        addBroadcast(reqData).then((res) => {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
            setFetchMore(true)
            setShowModalAdd(null)
        }).catch((err) => {
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    const handleModal = () => {
        setShowModalAdd(null)
    }

    return (
        <>
            <div  className='fixed top-0 left-0 z-10 h-screen w-screen overscroll-y-none overflow-y-hidden bg-black bg-opacity-70 p-3 flex items-center justify-center'>
                <div ref={clickRef} className="flex flex-col w-11/12 lg:w-1/3 md:w-1/2 h-fit bg-white rounded-md p-3">
                    <div className="flex justify-between items-center px-2">
                        <h3 className='font-bold font-ssp text-xl md:text-2xl'>Add New Broadcast</h3>
                        <RiCloseFill onClick={handleModal} className='w-8 h-8 cursor-pointer'/>
                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col px-5 w-full mt-5'>
                        <div className="relative z-0 mb-3 w-full group mt-3">
                            <input minLength={5} value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                        </div>
                        <div className="relative z-0 mb-3 w-full group mt-3">
                            <textarea minLength={3} value={desc} rows={5} onChange={(e) => setDesc(e.target.value)} type="text" name="desc" id="desc" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="desc" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                        </div>
                        <div className="relative z-0 mb-3 mt-4 w-full group">
                            <select required value={status} onChange={(e) => setStatus(e.target.value)} id="underline_select" className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                <option value="">Choose a status</option>
                                {options.map((option, i) => (
                                    <option key={i} value={option.value} >{option.label} </option>
                                ))}
                            </select>
                            <label htmlFor="underline_select" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Status</label>
                        </div>
                        <div className="relative z-0 mb-3 mt-3 w-full group">
                            <label className="block mb-2 font-ssp text-sm font-medium text-gray-500" htmlFor="file_input">Upload file</label>
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
                        <div className="relative z-0 mb-6 mt-5 w-full flex gap-3 justify-end">
                            <button type="submit" className="mt-5 text-white bg-blue-400 hover:bg-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer">Save</button>
                            <span onClick={handleModal} className="mt-5 text-white bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer">Close</span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalAddBroadcast