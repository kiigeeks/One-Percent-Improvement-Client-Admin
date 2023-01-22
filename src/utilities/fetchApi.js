import axios from 'axios'

export const loginUser = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START"})
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, userCredentials);
        if (response.data.payload.role !== "admin") {
            dispatch({ type: "LOGIN_FAILURE", payload: {message: "Access Denied"}})
        } else {
            dispatch({ type: "LOGIN_SUCCESS", payload: response.data.payload });
        } 
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error.response.data})
    }
}

export const getMe = async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/me`);
        dispatch({ type: "GET_ME", payload: response.data.payload });
    } catch (error) {
        dispatch({ type: "GET_ME_FAILURE", payload: error.response.data})
    }
}

export const logoutUser = async (dispatch) => {
    try {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/auth/logout`);
        dispatch({ type: "LOGOUT_SUCCESS" });
    } catch (error) {
        if(error.response.data){
            dispatch({ type: "LOGOUT_FAILURE", payload: error.message})
        }else{
            dispatch({ type: "LOGOUT_FAILURE", payload: error.response.data.message})
        }
    }
} 

export const getEmployees = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/employees`)
    return data;
}

export const getEmployee = async (paramsUUID) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/employee/${paramsUUID}`)
    return data;
}

export const addEmployee = async (reqData) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/employee`, reqData)
    return data;
}

export const updateEmployee = async (paramsUUID, reqData) => {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/user/employee/${paramsUUID}`, reqData)
    return data;
}

export const toggleEmployee = async (paramsUUID) => {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/user/${paramsUUID}/status`)
    return data;
}

export const getDivisions = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/division/`)
    return data;
}

export const addDivision = async (reqData) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/division/`, reqData)
    return data;
}

export const toggleDivision = async (paramsUUID) => {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/division/${paramsUUID}/active`)
    return data;
}

export const updateDivision = async (paramsUUID, reqData) => {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/division/${paramsUUID}`, reqData)
    return data;
}

export const getPercentage = async (timeline, paramsUUID) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/improvement/percentage/${timeline}/${paramsUUID}`)
    return data;
}

export const getListImprovement = async (paramsUUID) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/improvement/me/${paramsUUID}`)
    return data;
}

export const getAllImprovement = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/improvement`)
    return data;
}

export const getAllMotivations = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/motivation`)
    return data;
}

export const addMotivation = async (reqData) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/motivation/`, reqData)
    return data;
}

export const toggleMotivation = async (paramsUUID) => {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/motivation/${paramsUUID}/status`)
    return data;
}

export const updateMotivation = async (paramsUUID, reqData) => {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/motivation/${paramsUUID}`, reqData)
    return data;
}

export const getBestImprovements = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/improvement/best`)
    return data;
}

export const getBroadcasts = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/broadcast`)
    return data;
}

export const getBroadcast = async (paramsUUID) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/broadcast/${paramsUUID}`)
    return data;
}

export const toggleBroadcast = async (paramsUUID) => {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/broadcast/${paramsUUID}/status`)
    return data;
}

export const deleteBroadcast = async (paramsUUID) => {
    const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/broadcast/${paramsUUID}`)
    return data;
}

export const updateBroadcast = async (paramsUUID, reqData) => {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/broadcast/${paramsUUID}`, reqData, {
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
    return data;
}

export const addBroadcast = async (reqData) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/broadcast`, reqData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
    return data;
}

export const getChart = async (timeline) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/improvement/chart/${timeline}`)
    return data;
}

export const updateProfile = async (paramsUUID, reqData) => {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/user/profile/${paramsUUID}`, reqData)
    return data;
}