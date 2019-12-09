import React, { Component } from 'react'
import './../styles/nav.css'
import logo from './../images/syringe.png'
import { Link } from 'react-router-dom';

export class Navbar extends Component {
    render() {
        return (
            <div className="nav">
                <Link to="/">
                <img className="logo" src={logo} alt="Logo" />
                </Link>
                <Link to="/admin" className="btn-admin">
                <i class="fas fa-user-cog"></i>
                    admin
                </Link>
            </div>
        )
    }
}

export default Navbar
