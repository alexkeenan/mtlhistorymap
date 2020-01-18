import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import { logout } from '../actions/auth'
import { getMemoryForm, emptyMemories } from '../actions/memories'


class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    render() {

        const { isAuthenticated, user } = this.props.auth


        const guestLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <Link to="/register" className="nav-link" >Register
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
          </Link>
                </li>
            </ul>

        )

        const memberLink = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <span className="navbar-text mr-3">
                    <strong>{user ? "Welcome " : ""}</strong>
                    <strong className="text-light">{user ? `${user.username}` : ""}</strong>

                </span>
                <li className="nav-link">

                    <NavLink className="text-light" to="/add-memory" onClick={this.props.getMemoryForm()}>Add Memory</NavLink>

                </li>
                <li className="nav-item">
                    <button
                        onClick={this.props.logout}
                        className="nav-link btn btn-danger btn-sm text-light"
                    >
                        Logout
                        </button>
                </li>
            </ul >
        )



        return (
            < nav className="navbar navbar-expand-lg navbar-dark bg-dark" >

                <Link to="/" className="navbar-brand" onClick={this.props.emptyMemories}>Montreal Through Time</Link>

                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link" onClick={this.props.emptyMemories}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">
                                About
                            </Link>
                        </li>

                    </ul>
                    {isAuthenticated ? memberLink : guestLinks}
                </div>

            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth

})

export default connect(mapStateToProps, { logout, getMemoryForm, emptyMemories })(Header)
