import React, { Component } from 'react'
import './../styles/insurancePage.css'
import axios from 'axios';
import PatientInsurance from './PatientInsurance'

export class InsurancePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            patientDetail: [{
                name: "",
                date_of_birth: "",
            }],
            setInput: "",
            setDate: "",
            userSelectedInsurance: []
        }
    }

    submitID() {
        axios.post('https://insuranceapii.herokuapp.com/user/details', { id: this.state.setInput })
            .then(res => {
                console.log(res.data)
                this.setState({ patientDetail: res.data })
            })
            .then(res => {
                const date = this.state.patientDetail[0].date_of_birth.split('T')
                const date_split = date[0].split('-')
                const date_user = date_split[2] + "-" + date_split[1] + "-" + date_split[0]
                this.setState({ setDate: date_user })
            })
    }

    inputID = (event) => {
        this.setState({ setInput: event.target.value })
    }

    removeInsurance(key) {
        console.log(this.state.userSelectedInsurance[key])
        const removeInsurance = this.state.userSelectedInsurance.splice(key)
        this.setState({userSelectedInsurance: removeInsurance})
        
    }

    

    render() {
        console.log(this.state.userSelectedInsurance)
        const userInsurance = this.state.userSelectedInsurance.map((item, key) =>
        <h5 className="selected-insure">{item.companyName}({item.programName})
            <button  className="select-btn" onClick={() => this.removeInsurance(key+1)}>-</button>
        </h5>
        )

        return (
            <div className="container">
                <div className="insu-page">
                    <div className="user-input">
                        <div className="input-pat-details">
                            <h5>Patient details</h5>
                            <input
                                className="input-id"
                                placeholder="type patient's ID card"
                                onChange={this.inputID}
                            />
                            <button className="submit-id" onClick={() => this.submitID()}>Enter</button>
                            <div className="show-user-details">
                                <div className="text-set">Name: {this.state.patientDetail[0].name}</div>
                                <div className="text-set">Date of birth: {this.state.setDate}</div>
                                <div>
                                    <input
                                        className="input-disease"
                                        placeholder="type patient disease"
                                    />
                                    <input
                                        className="input-disease"
                                        placeholder="type cost"
                                    />
                                </div>
                                <div className="scroll">
                                    {userInsurance}
                                </div>
                                <button className="submit-id">Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="user-status">
                        <h5 className="insure-text">Patient Insurance</h5>
                        <PatientInsurance insuranceDetail={this.state.patientDetail} selectedInsurance={v => this.setState({ userSelectedInsurance: v })} />
                    </div>
                </div>
            </div>
        )
    }
}

export default InsurancePage
