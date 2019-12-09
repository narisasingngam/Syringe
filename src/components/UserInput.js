import React, { Component } from 'react'
import Navbar from './Navbar'
import cookie from 'react-cookies'

export class UserInput extends Component {

    

    render() {
        return (
            <div>
                <Navbar value={cookie.load('name')}/>
            </div>
        )
    }
}

export default UserInput
