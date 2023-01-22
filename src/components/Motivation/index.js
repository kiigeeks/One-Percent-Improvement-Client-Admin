import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CreateIcon from '@mui/icons-material/Create';
import { getAllMotivations, toggleMotivation } from '../../utilities/fetchApi';
import ModalAddMotivation from './modalAdd';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { toast } from 'react-toastify';
import ModalEditMotivation from './modalEdit';

const Motivation = () => {
    const [data, setData] = useState([])
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [fetchMore, setFetchMore] = useState(true)
    const [editId, setEditId] = useState(null)

    useEffect(() => {
        fetchMotivations()
        setFetchMore(false)
    }, [fetchMore])

    const fetchMotivations = async () => {
        getAllMotivations().then((res) => {
            setData(res.payload.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
        }).catch((err) => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    const handleToggle = async (uuid) => {
        toggleMotivation(uuid).then((res) => {
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
    
    const handleEdit = (uuid) => {
        setEditId(data.find((item) => item.uuid === uuid))
    }

    const columns = [
        { 
            field: 'motivation', 
            headerName: 'Motivation', 
            width: 400, 
            renderCell: (params) => {
                return (
                    <div className="font-ssp">
                        {params.row.message}
                    </div>
                )
            } 
        },
        {
            field: 'author',
            headerName: 'Author',
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="font-ssp">
                        {params.row.author}
                    </div>
                )
            } 
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="font-ssp">
                        {params.row.status === "active"
                            ? <span className="px-2 py-1 bg-green-400 rounded-full text-white">{params.row.status}</span>
                            : <span className="px-2 py-1 bg-red-400 rounded-full text-white">{params.row.status}</span>
                        }
                    </div>
                )
            } 
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className='flex flex-row gap-3 items-center w-full'>
                        <CreateIcon fontSize='medium' className="text-slate-400 hover:text-slate-500 cursor-pointer" onClick={() => handleEdit(params.row.uuid)}/>
                        {params.row.status === "active" 
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
            {showModalAdd && 
                <ModalAddMotivation setShowModalAdd={setShowModalAdd} setFetchMore={setFetchMore} />
            }
            {editId && 
                <ModalEditMotivation setEditId={setEditId} dataId={editId} setFetchMore={setFetchMore} />
            }
            <div className='min-h-[calc(100vh-4rem)] flex flex-col'>
                {/* header  */}
                <div className="flex flex-row justify-between my-5 mb-5 mx-7 md:mx-5">
                    <h1 className='font-ssp font-bold text-4xl md:text-3xl'>Motivation</h1>
                    <div onClick={() => setShowModalAdd(true)} className="mr-3 mt-1 flex bg-blue-400 hover:bg-blue-500 text-sm font-medium px-5 py-2.5 rounded-lg self-end cursor-pointer">
                        <span className='text-sm text-white font-ssp'>Add New</span>
                    </div>
                </div>
                {/* content  */}
                <div className="flex my-5 mb-5 mx-7 md:mx-5">
                    <div className="flex bg-white drop-shadow-lg p-2 w-full rounded-md">
                        <DataGrid
                            autoHeight {...data}
                            rows={data}
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
        </>
    )
}

export default Motivation