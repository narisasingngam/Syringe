import React, { Component } from 'react'
import { Card, Carousel } from 'react-bootstrap'
import './../styles/patientInsurance.css'
import axios from 'axios';


export default class PatientInsurance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            insuranceDetail: []
        }
    }

    callAPI() {
        axios.get('https://insuranceapii.herokuapp.com/user/logo')
            .then(res => {
                    this.setState({ insuranceDetail: res.data })
                })
    }

    render() {
        this.callAPI()
        const details = this.state.insuranceDetail.map((item, key) =>
            <Carousel.Item>
                <Card style={{ marginTop: '40px', marginLeft: '0.9rem', width: '12rem', height: '17rem' }}>
                    <Card.Img style={{ height: '10rem', width: '' }} variant="top" src={item.picture} />
                    <Card.Body className="card-body">
                        <Card.Title><h5>{item.company}</h5></Card.Title>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Carousel.Item>
        )

        return (

            <div className="insure-box" >
                <Carousel indicators="false" pauseOnHover="true" interval="10000">
                    {details}
                </Carousel>
            </div>
        )
    }
}
