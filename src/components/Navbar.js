import React, { Component } from 'react'
import './../styles/nav.css'
import logo from './../images/syringe.png'
import { Link } from 'react-router-dom';


export class Navbar extends Component {
    render() {
        var status = this.props.value
        if(status === "admin"){
            return (
                <div class="navs">
                    <img class="logo" src={logo} alt="Logo" />
                        <h5 class="login_button">Admin</h5>
                    
                    <div class="nav_span">
                    <Link to="/login/user">
                        <h6 class="logout_button">Logout</h6>
                    </Link>
                    </div>
                </div>
            )
        }
        else if(status === "login"){
            return (
                <div class="navs">
                    <img class="logo" src={logo} alt="Logo" />
                        <h5 class="login_button">Login</h5>
                </div>
            )
        }else{
            return(
                <div class="navs">
                    <img class="logo" src={logo} alt="Logo" />
                    <h5 class="login_button">{status}</h5>
                    <div class="nav_span">
                    <Link to="/login/user">
                        <h6 class="logout_button">Logout</h6>
                    </Link>
                    </div>
                </div>
            )
        }

    }
}

export default Navbar
