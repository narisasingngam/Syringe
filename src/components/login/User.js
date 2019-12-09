import React, { Component } from 'react'
import './../../styles/login.css'
import { Link } from 'react-router-dom';

import userIcon from './../../images/icons_User.png'

export class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
      }
       

    handleLogin(event){
        event.preventDefault();
    
        let id = parseInt(this.refs.citizen_id.value)
        if(Number.isInteger(id)){

        var request = new XMLHttpRequest()
        request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE){
                if(JSON.parse(request.response).status === "success"){

                }else{
                    alert("Invalid Login")
                }
            }
        }
        request.open('POST', 'https://insuranceapii.herokuapp.com/user/login')
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        var data = {
            "id": id,
            "password": this.refs.password.value
        }

        request.send(JSON.stringify(data))

        this.props.history.push('/login/user');
        }else{
            alert("Invalid Citizen-Id")
        }

           
    }

    render() {
        return (
            <div class="login-container bg-white shadow al-center">
                <img src={userIcon}  alt="user icon"/>
                <h1 class="loginH1">Account Login</h1>
			    <span class="">or use your <Link to="/login/admin">admin account</Link></span>
                <form onSubmit={this.handleLogin}>
                <div class="form-container sign-in-container">
                    <div class="login-form al-left">

                        <label for="citiid"><b>Citizen-Id</b></label>
			            <input class="mg-buttom-default login-input" type="text" placeholder="Citizen-Id" ref="citizen_id" name="citizen_id" required/>

                        <label for="psw"><b>Password</b></label>
			            <input class="mg-buttom-default login-input"   type="password" placeholder="Password" ref="password" name="password" required/>
                        </div>
                        
	                </div>
                    <input class="login-submit" type="submit" name="sign-in" value="Sign In"/>
                    <Link to="/signup/user"><button class="login-signup" >Sign Up</button></Link>
                </form>
            </div>
        )
    }
}

export default UserLogin