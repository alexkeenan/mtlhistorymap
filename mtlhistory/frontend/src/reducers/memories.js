import reducers from 'react-redux'
import {
    GET_MEMORIES,
} from "../actions/types";

const initialState = {
    memories: []
}

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_MEMORIES:
            return {
                ...state,
                memories: action.payload
            }
        default:
            return state

    }
}