const AuthReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                isError: false,
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                isError: false,
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                isError: action.payload,
            }
        case "LOGOUT_SUCCESS" :
            return {
                user: null,
                isFetching: false,
                isError: false,
            }
        case "LOGOUT_FAILURE" :
            return {
                isError: true,
            }
        case "GET_ME":
            return {
                user: action.payload,
                isFetching: false,
                isError: false,
            }
        case "GET_ME_FAILURE":
            return {
                    user: null,
                    isFetching: false,
                    isError: action.payload,
                }
        default:
            return state
    }
}

export default AuthReducer