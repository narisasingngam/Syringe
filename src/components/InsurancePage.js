import React, { Component } from 'react'
import './../styles/insurancePage.css'
import axios from 'axios';
import PatientInsurance from './PatientInsurance'
import TableResult from './TableResult'

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
            apiDisease: [],
            searchDisease: [],
            valueDiseaseInput: "",
            enabledOrder: false,
        }

        this.callApi()

    }

    callApi() {
        axios.get('https://insuranceapii.herokuapp.com/disease')
            .then(res => {
                console.log(res.data);
                this.setState({ apiDisease: res.data })
            })
    }

    handleInputDisease = (event) => {
        this.setState({ valueDiseaseInput: event.target.value })
        const filterValues = (name) => {
            return this.state.apiDisease.filter(data => {
                return data.symtomp.toLowerCase().indexOf(name.toLowerCase()) > -1;
            });
        }

        if (event.target.value === "") {
            this.setState({ searchDisease: [], submitDiseaseValue: "" });
        } else {
            this.setState({ searchDisease: filterValues(event.target.value) });
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

    clickDisease(symtomp) {
        this.setState({ searchDisease: [], valueDiseaseInput: symtomp })

        axios.post('https://insuranceapii.herokuapp.com/user/details/disease',{id: this.state.patientDetail[0].personal_id, disease: symtomp })
            .then(res => {
                console.log(res.data)
                this.setState({ patientDetail: res.data })
            })
            .catch(error => {console.log('error')})

        console.log(symtomp)

    }

    searchInsurance() {
        this.setState({ enabledOrder: true })
    }

    render() {
        const items = this.state.searchDisease.map((item, key) =>
            <button className="disease-btn" key={item.id} onClick={() => this.clickDisease(item.symtomp)}>{item.symtomp}</button>
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
                                        onChange={this.handleInputDisease}
                                        value={this.state.valueDiseaseInput}
                                    />
                                    <input
                                        className="input-disease"
                                        placeholder="type cost"
                                    />
                                </div>
                                <div className="item-disease">
                                    {items}
                                </div>
                                <button className="submit-id" onClick={() => this.searchInsurance()} >Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="user-status">
                        <h4 className="insure-text">Patient Insurance</h4>
                        <PatientInsurance insuranceDetail={this.state.patientDetail} />
                    </div>
                </div>
                <footer class="footer" style={this.state.enabledOrder ? {} : { display: 'none' }} >
                    <div className="icon-check">
                        <i class="far fa-check-circle fa-2x "></i>
                        <i class="far fa-times-circle fa-2x "></i>
                    </div>

                    <h6>
                        Patient Insurance approve!
                    </h6>
                    <TableResult />
                </footer>
            </div>
        )
    }
}

export default InsurancePage
