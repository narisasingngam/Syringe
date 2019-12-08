import React, { Component } from 'react'
import './../styles/insurancePage.css'

export class InsurancePage extends Component {

    

    render() {
        return (
            <div className="container">
                <div className="insu-page">
                    <div className="user-input">
                        Patient detail
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
