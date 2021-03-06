import React, { Component } from 'react'
import './../../styles/login.css'
import { Link } from 'react-router-dom';
import Navbar from './../Navbar'
import userIcon from './../../images/icons_Add_User.png'
import cookie from 'react-cookies'

export class UserSignUp extends Component {
    constructor(props) {
        super(props);
        cookie.save('name', "", { path: '/' })
        this.handleSignUp = this.handleSignUp.bind(this);
      }

    handleSignUp(event){
        event.preventDefault();
    
        let id = parseInt(this.refs.citizen_id.value)
        if(Number.isInteger(id)){

        var request = new XMLHttpRequest()
        var userSignUp = this
        request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE){
                alert("User sign up success")
                userSignUp.props.history.push('/login/user');
            }
        }
        request.open('POST', 'https://insuranceapii.herokuapp.com/user/newuser')
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        var data = {
            "id": id,
            "name":  this.refs.name.value,
            "password": this.refs.password.value,
            "birthdate": this.refs.date.value
        }

        request.send(JSON.stringify(data))
        
        }else{
            alert("Invalid Sign Up")
        }

           
    }
    render() {
        return (
            <div><Navbar value="login"/>
            <div class="login-container bg-white shadow al-center">
                <img src={userIcon}  alt="user icon"/>
                <h1 class="loginH1">Account Sign Up</h1>
                <br/>
                <form onSubmit={this.handleSignUp}>
                    <div class="form-container sign-in-container">
                        <div class="login-form al-left">

                            <label for="citiid"><b>Citizen Id</b></label>
			                <input class="mg-buttom-default login-input" ref='citizen_id' type="text" placeholder="Citizen Id" name="citizen_id" required/>
                        
                            <label for="uname"><b>Name</b></label>
			                <input class="mg-buttom-default login-input" ref='name' type="text" placeholder="Name" name="name" required/>

                            <label for="psw"><b>Password</b></label>
			                <input class="mg-buttom-default login-input" ref='password'  type="password" placeholder="Password" name="password" required/>
                        
                            <label for="psw"><b>Date of Birth</b></label>
			                <input class="mg-buttom-default login-input" ref='date'  type="date" name="birthdate" required/>
                        
                        </div>
	                </div>

                    <input class="login-submit" type="submit" name="sign-in" value="Confirm"/>
                    <Link to="/login/user"><button class="cancel-signup" >Cancel</button></Link>
                </form>
            </div>
            </div>
        )
    }
}

export default UserSignUp