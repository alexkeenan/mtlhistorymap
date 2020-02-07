import axios from 'axios'
import {
    GET_MEMORIES, DELETE_MEMORY, ADD_MEMORY, GET_MEMORY_SUBJECT_CATEGORY, GET_MEMORY_FORM, UPDATE_MEMORY_FORM, EMPTY_MEMORIES, FILTER_MEMORIES, CHECK_UNCHECK_CATEGORY
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

///CAREFUL, there's a prod version of this. Any changes you make here, make sure to adjust over there.

//empty memories is so that when you switch back to the home page after having created new memories, the map will only load AFTER you've gotten yourself the new set of memories
//what would happen is that it would load the map twice, once before the new set of memories was finished loading and another once it was. That caused issues with the map.
export const emptyMemories = () => (dispatch) => {
    dispatch({
        type: EMPTY_MEMORIES,
        payload: []
    })
}

export const filterMemories = (filters) => (dispatch) => {
    dispatch({
        type: FILTER_MEMORIES,
        payload: filters
    })
}

export const checkUncheckCategory = (category_string) => (dispatch) => {

    dispatch({
        type: CHECK_UNCHECK_CATEGORY,
        payload: category_string
    })
}

export const getCategories = () => (dispatch) => {
    console.log('getting categories')
    axios
        //.get('api/memorycategories/', TokenConfig(getState))
        .get('api/viewmemorycategories/')  //taking away the need for login, but user can only see the categories, not create
        .then(res => {
            //giving the checked attribute for each key, useful in the filter


            for (var key in res.data) {
                if (res.data.hasOwnProperty(key)) {
                    res.data[key] = { ...res.data[key], checked: true };
                }
            }


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

// export const toggleCategoryCheck = (index) => (dispatch) => {

//     dispatch({
//         type: TOGGLE_CATEGORY_CHECK,
//         payload: { index }
//     })

// }



export const getMemoryForm = () => (dispatch) => {
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
            searchBox: "",


        }
    })
}

export const updateMemoryForm = (updated_payload) => dispatch => {
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

    const token = getState().auth.token

    let formData = new FormData();

    for (var key in memory) {

        formData.append(key, memory[key]);
    }


    fetch("api/memory/", {
        method: "POST",
        headers: {
            'Authorization': `Token ${token}`
        },
        body: formData
    })
        .then(res => {

            dispatch({
                type: ADD_MEMORY
            })

            dispatch(createMessage({
                addMemory: "Memory Created!"
            }))

        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )

}

