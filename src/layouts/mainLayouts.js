import React, { useEffect, useRef, useState } from 'react';
import { Sidebar } from '../components';
import { Routes, Route } from 'react-router-dom';
import ContainerPanel from './container';

const Dashboard = () => {
    const [sidebarToggle, setSidebarToggle] = useState(false)
    const [animateSidebar, setAnimateSidebar] = useState("animate__slideInLeft")
    const scrollRef = useRef(null)

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0)
    }, [])

    const handleSidebar = () => {
        if(sidebarToggle) {
            setAnimateSidebar("animate__slideOutLeft animate__fast")
            setTimeout(() => {
                setSidebarToggle(false)
            }, 500)
        } else {
            setAnimateSidebar("animate__slideInLeft")
            setSidebarToggle(true)
        }
    }

    return (
        <div className='flex md:flex-row w-full bg-grayPrimary transition duration-75 ease-out'>
            {/* dekstop */}
            <div className="hidden md:flex flex-none w-1/6">
                <Sidebar closeToggle={setSidebarToggle}/>
            </div> 
            {/* mobile */}
            {sidebarToggle && 
                <div onClick={handleSidebar} className='fixed top-0 z-20 h-screen w-screen bg-black bg-opacity-40'>
                    <div className={`fixed flex w-3/5 bg-darkPrimary h-screen overflow-y-auto shadow-md z-10 animate__animated ${animateSidebar}`}>
                        <div className="relative w-full flex">
                            <Sidebar handleSidebar={handleSidebar}/>
                        </div>
                    </div>
                </div>
            }

            <div className="w-full pb-2 flex-1 overflow-y-scrol" ref={scrollRef}>
                <Routes>
                    <Route path='/*' element={<ContainerPanel handleSidebar={handleSidebar} />} />
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard