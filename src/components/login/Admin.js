import React, { Component } from 'react'
import Login from './Login'
import './../../styles/login.css'
import { Link } from 'react-router-dom';

import userIcon from './../../images/icons_User.png'

export class AdminLogin extends Component {
    render() {
        return (
            <div class="login-container bg-white shadow al-center">
                <img class="" src={userIcon}  alt="user icon"/>
                <h1 class="loginH1">Admin Login</h1>
                <span class="">or use your <Link to="/login/user">user account</Link></span>
                <form action="#">
                    <Login/>
                </form>
            </div>
        )
    }
}
export default AdminLogin