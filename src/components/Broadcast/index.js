import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from 'react-router-dom';
import { deleteBroadcast, getBroadcasts, toggleBroadcast } from '../../utilities/fetchApi';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactTimeAgo from 'react-time-ago';
import { toast } from 'react-toastify';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalAddBroadcast from './modalAdd';

const Broadcast = () => {
    const [datas, setDatas] = useState([])
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [fetchMore, setFetchMore] = useState(true)

    useEffect(() => {
        fetchBroadacasts()
        setFetchMore(false)
    }, [fetchMore])

    const fetchBroadacasts = async () => {
        getBroadcasts().then((res) => {
            setDatas(
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

    const handleDelete = (uuid) => {
        deleteBroadcast(uuid).then((res) => {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
            setFetchMore(true)
        }).catch((err) => {
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            })
        })
    }

    const handleToggle = (uuid) => {
        toggleBroadcast(uuid).then((res) => {
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
                    </div>
                )
            } 
        },
        { 
            field: 'flyer', 
            headerName: 'Flyer',
            width: 100, 
            renderCell: (params) => {
                return (
                    <div className='flex justify-center items-center font-ssp'>
                        {params.row.flyer && 
                            <img className=' w-8 h-8 object-cover' src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${params.row.flyer}`} alt={params.row.title} />
                        }        
                    </div>
                )
            } 
        },
        { 
            field: 'title', 
            headerName: 'Title',
            width: 300, 
            renderCell: (params) => {
                return (
                    <div className='flex justify-center items-center font-ssp'>
                        {params.row.title}
                    </div>
                )
            } 
        },
        { 
            field: 'desc', 
            headerName: 'Description',
            width: 300, 
            renderCell: (params) => {
                return (
                    <div className='flex justify-center items-center gap-2 font-ssp'>
                        {params.row.desc}
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
            width: 150,
            renderCell: (params) => {
                return (
                    <div className='flex flex-row gap-3 items-center w-full'>
                        <Link to={"/broadcast/" + params.row.uuid}>
                            <VisibilityIcon fontSize='medium' className="text-slate-400 hover:text-slate-500 cursor-pointer"/>
                        </Link>
                        {params.row.status === "active" 
                            ? <ToggleOnIcon className="text-green-400 hover:text-green-500 cursor-pointer" onClick={() => handleToggle(params.row.uuid)}/>
                            : <ToggleOffIcon className="text-gray-400 hover:text-gray-500 cursor-pointer" onClick={() => handleToggle(params.row.uuid)}/>
                        }
                        <DeleteIcon fontSize='medium' className="text-red-400 hover:text-red-500 cursor-pointer" onClick={() => handleDelete(params.row.uuid)} />
                    </div>
                )
            }
        },
    ]

    return (
        <>
            {showModalAdd && 
                <ModalAddBroadcast setShowModalAdd={setShowModalAdd} setFetchMore={setFetchMore} />
            }
            <div className='min-h-[calc(100vh-4rem)] flex flex-col'>
                {/* header  */}
                <div className="flex flex-row justify-between my-5 mb-5 mx-7 md:mx-5">
                    <h1 className='font-ssp font-bold text-4xl md:text-3xl'>Broadcast</h1>
                    <div onClick={() => setShowModalAdd(true)} className="mr-3 mt-1 flex bg-blue-400 hover:bg-blue-500 text-sm font-medium px-5 py-2.5 rounded-lg self-end cursor-pointer">
                        <span className='text-sm text-white font-ssp'>Add New</span>
                    </div>
                </div>
                {/* content  */}
                <div className="flex my-5 mb-5 mx-7 md:mx-5">
                    <div className="flex bg-white drop-shadow-lg p-2 w-full rounded-md">
                        <DataGrid
                            autoHeight {...datas}
                            rows={datas}
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

export default Broadcast