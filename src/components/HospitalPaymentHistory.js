import React, { Component } from 'react'
import axios from 'axios'
import {Table} from 'react-bootstrap'
import './../styles/hospitalHistory.css'

export class HospitalPaymentHistory extends Component {

    constructor(props){
        super(props)
        this.state={
            historyDetail: []
        }
        this.callAPI()
    }

    callAPI(){
        axios.get('https://insuranceapii.herokuapp.com/user/all/history')
            .then(res => {
                console.log(res.data)
                this.setState({ historyDetail: res.data })
            })
    }

    render() {

        const detail = this.state.historyDetail.map((item,key)=>
            <tr>
                <td>{item.personal_id}</td>
                <td>{item.user_name}</td>
                <td>{item.user_age}</td>
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
                <footer className="table-hosp">
                <Table responsive>
                    <thead className="table-col">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Age</th>
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
                </footer>
            </div>
        )
    }
}

export default HospitalPaymentHistory
