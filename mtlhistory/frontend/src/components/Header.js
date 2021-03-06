import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import { logout } from '../actions/auth'
import { getMemoryForm } from '../actions/memories'


class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    render() {

        const { isAuthenticated, user } = this.props.auth


        const guestLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-link">

                    <NavLink className="text-light biggerNavLink" to="/login" onClick={this.props.getMemoryForm}>Add Memory</NavLink>

                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link biggerNavLink" >Register
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link biggerNavLink">
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

                    <NavLink className="text-light biggerNavLink" to="/add-memory" onClick={this.props.getMemoryForm}>Add Memory</NavLink>

                </li>
                <li className="nav-item">
                    <button
                        onClick={this.props.logout}
                        className="nav-link btn btn-danger btn-sm text-light biggerNavLink"
                    >
                        Logout
                        </button>
                </li>
            </ul >
        )


        /*  took out the home button. Redundant with the title button

            <li className="nav-item active">
                <Link to="/" className="nav-link" onClick={this.props.emptyMemories}>Home</Link>
            </li>
        */

        return (
            < nav className="navbar navbar-expand-lg navbar-dark bg-dark-blue" >

                <Link to="/" className="navbar-brand">Map From The Past</Link>


                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav">



                        <li className="nav-item">
                            <Link to="/about" className="nav-link biggerNavLink">
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

export default connect(mapStateToProps, { logout, getMemoryForm })(Header)
