import axios from '../../axios-api';
import {NotificationManager} from 'react-notifications';
import {push} from 'react-router-redux';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FACEBOOK_LOGIN_SUCCESS = 'FACEBOOK_LOGIN_SUCCESS';

const registerUserSuccess = () => {
    return {type: REGISTER_USER_SUCCESS};
};

const registerUserFailure = error => {
    return {type: REGISTER_USER_FAILURE, error};
};

export const registerUser = userData => {
    return dispatch => {
        return axios.post('/users', userData).then(
            response => {
                dispatch(registerUserSuccess());
                dispatch(push('/'));
                NotificationManager.success('Success', 'Registration successful');
            },
            error => {
                dispatch(registerUserFailure(error.response.data));
            }
        );
    };
};

const loginUserSuccess = (user, token) => {
    return {type: LOGIN_USER_SUCCESS, user, token};
};

const loginUserFailure = error => {
    return {type: LOGIN_USER_FAILURE, error};
};

export const loginUser = userData => {
    return dispatch => {
        return axios.post('/users/sessions', userData).then(
            response => {
                dispatch(loginUserSuccess(response.data.user, response.data.token));
                dispatch(push('/'));
                NotificationManager.success('Success', 'Login successful');
            },
            error => {
                const errorObj = error.response ? error.response.data : {error: 'No internet'};
                dispatch(loginUserFailure(errorObj));
            }
        )
    }
};

export const logoutUser = () => {
    return (dispatch, getState) => {
        axios.delete('/users/sessions').then(
            response => {
                dispatch({type: LOGOUT_USER});
                dispatch(push('/'));
                NotificationManager.success('Success', 'Logout successful');
            },
            error => {
                NotificationManager.error('Error', 'Could not logout');
            }
        );
    }
};


export const facebookLoginSuccess = (data) => {
    return {type: FACEBOOK_LOGIN_SUCCESS, data}
};


export const facebookLogin = (data) => {
    return dispatch => {
        return axios.post('/users/facebookLogin', data).then((response) => {
            dispatch(facebookLoginSuccess(response.data));
            dispatch(push('/'));
        }, error => {
            console.log(error.message);
        })
    }
};