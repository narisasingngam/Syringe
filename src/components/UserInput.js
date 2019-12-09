import React, { Component } from 'react'
import './../styles/userInput.css'
import userIcon from './../images/icons_User.png'

export class UserInput extends Component {
    render() {
        return (
            <div className="container">
                <div className="user-box">
                    <img src={userIcon} alt="user icon" className="img-user" />
                    <div className="id-text-user">
                        <div className="name-user">Name: Papermint Patty</div>
                        <div className="pass-user">ID: 1100234567811</div>
                    </div>
                    <div>
                        Please insert your insurace
                    </div>
                    <div>
                    <i class="far fa-plus-circle"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserInput
