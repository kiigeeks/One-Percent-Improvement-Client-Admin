import React from 'react';
import { Broadcast, Dashboard, DetailBroadcast, DetailEmployee, Division, Employee, Improvements, Motivation, Profile, Topbar } from '../components';
import { Routes, Route } from 'react-router-dom';
import Error404 from '../pages/Error/404';
import Error500 from '../pages/Error/500';

const ContainerPanel = ({ handleSidebar }) => {
    return (
        <div>
            <Topbar handleSidebar={handleSidebar} />
            <div className="h-full">
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/division' element={<Division />} />
                    <Route path='/employee' element={<Employee />} />
                    <Route path='/employee/:uuid' element={<DetailEmployee />} />
                    <Route path='/improvement' element={<Improvements />} />
                    <Route path='/motivation' element={<Motivation />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/broadcast' element={<Broadcast />} />
                    <Route path='/broadcast/:uuid' element={<DetailBroadcast />} />
                    <Route path='/*' element={<Error404 />} />
                    <Route path='/500' element={<Error500 />} />
                </Routes>
            </div>
        </div>
    )
}

export default ContainerPanel