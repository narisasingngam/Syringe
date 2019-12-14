import React, { Component } from 'react'
import axios from 'axios'
import { Accordion, Card, Button } from 'react-bootstrap'
import { Table } from 'react-bootstrap'

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
                this.setState({ payment: res.data })
            })
    }

    render() {

        const detail = this.state.payment.map((item, key) =>
            <tr>
                <td>{item.insurance_company}</td>
                <td>{item.insurance_program}</td>
                <td>{item.disease}</td>
                <td>{item.covered_expense}</td>
                <td>{item.payment_cost}</td>
                <td>{item.time.split('T')[0]}</td>
            </tr>
        )

        return (
            <div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th scope="col">Company Name</th>
                            <th scope="col">Program Name</th>
                            <th scope="col">Disease</th>
                            <th scope="col">Covered Expense</th>
                            <th scope="col">Payment Cost</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detail}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default UserPaymentHistory
