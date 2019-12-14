import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

export class TableResult extends Component {
    constructor(props){
        super(props)
    }

    render() {
        const detail = this.props.selectedInsurance.map((item,key)=>
            <tr>
                <th scope="row">{key+1}</th>
                <td>{item.companyName}</td>
                <td>{item.programName}</td>
                <td>{item.coverExpense}</td>
            </tr>
        )

        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Company Name</th>
                            <th scope="col">Program Name</th>
                            <th scope="col">Covered Expense</th>
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

export default TableResult
