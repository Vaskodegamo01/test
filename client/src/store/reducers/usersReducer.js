import {
    LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER, REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS, FACEBOOK_LOGIN_SUCCESS
} from "../actions/usersActions";

const initialState = {
    registerError: null,
    loginError: null,
    user: null,
    token: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return {...state, registerError: null};
        case REGISTER_USER_FAILURE:
            return {...state, registerError: action.error};
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.user, token: action.token, loginError: null};
        case LOGIN_USER_FAILURE:
            return {...state, loginError: action.error};
        case LOGOUT_USER:
            return {...state, user: null};

        case FACEBOOK_LOGIN_SUCCESS:
            return {...state, user: action.data};
        default:
            return state;
    }
};

export default reducer;