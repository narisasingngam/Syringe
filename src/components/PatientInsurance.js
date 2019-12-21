import React, { Component } from 'react'
import { Card, Carousel, Button } from 'react-bootstrap'
import './../styles/patientInsurance.css'


export default class PatientInsurance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            insuranceArray: this.props.currentInsurance,
            companyName: "",
            programName: "",
            coverExpense: ""
        }
    }

    saveDetail(company, program, expense) {
        this.setState({ insuranceArray: this.props.currentInsurance })
        let save = true
        for (let i = 0; i < this.state.insuranceArray.length; i++) {
            if (this.state.insuranceArray[i].companyName === company && this.state.insuranceArray[i].programName === program) {
                save = false
                break;
            }
        }

        if (save) {
            this.state.insuranceArray.push({
                companyName: company,
                programName: program,
                coverExpense: expense
            })
            console.log(this.state.insuranceArray)
            this.props.selectedInsurance(this.state.insuranceArray)
            this.checkCost()
        } else {
            console.log("alert")
            alert("Sorry, you already selected this insurance.");
        }
    }

    checkCost(){
        let allCoverExpense = 0;
        this.state.insuranceArray.forEach( e => {
            console.log(e.coverExpense)
            allCoverExpense = allCoverExpense + parseInt(e.coverExpense);
        });
        console.log("2allCoverExpense"+allCoverExpense)
        console.log("2totalCost"+this.props.totalCost)
        if(allCoverExpense < this.props.totalCost){
            this.props.searchDisabled(true)
        }else{
            this.props.searchDisabled(false)
        }
    }

    render() {
        console.log(this.props.insuranceDetail)

        const details = this.props.insuranceDetail.map((item, key) =>
            <Carousel.Item>
                <Card className="card" style={{ marginTop: '35px', width: '12rem', height: '19rem' }}>
                    <Card.Img style={{ height: '10rem', width: '' }} variant="top" src={item.picture} />
                    <Card.Body className="card-body">
                        <Card.Title><h6 className="company-name">{item.company_name}</h6></Card.Title>
                        <Card.Text>
                            <h6 className="program-name">{item.program_name}</h6>
                        </Card.Text>
                        <Card.Text>
                            <h6 className="cover-expense">Covered Expense: {item.covered_expense}</h6>
                            <button className="select-btn" id={key + 1} onClick={() => this.saveDetail(item.company_name, item.program_name, item.covered_expense)} disabled={this.props.disabled}>Select</button>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Carousel.Item>
        )

        let carousel;
        if (this.props.insuranceDetail.length === 0) {
            carousel = ""
        } else {
            carousel =
                <Carousel indicators="false" pauseOnHover="true" interval="10000">
                    {details}
                </Carousel>
        }

        return (
            <div className="insure-box" >
                {carousel}
            </div>
        )
    }
}
