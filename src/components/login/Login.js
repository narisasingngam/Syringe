import React, { Component } from 'react'
import './../../styles/login.css'


export class Login extends Component {
    render() {
        return (
            <div>
                <div class="form-container sign-in-container mg-default">
                        <div class="login-form al-left">

                        <label for="uname"><b>Username</b></label>
			            <input class="mg-top-default mg-buttom-default login-input" type="text" placeholder="Citizen Id" name="citizen-id" required/>

                        <label for="psw"><b>Password</b></label>
			            <input class="mg-top-default mg-buttom-default login-input"   type="password" placeholder="Password" name="password" required/>
                        </div>
                        <br/>
                        <input class="login-submit" type="submit" name="sign-in" value="Sign In"/>
                        <button class="login-signup" >Sign Up</button>
	            </div>
            </div>
        )
    }
}

export default Login