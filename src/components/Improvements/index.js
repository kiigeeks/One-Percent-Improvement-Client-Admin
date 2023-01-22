import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from 'react-router-dom';
import { getAllImprovement } from '../../utilities/fetchApi';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactTimeAgo from 'react-time-ago';
import { toast } from 'react-toastify';

const Improvements = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetchImprovements()
    }, [])

    const fetchImprovements = async () => {
        getAllImprovement().then((res) => {
            setData(
                res.payload.filter((improvements) => improvements.User.role === "employee").sort((p1, p2) => {
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
            field: 'employee', 
            headerName: 'Employee',
            width: 300, 
            renderCell: (params) => {
                return (
                    <div className='flex justify-center items-center gap-2 font-ssp'>
                        <img className=' w-8 h-8 rounded-full object-cover' src={process.env.REACT_APP_PUBLIC_FOLDER+"/employee/noAvatar.png"} alt="Profile Pictures" />
                        {params.row.User.fullname} - {params.row.User.Division.name}
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
            width: 150,
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
            field: 'action',
            headerName: 'Action',
            width: 100,
            renderCell: (params) => {
                return (
                    <div className='flex items-center w-full'>
                        <Link to={"/employee/" + params.row.User.uuid}>
                            <VisibilityIcon fontSize='medium' className="text-slate-400 hover:text-slate-500 cursor-pointer" />
                        </Link>
                    </div>
                )
            }
        },
        
    ]

    return (
        <div className='min-h-[calc(100vh-4rem)] flex flex-col'>
            {/* header  */}
            <div className="flex flex-row justify-between my-5 mb-5 mx-7 md:mx-5">
                <h1 className='font-ssp font-bold text-4xl md:text-3xl'>Improvement</h1>
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
    )
}

export default Improvements