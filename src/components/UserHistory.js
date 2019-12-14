import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import axios from 'axios'
import './../styles/userInput.css'

export class UserHistory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userInsurance: []
        }
        this.callAPI()
    }

    callAPI() {
        axios.post('https://insuranceapii.herokuapp.com/user/details', { id: this.props.id })
            .then(res => {
                this.setState({ userInsurance: res.data })
            })
    }

    render() {

        const card = this.state.userInsurance.map((item, key) =>
            <Card border="info" style={{ width: 'auto', padding: '5px' }}>
                <Card.Text style={{ display: 'flex' }} >
                    <div className="detail-card">{item.company_name}</div>
                    - {item.program_name}</Card.Text>
            </Card>
        )

        return (
            <div>
                <div>Existing Insurance</div>
                <div className="scoll-card">
                {card}
                </div>
            </div>
        )
    }
}

export default UserHistory
