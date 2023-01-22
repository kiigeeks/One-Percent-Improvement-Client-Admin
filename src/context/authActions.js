export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
})

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
})

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error
})

export const LogoutSuccess = () => ({
    type: "LOGOUT_SUCCESS",
})

export const LogoutFailure = () => ({
    type: "LOGOUT_FAILURE",
})

export const getMeSuccess = (user) => ({
    type: "GET_ME",
    payload: user,
})

export const getMeFailure = (error) => ({
    type: "GET_ME_FAILURE",
    payload: error
})