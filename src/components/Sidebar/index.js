import React from 'react';
import { AiFillDashboard, AiOutlineUsergroupAdd, AiFillGolden, AiFillFund, AiOutlineTags } from "react-icons/ai";
import { HiSpeakerphone } from "react-icons/hi";
import { Link, NavLink } from 'react-router-dom';

const Sidebar = ({ handleSidebar }) => {
    const activeButton = 'flex flex-row items-center w-full gap-2 p-2 cursor-pointer font-ssp text-darkPrimary bg-grayPrimary rounded-sm font-semibold text-xl md:text-lg transition-all duration-200 ease-in-out'
    const inActiveButton = 'flex flex-row items-center w-full gap-2 p-2 cursor-pointer font-ssp text-gray-300 text-xl hover:font-semibold md:text-lg transition-all duration-200 ease-in-out'

    return (
        <div className="flex flex-initial fixed flex-col bg-darkPrimary w-full md:w-1/6 min-w-0 h-screen">
            <Link 
                to={"/"} 
                className="flex h-14 border-b border-gray-500 justify-start items-center"
                onClick={handleSidebar}
            >
                <span className="font-ssp font-light text-2xl md:text-xl lg:text-2xl text-gray-300 ml-5 md:ml-3 lg:ml-5 tracking-wider">Admin Panel</span>
            </Link>
            <div className="flex flex-col p-4 gap-2 w-full min-w-full">
                <NavLink 
                    to={"/"} 
                    className={({ isActive }) => isActive ? activeButton : inActiveButton}
                    onClick={handleSidebar}
                >
                    <AiFillDashboard className={`cursor-pointer text-xl lg:flex lg:text-2xl md:hidden ${({ isActive }) => isActive ? 'text-darkPrimary' : 'text-gray-300'} `} />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink 
                    to={"/division"} 
                    className={({ isActive }) => isActive ? activeButton : inActiveButton}
                    onClick={handleSidebar}
                >
                    <AiFillGolden className={`cursor-pointer text-xl lg:flex lg:text-2xl md:hidden ${({ isActive }) => isActive ? 'text-darkPrimary' : 'text-gray-300'} `}/>
                    <span>Division</span>
                </NavLink>
                <NavLink 
                    to={"/employee"} 
                    className={({ isActive }) => isActive ? activeButton : inActiveButton}
                    onClick={handleSidebar}
                >
                    <AiOutlineUsergroupAdd className={`cursor-pointer text-xl lg:flex lg:text-2xl md:hidden ${({ isActive }) => isActive ? 'text-darkPrimary' : 'text-gray-300'} `}/>
                    <span>Employee</span>
                </NavLink>
                <NavLink 
                    to={"/improvement"} 
                    className={({ isActive }) => isActive ? activeButton : inActiveButton}
                    onClick={handleSidebar}
                >
                    <AiFillFund className={`cursor-pointer text-xl lg:flex lg:text-2xl md:hidden ${({ isActive }) => isActive ? 'text-darkPrimary' : 'text-gray-300'} `}/>
                    <span className=' font-ssp text-lg'>One Percent</span>
                </NavLink>
                <NavLink 
                    to={"/broadcast"} 
                    className={({ isActive }) => isActive ? activeButton : inActiveButton}
                    onClick={handleSidebar}
                >
                    <HiSpeakerphone className={`cursor-pointer text-xl lg:flex lg:text-2xl md:hidden ${({ isActive }) => isActive ? 'text-darkPrimary' : 'text-gray-300'} `}/>
                    <span>Broadcast</span>
                </NavLink>
                <NavLink 
                    to={"/motivation"} 
                    className={({ isActive }) => isActive ? activeButton : inActiveButton}
                    onClick={handleSidebar}
                >
                    <AiOutlineTags className={`cursor-pointer text-xl lg:flex lg:text-2xl md:hidden ${({ isActive }) => isActive ? 'text-darkPrimary' : 'text-gray-300'} `}/>
                    <span>Motivation</span>
                </NavLink>
                
            </div>
        </div>
    )
}

export default Sidebar