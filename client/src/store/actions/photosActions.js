import axios from '../../axios-api';
import {push} from 'react-router-redux';

export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
export const FETCH_PHOTOS_ERROR = 'FETCH_PHOTOS_ERROR';
export const FETCH_PHOTOS_BY_ID = 'FETCH_PHOTOS_BY_ID';
export const FETCH_ONE_PHOTO = 'FETCH_ONE_PHOTO';

export const fetchPhotosSuccess = (data) => {
    return {type: FETCH_PHOTOS_SUCCESS, data};
};

export const fetchPhotosError = (error) => {
    return {type: FETCH_PHOTOS_ERROR, error};
};

export const fetchPhotos = () => {
    return dispatch => {
        return axios.get('/photos').then((response) => {
            dispatch(fetchPhotosSuccess(response.data))
        }).catch(error => {
            dispatch(fetchPhotosError(error.message));
        })
    }
};

export const fetchPhotosByIdSuccess = (data) => {
    return {type: FETCH_PHOTOS_BY_ID, data};
};

export const fetchPhotosId = (id) => {
    return (dispatch) => {
        return axios.get(`/photos/${id}`).then(response => {
            dispatch(fetchPhotosByIdSuccess(response.data))
        }).catch(error => {
            console.log(error);
        })
    }
};


export const addPhoto = (photo) => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const headers = {'Token': token};
        return axios.post('/photos/add-photo', photo, {headers}).then(() => {
            dispatch(push('/'));
        }).catch(error => console.log(error));
    }
};


export const deletePhoto = (id) => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const headers = {'Token': token};
        return axios.delete(`/photos/${id}`, {headers}).then(() => {
            dispatch(push('/'))
        })
    }
};

export const fetchOnePhotoSuccess = (data) => {
    return {type: FETCH_ONE_PHOTO, data}
};

export const fetchOnePhoto = (id) => {
    return (dispatch) => {
        return axios.get(`/photos/onePhoto/${id}`).then(response => {
            dispatch(fetchOnePhotoSuccess(response.data))
        })
    }
};