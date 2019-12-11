import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

//not sure why sometimes with mapStateToProps you need to do props.auth, but here there's no need for props.

const PrivateRoute = ({ component: Component, auth, ...rest }) => (

    <Route
        {...rest}
        render={props => {
            if (auth.isLoading) {
                return <h2>Loading...</h2>
            }
            else if (!auth.isAuthenticated) {
                return <Redirect t='/login' />
            }
            else {
                return <Component {...props} />
            }
        }}
    />


)

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)


