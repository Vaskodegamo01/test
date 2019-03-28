import {FETCH_PHOTOS_SUCCESS, FETCH_PHOTOS_ERROR, FETCH_PHOTOS_BY_ID, FETCH_ONE_PHOTO} from '../actions/photosActions';

const initialState = {
    photos: [],
    authorPhotos: [],
    FullRes: {},
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PHOTOS_SUCCESS:
            return {...state, photos: action.data};

        case FETCH_PHOTOS_ERROR:
            return {...state, error: action.error};

        case FETCH_PHOTOS_BY_ID:
            return {...state, authorPhotos: action.data};

        case FETCH_ONE_PHOTO:
            return {...state, FullRes: action.data};

        default:
            return state;
    }
};

export default reducer;