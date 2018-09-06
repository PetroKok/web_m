import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {logoutUser} from "../actions/authentication";

class NavBar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    authLinks(user) {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown"
                       role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src={user.avatar} alt={user.name} title={user.name}
                             className="rounded-circle avatar"/>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="#">Profile (comming soon)</a>
                        <div className="dropdown-divider"></div>
                        <a onClick={this.onLogout.bind(this)} className="dropdown-item" href="#">Logout</a>
                    </div>
                </li>
            </ul>
        )
    }

    guestLinks() {
        return (
            <div className="navbar-nav">
                <Link className="float-right nav-item nav-link" to="/register">Register</Link>
                <Link className="float-right nav-item nav-link" to="/login">Login</Link>
            </div>
        )
    }

    render() {
        const {isAuthenticated, user} = this.props.userAuth;
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" className="navbar-brand" href="#">App</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav mr-auto">
                        <Link className="nav-item nav-link" to="/">Home</Link>
                        <Link className="nav-item nav-link" to="/music">Music</Link>
                        <Link className="nav-item nav-link" to="/admin">Admin</Link>
                    </div>
                    {isAuthenticated ? this.authLinks(user) : this.guestLinks()}
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        userAuth: state.userAuth
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({logoutUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);