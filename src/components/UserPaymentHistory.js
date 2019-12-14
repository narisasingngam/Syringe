import React, { Component } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import './../styles/userInput.css'

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
            // .then(res => this.getDateAndTime())
    }

    // getDateAndTime(){
            // const date = item.time.split('T')
    //         const date_split = date[0].split('-')
    //         const date_user = date_split[2] + "-" + date_split[1] + "-" + date_split[0]
    // }

    render() {

        const detail = this.state.payment.map((item, key) =>
            <tr>
                {/* <th scope="row">{key + 1}</th> */}
                <td>{item.insurance_company}</td>
                <td>{item.insurance_program}</td>
                <td>{item.disease}</td>
                <td>{item.covered_expense}</td>
                <td>{item.payment_cost}</td>
                <td>{item.time.split('T')[0]}</td>
            </tr>
        )

        return (
            <div className="table-histrory">
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
