import React, { Component } from 'react'
import { Card, Carousel, Button } from 'react-bootstrap'
import './../styles/patientInsurance.css'


export default class PatientInsurance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            disabled: false,
            insuranceArray: [],
            companyName: "",
            programName: "",
            selectedButton: ""
        }
    }

    disabledButton(event) {
        if (this.state.selectedButton === "") {
            this.setState({ selectedButton: event.target.id })
        } else if (event.target.id !== this.state.selectedButton) {
            let id = this.state.selectedButton
            this.refs[id].disabled = false
            this.setState({ selectedButton: event.target.id })
        }
        event.target.disabled = true;
    }

    saveDetail(company, program, event) {
        this.state.insuranceArray.push({
            companyName: company,
            programName: program
        })
        console.log(this.state.insuranceArray)
        this.props.selectedInsurance(this.state.insuranceArray)
        this.disabledButton(event)
    }

    render() {
        const details = this.props.insuranceDetail.map((item, key) =>
            <Carousel.Item>
                <Card style={{ marginTop: '35px', marginLeft: '2.4rem', width: '12rem', height: '18rem' }}>
                    <Card.Img style={{ height: '10rem', width: '' }} variant="top" src={item.picture} />
                    <Card.Body className="card-body">
                        <Card.Title><h6 className="company-name">{item.company}</h6></Card.Title>
                        <Card.Text>
                            <h6 className="program-name">{item.program_name}</h6>
                            <button className="select-btn" ref={(key + 1)} onClick={e => this.saveDetail(item.company, item.program_name, e)} disabled={false}>Select</button>
                        </Card.Text>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Carousel.Item>
        )

        let carousel;
        if (this.props.insuranceDetail[0].name === "") {
            carousel = []
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
