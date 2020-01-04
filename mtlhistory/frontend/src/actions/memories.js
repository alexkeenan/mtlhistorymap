import axios from 'axios'
import {
    GET_MEMORIES, DELETE_MEMORY, ADD_MEMORY, GET_MEMORY_SUBJECT_CATEGORY, GET_MEMORY_FORM, UPDATE_MEMORY_FORM
} from "./types";

import { createMessage, returnErrors } from "./messages"

import { TokenConfig } from './auth'


export const getMemories = () => (dispatch, getState) => {
    axios
        .get('api/memories/', TokenConfig(getState))
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
        .get('api/memorycategories/', TokenConfig(getState))
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
            photo: null,
            photoPreviewUrl: null,
            video: null,
            audio: null,
            camera_address: "",
            old_address: "",
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


//DELETE MEMORY
export const deleteMemory = id => (dispatch, getState) => {

    //memory will already be an object containing everything I need

    axios
        .delete(`api/memory/${id}`, TokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deleteMemory: "Memory Deleted!" }))
            dispatch({
                type: DELETE_MEMORY,
                payload: id
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}



///https://github.com/github/fetch/issues/505


export const addMemory = memory => (dispatch, getState) => {
    //memory will already be an object containing everything I need
    console.log("from within addMemory")
    console.log(memory)
    const token = getState().auth.token

    let formData = new FormData();

    for (var key in memory) {
        console.log(key)
        console.log(memory[key])
        formData.append(key, memory[key]);
    }

    // console log shows it as empty, no idea if it's supposed to look like that. but I'm guessing no
    console.log("formData")
    console.log(formData)


    fetch("http://localhost:8000/api/memory/", {
        method: "POST",
        headers: {
            'Authorization': `Token ${token}`
        },
        body: formData
    }).then(res => {

        dispatch({
            type: ADD_MEMORY,
            payload: res.data
        })
        dispatch(createMessage({ addMemory: "Memory Created!" }))
    })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )

}

