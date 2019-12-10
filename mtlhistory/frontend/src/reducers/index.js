import auth from './auth'
import memories from './memories'
import { combineReducers } from 'redux'
import streetview from './streetview'
import dashboard from './dashboard'
import messages from './messages'
import errors from './errors'

export default combineReducers({
    auth,
    memories,
    streetview,
    dashboard,
    messages,
    errors

})