import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import { getEmployees, toggleEmployee } from '../../utilities/fetchApi';
import ModalAddEmployee from './modalAdd';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { toast } from 'react-toastify';

const Employee = () => {
    const [data, setData] = useState([])
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [fetchMore, setFetchMore] = useState(true)

    useEffect(() => {
        fetchEmployees()
        setFetchMore(false)
    }, [fetchMore])

    const fetchEmployees = async () => {
        getEmployees().then((res) => {
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
        toggleEmployee(uuid).then((res) => {
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
            field: 'fullname', 
            headerName: 'Employee', 
            width: 200, 
            renderCell: (params) => {
                return (
                    <div className='flex justify-center items-center gap-2 font-ssp'>
                        <img className=' w-8 h-8 rounded-full object-cover' src={process.env.REACT_APP_PUBLIC_FOLDER+"/employee/noAvatar.png"} alt="Profile Pictures" />
                        {params.row.fullname}
                    </div>
                )
            } 
        },
        { 
            field: 'division', 
            headerName: 'Division', 
            width: 200, 
            renderCell: (params) => {
                return (
                    <div className="font-ssp">
                        {params.row.Division.name}
                    </div>
                    
                )
            } 
        },
        {
            field: 'username',
            headerName: 'Username',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="font-ssp">
                        {params.row.username}
                    </div>
                    
                )
            } 
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
                        <Link to={"/employee/" + params.row.uuid}>
                            <CreateIcon fontSize='medium' className="text-slate-400 hover:text-slate-500 cursor-pointer" />
                        </Link>
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
            {showModalAdd && 
                <ModalAddEmployee setShowModalAdd={setShowModalAdd} setFetchMore={setFetchMore} />
            }
            <div className='min-h-[calc(100vh-4rem)] flex flex-col'>
                {/* header  */}
                <div className="flex flex-row justify-between my-5 mb-5 mx-7 md:mx-5">
                    <h1 className='font-ssp font-bold text-4xl md:text-3xl'>Employee</h1>
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

export default Employee