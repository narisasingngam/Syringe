import React, { Component } from 'react'
import './../../styles/login.css'
import { Link } from 'react-router-dom';
import Navbar from './../Navbar'
import userIcon from './../../images/icons_User.png'
import cookie from 'react-cookies'

export class UserLogin extends Component {
    constructor(props) {
        super(props);

        cookie.save('name', "", { path: '/' })
        cookie.save('id', "", { path: '/' })
        this.handleLogin = this.handleLogin.bind(this);
      }
       

    handleLogin(event){
        event.preventDefault();
        
        let id = parseInt(this.refs.citizen_id.value)
        var pro = this
        if(Number.isInteger(id)){

        var request = new XMLHttpRequest()
        
        request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE){
                if(JSON.parse(request.response).status === "success"){
                    cookie.save('id', id)
                    cookie.save('name', JSON.parse(request.response).name)
                    alert("Login success")
                    setTimeout(() => {}, 1000)
                    pro.props.history.push('/');
                }else{
                    alert("Invalid Username or Password")
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

        }else{
            alert("Invalid Citizen-Id")
        }

    }

    render() {
        return (
            <div><Navbar value="login"/>
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
            </div>
        )
    }
}

export default UserLogin