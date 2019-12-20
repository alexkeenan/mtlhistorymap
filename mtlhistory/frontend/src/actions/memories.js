import axios from 'axios'
import {
    GET_MEMORIES, DELETE_MEMORY, ADD_MEMORY, GET_MEMORY_SUBJECT_CATEGORY, GET_MEMORY_FORM, UPDATE_MEMORY_FORM
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
    console.log('getting categories')
    axios
        .get('api/memorycategories', TokenConfig(getState))
        .then(res => {
            console.log(res)
            dispatch({
                type: GET_MEMORY_SUBJECT_CATEGORY,
                payload: res.data
            })
        })
        .catch(err => {
            console.log("ERROR IN RETRIEVAL")
            console.log(err)
            console.log(err.response)
            console.log(err.response.data)
        })
}

export const getMemoryForm = () => (dispatch, getState) => {
    dispatch({
        type: GET_MEMORY_FORM,
        payload: {

            title: "",
            description: "",
            photo: "",
            photoPreviewUrl: null,
            video: "",
            audio: "",
            address: "",
            longitude: -73.5673331320225,
            latitude: 45.4982432855558,
            heading: 0,
            pitch: 0,
            zoom: 1,
            dateofmemory: "",
            owner: "",
            category: "",
            counter: 0,
            map: "",
            panorama: "",

        }
    })
}

export const updateMemoryForm = (updated_payload) => dispatch => {
    console.log("updateMemoryForm firing")
    dispatch({
        type: UPDATE_MEMORY_FORM,
        payload: updated_payload
    })
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





