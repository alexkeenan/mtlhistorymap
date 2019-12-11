import axios from 'axios'
import {
    GET_MEMORIES,
} from "./types";
import { TokenConfig } from './auth'


export const getMemories = () => (dispatch, getState) => {
    axios
        .get('api/memories', TokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_MEMORIES,
                payload: res.data
            })
        })
        .catch(err => console.log(err.response.data))
}


export const getCategories = () => (dispatch, getState) => {
    axios
        .get('api/memory/categories', TokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_MEMORY_SUBJECT_CATEGORY,
                payload: res.data
            })
        })
        .catch(err => console.log(err.response.data))
}



export const addMemory = memory => (dispatch, getState) => {

    //memory will already be an object containing everything I need

    axios
        .post('api/memory', memory, TokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_MEMORY,
                payload: res.data
            })
        })
        .catch(err => console.log(err.response.data))
}

//DELETE MEMORY

export const deleteMemory = id => (dispatch, getState) => {

    //memory will already be an object containing everything I need

    axios
        .delete(`api/memory/${id}`, TokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_MEMORY,
                payload: id
            })
        })
        .catch(err => console.log(err.response.data))
}





