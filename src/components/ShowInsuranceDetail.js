import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import './../styles/userInput.css'

export class ShowInsuranceDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            informationdata: [],
        }
        this.callAPI()
    }

    callAPI() {
        axios.get('https://insuranceapii.herokuapp.com/health/')
            .then(res => {
                this.setState({ informationdata: res.data })
            })
    }


    render() {

        const dataTable = this.state.informationdata.map((item, key) =>
            <tr>
                <td>{key}</td>
                <td>{item.company_name}</td>
                <td>{item.program_name}</td>
                <td>{item.covered_expense}</td>
                <td>{item.category}</td>
            </tr>
        )

        return (
            <div className= "table-size">
                <Table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Company</th>
                            <th>Program</th>
                            <th>Covered expense</th>
                            <th>Category disease</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ShowInsuranceDetail
