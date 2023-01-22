import React, { useEffect, useRef, useState } from 'react';
import { RiCloseFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { addEmployee, getDivisions } from '../../utilities/fetchApi';

const ModalAddEmployee = ({ setShowModalAdd, setFetchMore }) => {
    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [divisionId, setDivisionId] = useState("")
    const [divisons, setDivisions] = useState([])
    const clickRef = useRef(null)

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

    useEffect(() => {
        fetchDivisions()
    }, [])

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

    const handleSubmit = async(e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            return toast.error("Password not match", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        }

        const reqData = {
            fullname,
            username,
            password,
            divisionId
        }

        addEmployee(reqData).then((res) => {
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
                <div ref={clickRef} className="flex flex-col w-11/12 lg:w-1/3 md:w-1/2 bg-white rounded-md p-3">
                    <div className="flex justify-between items-center px-2">
                        <h3 className='font-bold font-ssp text-xl md:text-2xl'>Add New Employee</h3>
                        <RiCloseFill onClick={handleModal} className='w-8 h-8 cursor-pointer'/>
                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col px-5 w-full mt-5'>
                        <div className="relative z-0 mb-3 w-full group mt-3">
                            <input minLength={3} value={fullname} onChange={(e) => setFullname(e.target.value)} type="text" name="fullname" id="fullname" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="fullname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fullname</label>
                        </div>
                        <div className="relative z-0 mb-3 w-full group mt-3">
                            <input minLength={3} value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                        </div>
                        <div className="relative z-0 mb-3 mt-3 w-full group">
                            <select required value={divisionId} onChange={(e) => setDivisionId(e.target.value)} id="underline_select" className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                <option value="">Choose a division</option>
                                {divisons.map((option, i) => (
                                    <option key={i} value={option.id} >{option.name} </option>
                                ))}
                            </select>
                            <label htmlFor="underline_select" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Division</label>
                        </div>
                        <div className="relative z-0 mb-3 w-full group mt-3">
                            <input minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>
                        <div className="relative z-0 mb-3 w-full group mt-3">
                            <input minLength={6} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirmPassword" id="confirmPassword" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="confirmPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
                        </div>
                        <div className="relative z-0 mb-6 mt-5 w-full flex gap-3 justify-end">
                            <button type="submit" className="mt-5 text-white bg-blue-400 hover:bg-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Save</button>
                            <span onClick={handleModal} className="mt-5 text-white bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Close</span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalAddEmployee