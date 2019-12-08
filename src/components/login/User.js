import React, { Component } from 'react'
import Login from './Login'
import './../../styles/login.css'
import { Link } from 'react-router-dom';
export class UserLogin extends Component {
    render() {
        return (
            <div class="login-container bg-white shadow">
                <h1>Account Login</h1>
			    <span>or use your <Link to="/login/admin">admin account</Link></span>
            <React.Fragment>
                <Login/>
            </React.Fragment>
            </div>
        )
    }
}

export default UserLogin