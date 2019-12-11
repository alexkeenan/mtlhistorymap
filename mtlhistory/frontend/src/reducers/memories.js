import reducers from 'react-redux'
import {
    GET_MEMORIES, ADD_MEMORY, DELETE_MEMORY, GET_MEMORY_SUBJECT_CATEGORY
} from "../actions/types";

const initialState = {
    memories: [],
    categories: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MEMORIES:
            return {
                ...state,
                memories: action.payload
            }
        case GET_MEMORY_SUBJECT_CATEGORY:

            return {
                ...state,
                categories: action.payload
            }

        case DELETE_MEMORY:
            return {
                ...state,
                memories: state.memories.filter(memory => memory.id !== action.payload)
            };
        case ADD_MEMORY:
            return {
                ...state,
                memories: [...state.memories, action.payload]
            };

        default:
            return state

    }
}