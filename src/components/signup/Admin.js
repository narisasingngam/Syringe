import React, { Component } from 'react'
import Signup from './SignUp'
import './../../styles/login.css'
import { Link } from 'react-router-dom';

import userIcon from './../../images/icons_User.png'

export class AdminSignUp extends Component {
    render() {
        return (
            <div class="login-container bg-white shadow al-center">
                <img class="" src={userIcon}  alt="user icon"/>
                <h1 class="loginH1">Admin Login</h1>
                <span class="">or use your <Link to="/login/user">user account</Link></span>
                <form action="#">
                    <Signup/>
                    <input class="login-submit" type="submit" name="sign-in" value="Sign In"/>
                    <button class="login-signup" >Sign Up</button>
                </form>
            </div>
        )
    }
}
export default AdminSignUp