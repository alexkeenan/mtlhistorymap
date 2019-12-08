import auth from './auth'
import memories from './memories'
import { combineReducers } from 'redux'

export default combineReducers({
    auth,
    memories
})