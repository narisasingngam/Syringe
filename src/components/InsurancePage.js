import React, { Component } from 'react'
import './../styles/insurancePage.css'

export class InsurancePage extends Component {



    render() {
        return (
            <div className="container">
                <div className="insu-page">
                    <div className="user-input">
                        <div className="input-pat-details">
                            <h4>Patient insurance</h4>
                            <div className="">
                                <input className="input-id"></input>
                            </div>
                        </div>
                    </div>
                    <div className="user-status">
                        Patient status
                </div>
                </div>
            </div>
        )
    }
}

export default InsurancePage
