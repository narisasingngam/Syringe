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
                <Link to="/admin" className="btn-company">
                {/* <i class="fas fa-search"></i> */}
                    Search Company
                </Link>
            </div>
        )
    }
}

export default Navbar
