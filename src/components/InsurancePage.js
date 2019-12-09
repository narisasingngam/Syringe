import React, { Component } from 'react'
import './../styles/insurancePage.css'
import PatientInsurance from './PatientInsurance'

export class InsurancePage extends Component {
    render() {
        return (
            <div className="container">
                <div className="insu-page">
                    <div className="user-input">
                        <div className="input-pat-details">
                            <h4>Patient Detail</h4>
                            <div className="">
                                <input className="input-id"></input>
                            </div>
                        </div>
                    </div>
                    <div className="user-status">
                        <h4 className="insure-text">Patient Insurance</h4>
                        <PatientInsurance/>
                </div>
                </div>
            </div>
        )
    }
}

export default InsurancePage
