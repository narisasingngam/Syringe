import React, { Component } from 'react'
import './../../styles/login.css'


export class SignUp extends Component {
    render() {
        return (
            <div>
                <div class="form-container sign-in-container">
                        <div class="login-form al-left">

                        <label for="uname"><b>Username</b></label>
			            <input class="mg-top-default mg-buttom-default login-input" type="text" placeholder="Citizen Id" name="citizen-id" required/>

                        <label for="psw"><b>Password</b></label>
			            <input class="mg-top-default mg-buttom-default login-input"   type="password" placeholder="Password" name="password" required/>
                        </div>
                        
	            </div>
            </div>
        )
    }
}

export default SignUp