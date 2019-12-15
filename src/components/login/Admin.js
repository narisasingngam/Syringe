import React, { Component } from 'react'
import './../../styles/login.css'
import { Link } from 'react-router-dom';
import userIcon from './../../images/icons_User.png'
import cookie from 'react-cookies'
import Navbar from './../Navbar'

export class AdminLogin extends Component {
    constructor(props) {
        super(props);
        cookie.save('name', "", { path: '/' })
        cookie.save('id', "", { path: '/' })
        this.handleSignUp = this.handleSignUp.bind(this);
      }

    handleSignUp(event){
        event.preventDefault();

        if(this.refs.username && this.refs.password){
            if(this.refs.username.value === "admin" && this.refs.password.value === "admin"){
                cookie.save('name', "admin", { path: '/' })
                alert("Adnmin login success")
                this.props.history.push('/admin');
            }else
                alert("Wrong Username or Password")
        }
            
    }
    render() {
        return (
            <div>
                <Navbar value="login"/>
            <div class="login-container bg-white shadow al-center">
                <img class="" src={userIcon}  alt="user icon"/>
                <h1 class="loginH1">Admin Login</h1>
                <span class="">or use your <Link to="/login/user">user account</Link></span>
                <form onSubmit={this.handleSignUp}>
                <div class="form-container sign-in-container">
                    <div class="login-form al-left">

                        <label for="citiid"><b>Username</b></label>
			            <input class="mg-buttom-default login-input" type="text" ref="username" placeholder="Admin Username" name="username" required/>

                        <label for="psw"><b>Password</b></label>
			            <input class="mg-buttom-default login-input"  ref="password" type="password" placeholder="Password" name="password" required/>
                        </div>
                        
	                </div>
                    <input class="login-submit" type="submit" name="sign-in" value="Sign In"/>
                </form>
            </div>
            </div>
        )
    }
}
export default AdminLogin