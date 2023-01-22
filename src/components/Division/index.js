import React, { useState, useEffect, useRef } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CreateIcon from '@mui/icons-material/Create';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ModalEditDivision from './modalEdit';
import { addDivision, getDivisions, toggleDivision } from '../../utilities/fetchApi';
import { toast } from 'react-toastify';

const Division = () => {
    const [data, setData] = useState([])
    const [editId, setEditId] = useState(null)
    const [fetchMore, setFetchMore] = useState(true)
    const name = useRef()
    const status = useRef()

    useEffect(() => {
        fetchDivisions()
        setFetchMore(false)
    }, [fetchMore])

    const fetchDivisions = async () => {
        getDivisions().then((res) => {
            setData(res.payload.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
        }).catch((error) => {
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const reqData = {
            name: name.current.value,
            statusActive: status.current.value,
        }

        addDivision(reqData).then((res) => {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
            setFetchMore(true)
            name.current.value = null
            status.current.value = ""
        }).catch((err) => {
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }
    
    const handleToggle = async (uuid) => {
        toggleDivision(uuid).then((res) => {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
            setFetchMore(true)
        }).catch((err) => {
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    const handleEdit = (id) => {
        setEditId(data.find((item) => item.id === id))
    }

    const columns = [
        { 
            field: 'name', 
            headerName: 'Name',
            width: 200 
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="font-ssp">
                        {params.row.statusActive === "active"
                            ? <span className="px-2 py-1 bg-green-400 rounded-full text-white">{params.row.statusActive}</span>
                            : <span className="px-2 py-1 bg-red-400 rounded-full text-white">{params.row.statusActive}</span>
                        }
                    </div>
                )
            } 
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <div className='flex flex-row gap-3 items-center w-full'>
                        <CreateIcon fontSize='medium' className="text-slate-400 hover:text-slate-500 cursor-pointer" onClick={() => handleEdit(params.row.id)} />
                        {params.row.statusActive === "active" 
                            ? <ToggleOnIcon className="text-green-400 hover:text-green-500 cursor-pointer" onClick={() => handleToggle(params.row.uuid)} />
                            : <ToggleOffIcon className="text-red-400 hover:text-red-500 cursor-pointer" onClick={() => handleToggle(params.row.uuid)} />
                        }
                    </div>
                )
            }
        },
    ]

    return (
        <>
            {editId && 
                <ModalEditDivision setEditId={setEditId} dataId={editId} setFetchMore={setFetchMore} />
            }
            <div className='min-h-[calc(100vh-4rem)] flex flex-col'>
                {/* header  */}
                <div className="flex flex-row justify-between my-5 mb-5 mx-7 md:mx-5">
                    <h1 className='font-ssp font-bold text-4xl md:text-3xl'>Division</h1>
                </div>
                {/* content  */}
                <div className="flex flex-wrap gap-10 my-5 mb-5 mx-7 md:mx-5">
                    <div className="flex bg-white drop-shadow-lg p-2 w-full lg:w-[60%] rounded-md">
                        <DataGrid
                            autoHeight {...data}
                            rows={data}
                            columns={columns}
                            getRowId={(row) => row.id}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            disableSelectionOnClick
                            components={{ Toolbar: GridToolbar, }}
                        />
                    </div>
                    {/* form new division */}
                    <div className="flex flex-col bg-white drop-shadow-lg p-2 w-full lg:w-[35%] rounded-md">
                        <h3 className='font-bold font-ssp text-2xl ml-5 mt-2'>Add New Division</h3>
                        <form onSubmit={handleSubmit} className='flex flex-col px-5 w-full mt-5 gap-5'>
                            <div className="relative z-0 mb-6 w-full group mt-3">
                                <input ref={name} type="text" name="fullname" id="fullname" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required minLength={3} />
                                <label htmlFor="fullname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fullname</label>
                            </div>
                            <div className="relative z-0 mb-6 w-full group">
                                <select  ref={status} required id="underline_select" className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    <option value="">Choose a status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                <label htmlFor="underline_select" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Status</label>
                            </div>
                            <div className="relative z-0 mb-6 w-full flex gap-5 justify-end">
                                <button type="submit" className="mt-5 text-white bg-blue-400 hover:bg-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Division