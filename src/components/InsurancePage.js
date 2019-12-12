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
            userSelectedInsurance: [],
            currentInsurance: [],
            apiDisease: [],
            searchDisease: [],
            valueDiseaseInput: "",
            enabledOrder: false,
            totalCost: "",
            isDisabled: true
        }

        this.callApi()

    }

    callApi() {
        axios.get('https://insuranceapii.herokuapp.com/disease')
            .then(res => {
                // console.log(res.data);
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

    handleInputCost = (event) => {
        if(event.target.value === ""){
            this.setState({ isDisabled: true })
        }else{
            this.setState({ totalCost: event.target.value})
            this.setState({ isDisabled: false })
        }
    }

    submitID() {
        axios.post('https://insuranceapii.herokuapp.com/user/details', { id: this.state.setInput })
            .then(res => {
                // console.log(res.data)
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
        this.state.userSelectedInsurance.splice(key,1)
        this.setState({currentInsurance: this.state.userSelectedInsurance})
    }

        
    clickDisease(symtomp) {
        console.log("clickDisease")
        this.setState({ searchDisease: [], valueDiseaseInput: symtomp })

        axios.post('http://localhost:8000/user/details/disease',{id: this.state.patientDetail[0].personal_id, disease: symtomp })
            .then(res => {
                console.log(res.data)
                this.setState({ patientDetail: res.data })
            })
            .catch(error => {console.log('error')})
        // console.log(symtomp)
    }

    searchInsurance() {
        this.setState({ enabledOrder: true })
    }

    render() {
        const items = this.state.searchDisease.map((item, key) =>
            <button className="disease-btn" key={item.id} onClick={() => this.clickDisease(item.symtomp)}>{item.symtomp}</button>
        )
        // console.log(this.state.userSelectedInsurance)
        const userInsurance = this.state.userSelectedInsurance.map((item, key) =>
        <h5 className="selected-insure">{item.companyName}({item.programName})
            <button  className="select-btn" onClick={() => this.removeInsurance(key)}>-</button>
        </h5>
        )
        console.log(this.state.patientDetail)
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
                                    <input onChange={this.handleInputCost}
                                        className="input-disease"
                                        placeholder="type cost"
                                    />
                                </div>
                                <div className="item-disease">
                                    {items}
                                </div>
                                <div className="scroll">
                                    {userInsurance}
                                </div>
                                <button className="submit-id" onClick={() => this.searchInsurance()} >Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="user-status">
                        <h5 className="insure-text">Patient Insurance</h5>
                        <PatientInsurance insuranceDetail={this.state.patientDetail} selectedInsurance={v => this.setState({ userSelectedInsurance: v })} currentInsurance={this.state.currentInsurance} disabled={this.state.isDisabled}/>
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
