import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/authContext';
import { loginUser } from '../../utilities/fetchApi';
import { toast } from 'react-toastify';

const Login = () => {
    const username = useRef()
    const password = useRef()
    const { isFetching, isError, dispatch } = useContext(AuthContext)

    useEffect(() => {
        if(isError) {
            toast.error(isError.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        }
    }, [isError])

    const handleLogin = (e) => {
        e.preventDefault()
        loginUser({ username: username.current.value, password: password.current.value}, dispatch)
    }

    return (
        <div className='flex justify-center items-center w-full h-screen bg-grayPrimary transition duration-75 ease-out'>
            <div className="flex flex-col bg-white h-fit w-11/12 md:w-1/2 lg:w-1/4 drop-shadow-lg rounded-lg px-5 py-7 gap-14">
                <span className="flex self-center font-ssp font-bold text-4xl text-darkSecond">Login Admin</span>
                <form onSubmit={handleLogin} className='flex flex-col px-5 w-full'>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="text" ref={username} minLength={3} name="username" id="username" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="password" ref={password} minLength={6} name="floating_password" id="floating_password" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full flex gap-5 justify-center">
                        <button 
                            type="submit" 
                            disabled={isFetching}
                            className="mt-5 text-white bg-blue-400 hover:bg-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            {isFetching 
                                ? 
                                    <svg className="inline w-6 h-6 text-gray-300 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                : "Login"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login