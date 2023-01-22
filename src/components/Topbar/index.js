import React, { useState, useRef, useEffect, useContext } from 'react'
import { HiMenu } from "react-icons/hi";
import { RiUserSettingsFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { logoutUser } from '../../utilities/fetchApi';

const Topbar = ({ handleSidebar }) => {
    const [showActionProfile, setShowActionProfile] = useState(false)
    const clickRef = useRef(null)
    const { dispatch } = useContext(AuthContext)
    const activeButton = 'font-ssp text-base font-semibold cursor-pointer px-2.5 py-1.5 rounded-lg bg-gray-200'
    const inActiveButton = 'font-ssp text-base font-medium hover:font-semibold cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-gray-200'

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (clickRef.current && !clickRef.current.contains(event.target)) {
                setShowActionProfile(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [clickRef])

    const handleLogout = () => {
        setShowActionProfile(false)
        logoutUser(dispatch)
    }

    return (
        <div className="sticky z-10 drop-shadow-md flex flex-row items-center justify-between md:justify-end w-full px-3 bg-white h-14 text-darkPrimary">
            <div className="flex md:hidden">
                <HiMenu fontSize={25} className='cursor-pointer' onClick={handleSidebar} />
            </div>
            <div className="flex right-0 items-end md:items-end">
                <RiUserSettingsFill fontSize={20} className='cursor-pointer' onClick={() => setShowActionProfile(!showActionProfile)} />
                {showActionProfile && 
                    <>
                        <div ref={clickRef} className="absolute z-50 top-10 right-7 w-32 md:w-40 rounded-md bg-gray-100 drop-shadow-lg shadow-gray-300 px-3 py-2 flex flex-col gap-1">
                            <NavLink 
                                to={"/profile"} 
                                className={({ isActive }) => isActive ? activeButton : inActiveButton}
                                onClick={() => setShowActionProfile(false)}
                            >
                                Profile
                            </NavLink>
                            <span onClick={handleLogout} className='font-ssp text-base font-medium hover:font-semibold cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-gray-200'>Logout</span>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Topbar