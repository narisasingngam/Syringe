import React, { Component } from 'react'
import Login from './Login'
import './../../styles/login.css'
import { Link } from 'react-router-dom';

export class AdminLogin extends Component {
    render() {
        return (
            <div class="login-container bg-white shadow">
                <h1>Admin Login</h1>
                <span>or use your <Link to="/login/user">user account</Link></span>
            <React.Fragment>
                <Login/>
            </React.Fragment>
            </div>
        )
    }
}
export default AdminLogin