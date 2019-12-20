import React, { Component } from 'react'
import './../styles/insurancePage.css'
import axios from 'axios';
import PatientInsurance from './PatientInsurance'
import TableResult from './TableResult'
import { Link } from 'react-router-dom';
import Navbar from './Navbar'
import cookie from 'react-cookies'
import { Redirect } from 'react-router-dom'

export class InsurancePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            patientDetail: [{
                name: "",
                date_of_birth: "",
            }],
            nameInput: "",
            setInput: "",
            setDate: "",
            userSelectedInsurance: [],
            currentInsurance: [],
            apiDisease: [],
            searchDisease: [],
            valueDiseaseInput: "",
            enabledOrder: false,
            totalCost: "",
            isDisabled: true,
            searchDisabled: true,
            paymentDetail: [{
                personal_id: "",
                user_name: "",
                user_age: "",
                Insurance_company: "",
                Insurance_program: "",
                disease: "",
                covered_expense: "",
                payment_cost: ""
            }],
            yearInput: "",
            userAge: ""
        }
        this.callApi()

        this.cookied = cookie.load('name')
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
        this.setState({ totalCost: event.target.value })
        if (event.target.value === "") {
            this.setState({ isDisabled: true })
        } else {
            this.setState({ isDisabled: false })
        }

        this.checkCost(event.target.value)
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
                this.setState({ nameInput: this.state.patientDetail[0].name })
                this.setState({ yearInput: date_split[0] })
            })
            .then(res => this.calculateAge())
    }

    calculateAge() {
        const currentYear = new Date().getFullYear()
        this.setState({ userAge: currentYear - this.state.yearInput })
    }

    inputID = (event) => {
        this.setState({ setInput: event.target.value })
    }

    removeInsurance(key) {
        this.state.userSelectedInsurance.splice(key, 1)
        this.setState({ currentInsurance: this.state.userSelectedInsurance })
        this.checkCost(this.state.totalCost)
    }

    checkCost(cost) {
        let allCoverExpense = 0;
        this.state.userSelectedInsurance.forEach(e => {
            allCoverExpense = allCoverExpense + parseInt(e.coverExpense);
        });
        console.log("1allCoverExpense" + allCoverExpense)
        console.log("1totalCost" + cost)
        if (allCoverExpense < cost) {
            this.setState({ searchDisabled: true })
        } else {
            this.setState({ searchDisabled: false })
        }
    }


    clickSave() {
        this.state.userSelectedInsurance.map((item, key) =>
            axios.post('https://insuranceapii.herokuapp.com/user/add/history',
                {
                    id: this.state.setInput,
                    name: this.state.nameInput,
                    age: this.state.userAge,
                    company: item.companyName,
                    program: item.programName,
                    disease: this.state.valueDiseaseInput,
                    covered_expense: item.coverExpense,
                    payment: this.state.totalCost
                })
                .then(res => {
                    alert('Input success')
                    console.log(key)
                })
                .catch(error => { console.log('error') })
                .then(res => window.location.reload())
        )
    }

    clickDisease(symtomp) {
        console.log("clickDisease")
        this.setState({ searchDisease: [], valueDiseaseInput: symtomp })

        axios.post('https://insuranceapii.herokuapp.com/user/details/disease', { id: this.state.patientDetail[0].personal_id, disease: symtomp })
            .then(res => {
                console.log(res.data)
                this.setState({ patientDetail: res.data })
            })
            .catch(error => { console.log('error') })
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
            <button className="select-btn" onClick={() => this.removeInsurance(key)}>-</button>
            </h5>
        )
        console.log(this.state.patientDetail)

        if (this.cookied === '' ){
            return <Redirect to='/login/user' />
        }else if(this.cookied !== 'admin'){
            return <Redirect to='/' />
        }else{
        return (
            <div>
                <Navbar value={cookie.load('name')}/>
            <div className="container">
                <div className="insu-page">
                    <div className="user-input">
                        <div className="input-pat-details">
                            <h5>Patient details</h5>
                            <input
                                className="input-id"
                                placeholder="Insert patient's ID card"
                                onChange={this.inputID}
                            />
                            <button className="submit-id" onClick={() => this.submitID()}>Enter</button>
                            <Link to="/hospitalHistory">
                                <button className="history-btn">History</button>
                            </Link>
                            <div className="show-user-details">
                                <div className="text-set">Name: {this.state.nameInput}</div>
                                <div className="text-set">Date of birth: {this.state.setDate}</div>
                                <div>
                                    <input
                                        className="input-disease"
                                        placeholder="Insert patient disease"
                                        onChange={this.handleInputDisease}
                                        value={this.state.valueDiseaseInput}
                                    />
                                    <input onChange={this.handleInputCost}
                                        className="input-disease"
                                        placeholder="Insert payment cost"
                                    />
                                </div>
                                <div className="item-disease">
                                    {items}
                                </div>
                                <div className="scroll">
                                    {userInsurance}
                                </div>
                                <button className="submit-id" onClick={() => this.searchInsurance()} disabled={this.state.searchDisabled}>Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="user-status">
                        <h5 className="insure-text">Patient Insurance</h5>
                        <PatientInsurance insuranceDetail={this.state.patientDetail}
                            selectedInsurance={v => this.setState({ userSelectedInsurance: v })}
                            currentInsurance={this.state.currentInsurance}
                            disabled={this.state.isDisabled}
                            searchDisabled={v => this.setState({ searchDisabled: v })}
                            totalCost={this.state.totalCost} />
                    </div>
                </div>
                <footer class="footer" style={this.state.enabledOrder ? {} : { display: 'none' }} >
                    <div className="icon-check">
                        <i class="far fa-check-circle fa-2x "></i>
                        {/* <i class="far fa-times-circle fa-2x "></i> */}
                    </div>
                    <h6 className="approve-text">
                        Patient Insurance approve!
                    </h6>
                    <br></br>
                    <h6>ID: {this.state.setInput}</h6>
                    <h6>Name: {this.state.nameInput}</h6>
                    <h6>Disease: {this.state.valueDiseaseInput}</h6>
                    <h6>Payment Cost: THB{this.state.totalCost}</h6>
                    <br></br>
                    <TableResult selectedInsurance={this.state.userSelectedInsurance} />
                    <button className="save-btn" onClick={() => this.clickSave()}>Save</button>
                </footer>
            </div>
            </div>
        )
        }
    }
}

export default InsurancePage
