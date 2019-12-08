import React, { Component } from 'react'
import './../../styles/login.css'


export class Login extends Component {
    render() {
        return (
            <div>
                <div class="form-container sign-in-container">
		            <form action="#">
			            <input type="email" placeholder="Email" />
			            <input type="password" placeholder="Password" />
			            <button>Sign In</button>
		            </form>
	            </div>
            </div>
        )
    }
}

export default Login