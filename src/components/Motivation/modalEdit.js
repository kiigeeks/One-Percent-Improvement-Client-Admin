import React, { useEffect, useRef, useState } from 'react'
import { RiCloseFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { updateMotivation } from '../../utilities/fetchApi';

const ModalEditMotivation = ({ setEditId, dataId, setFetchMore }) => {
    const [message, setMessage] = useState(dataId.message)
    const [author, setAuthor] = useState(dataId.author)
    const [status, setStatus] = useState(dataId.status)
    const clickRef = useRef(null)
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
        const handleClickOutside = (event) => {
            if (clickRef.current && !clickRef.current.contains(event.target)) {
                setEditId(null)
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

    const handleUpdate = async (e) => {
        e.preventDefault()

        const reqData = {
            message,
            author,
            status,
        }

        updateMotivation(dataId.uuid, reqData).then((res) => {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
            setFetchMore(true)
            setEditId(null)
        }).catch((err) => {
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    const handleModal = () => {
        setEditId(null)
    }

    return (
        <>
            <div  className='fixed top-0 left-0 z-10 h-screen w-screen overscroll-y-none overflow-y-hidden bg-black bg-opacity-70 p-3 flex items-center justify-center'>
                <div ref={clickRef} className="flex flex-col gap-3 w-11/12 lg:w-1/3 md:w-1/2 bg-white rounded-md p-3">
                    <div className="flex justify-between items-center px-2">
                        <h3 className='font-bold font-ssp text-xl md:text-2xl'>Edit Motivation by {dataId.author}</h3>
                        <RiCloseFill onClick={handleModal} className='w-8 h-8 cursor-pointer'/>
                    </div>
                    <form onSubmit={handleUpdate} className='flex flex-col px-5 w-full mt-5 gap-2'>
                        <div className="relative z-0 mb-6 w-full group mt-3">
                            <input minLength={5} value={message} onChange={(e) => setMessage(e.target.value)} type="text" name="message" id="message" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="message" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Message</label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input minLength={3} value={author} onChange={(e) => setAuthor(e.target.value)} type="text" name="author" id="author" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="author" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Author</label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <select required value={status} onChange={(e) => setStatus(e.target.value)}  id="underline_select" className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                {optionStatus.map((option, i) => (
                                    <option key={i} value={option.value} >{option.label} </option>
                                ))}
                            </select>
                            <label htmlFor="underline_select" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Status</label>
                        </div>
                        <div className="relative z-0 mb-6 w-full flex gap-5 justify-end">
                            <button type="submit" className="mt-5 text-white bg-blue-400 hover:bg-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer">Save</button>
                            <span onClick={handleModal} className="mt-5 text-white bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer">Close</span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalEditMotivation