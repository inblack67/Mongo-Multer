import { GET_PROJECTS, ADD_PROJECT, ERROR, UPLOAD_PHOTO } from '../types';

export default (state, action) => {
    const { payload, type } = action;
    switch (type) {
        case GET_PROJECTS:
            return {
                ...state,
                projects: payload,
                loading: false
            }
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, payload],
                loading: false
            }
        case UPLOAD_PHOTO:
            return {
                ...state,
                project: payload,
                loading: false
            }
        case ERROR:
            return {
                ...state,
                project: null,
                projects: null,
                loading: false
            }
        default:
            return state;
    }
}