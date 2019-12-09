import React, { Component } from 'react'
import { Card, Carousel, Button } from 'react-bootstrap'
import './../styles/patientInsurance.css'
import axios from 'axios';


export default class PatientInsurance extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        let details;
        if (this.props.insuranceDetail[0].name === "") {
            details = []
        } else {
            details = this.props.insuranceDetail.map((item, key) =>
                <Carousel.Item>
                    <Card style={{ marginTop: '35px', marginLeft: '2.9rem', width: '12rem', height: '17rem' }}>
                        <Card.Img style={{ height: '10rem', width: '' }} variant="top" src={item.picture} />
                        <Card.Body className="card-body">
                            <Card.Title><h6>{item.company}</h6></Card.Title>
                            <Card.Text>
                                {item.program_name}
                            </Card.Text>
                            <Card.Text>
                            <Button variant="primary">Select</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Carousel.Item>
            )
        }

        return (
            <div className="insure-box" >
                <Carousel indicators="false" pauseOnHover="true" interval="10000">
                    {details}
                </Carousel>
            </div>
        )
    }
}
