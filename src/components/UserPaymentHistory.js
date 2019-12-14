import React, { Component } from 'react'
import axios from 'axios'
import { Popover, OverlayTrigger, Button } from 'react-bootstrap'

export class UserPaymentHistory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            payment: [],
        }
        this.callPaymentHistory()
    }

    callPaymentHistory() {
        axios.post('https://insuranceapii.herokuapp.com/user/id/history', { id: this.props.id })
            .then(res => {
                console.log(res.data)
            })
    }

    render() {

       

        return (
            <div>
                <div>
                    Payment History
                </div>
            </div>
        )
    }
}

export default UserPaymentHistory
