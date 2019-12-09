import React, { Component } from 'react'
import Login from './Login'
import './../../styles/login.css'
import { Link } from 'react-router-dom';

import userIcon from './../../images/icons_User.png'

export class UserLogin extends Component {
    render() {
        return (
            <div class="login-container bg-white shadow al-center">
                <img src={userIcon}  alt="user icon"/>
                <h1 class="loginH1">Account Login</h1>
			    <span class="">or use your <Link to="/login/admin">admin account</Link></span>
                <form action="#">
                    <Login/>
                </form>
            </div>
        )
    }
}

export default UserLogin