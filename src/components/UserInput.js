import React, { Component, Fragment } from 'react'
import Navbar from './Navbar'
import cookie from 'react-cookies'
import './../styles/userInput.css'
import userIcon from './../images/icons_User.png'
import { Button, Card } from 'react-bootstrap'
import axios from 'axios';
import ShowInsuranceDetail from './../components/ShowInsuranceDetail'
import UserHistory from './../components/UserHistory'
import UserPaymentHistory from './../components/UserPaymentHistory'
import { Redirect } from 'react-router-dom'

export class UserInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            usersInsurance: [],
            companyName: "",
            programName: "",
            companyValue: "",
            programValue: "",
            isClick: false,
            listCompany: [],
            searchCompany: [],
            listProgram: [],
            searchProgram: [],
            userDetail: {
                id : "",
                name : "",
                birth_date: new Date(),
                age: 0
            }
        }
        this.callApi()
        this.cookiedid = cookie.load("id");
        this.cookied = cookie.load("name");
        this.setUserDetail()
      this.checkInsurance = this.checkInsurance.bind(this)
        
    }
    setUserDetail(){
        let userId = this.cookiedid
        axios.get("https://insuranceapii.herokuapp.com/user/allaccount")
        .then(res => {
            res.data.forEach(element => {
                if(parseInt(userId) === element.personal_id){
                    let date = element.date_of_birth.split('T')
                    this.setState({
                        userDetail:{
                            id : element.personal_id,
                            name: element.name,
                            birth_date: date[0],
                            age: (new Date()).getFullYear() - (new Date(element.date_of_birth)).getFullYear()
                        }
                    })
                }
            });

        });

    }

    callApi() {
        axios.get('https://insuranceapii.herokuapp.com/company')
            .then(res => {
                this.setState({ listCompany: res.data })
            })
    }

    clickAdd() {
        if (this.state.companyName === "" || this.state.programName === "") {
            alert('Please insert your insurance details')
            return;
        }
        if (this.checkInsurance(this.state.companyName, this.state.programName)) {
            alert('This insurance already exist')
            console.log('kaomai')
            return;
        }

        this.setState({
            usersInsurance: [...this.state.usersInsurance, {
                programName: this.state.programName,
                companyName: this.state.companyName
            }], companyValue: "", programValue: "", companyName: "",
            programName: "", searchCompany: [], searchProgram: []
        })


    }

    checkInsurance(companyName, programName) {
        for (let i = 0; i < this.state.usersInsurance.length; i++) {
            console.log(this.state.usersInsurance[i].company_name)
            if (companyName === this.state.usersInsurance[i].companyName) {
                if (programName === this.state.usersInsurance[i].programName) {
                    return true;
                }
            }
        }
    }

    setCompany = (event) => {
        const filterValues = (name) => {
            return this.state.listCompany.filter(data => {
                return data.company_name.toLowerCase().indexOf(name.toLowerCase()) > -1;
            });
        }
        this.setState({ companyName: event.target.value, companyValue: event.target.value, searchCompany: filterValues(event.target.value) })

        if (event.target.value === "") {
            this.setState({ companyName: event.target.value, companyValue: event.target.value, searchCompany: [] })
        } else {
            this.setState({ programName: "", programValue: "", searchProgram: [] })
        }
    }

    setProgram = (event) => {
        // console.log(this.state.listProgram)
        if (this.state.companyValue === "") {
            alert("Please insert your insurance company first")
            return;
        }
        const filterValues = (name) => {
            return this.state.listProgram.filter(data => {
                return data.program_name.toLowerCase().indexOf(name.toLowerCase()) > -1;
            });
        }

        this.setState({ programName: event.target.value, programValue: event.target.value, searchProgram: filterValues(event.target.value) })

        if (event.target.value === "") {
            this.setState({ programName: event.target.value, programValue: event.target.value, searchProgram: [] })
        }
    }

    deleteInsurance(key) {
        const newdata = this.state.usersInsurance.slice(0, key).concat(this.state.usersInsurance.slice(key + 1, this.state.usersInsurance.length))
        this.setState({ usersInsurance: newdata })
    }

    clickCompany(company_name) {
        this.setState({ companyName: company_name, companyValue: company_name, searchCompany: [] })
        axios.post('https://insuranceapii.herokuapp.com/company/search', { company: company_name })
            .then(res => {
                this.setState({ listProgram: res.data })
                console.log(res.data)
            })
    }

    clickSave() {
        if (this.state.usersInsurance.length <= 0) {
            alert('Please insert your insurance')
            return;
        }
        this.state.usersInsurance.map((item, key) =>
            axios.post('https://insuranceapii.herokuapp.com/user/addinsurance', { id: this.state.userDetail.id, name: this.state.userDetail.name, birthdate: this.state.userDetail.birth_date, program: item.programName, company: item.companyName })
                .then(res => {
                    alert('Input success')
                    console.log(key)
                })
                .catch(error => { console.log('error') })
        )
    }

    clickProgram(program_name) {
        this.setState({ programName: program_name, programValue: program_name, searchProgram: [] })
    }

    render() {

        const insuranceItem = this.state.usersInsurance.map((item, key) =>
            <div className="list-insu">
                <Card body>
                    <i class="fas fa-minus-circle" onClick={() => this.deleteInsurance(key)}></i>
                    {item.companyName} - {item.programName}
                </Card>
            </div>
        )

        const itemsCompany = this.state.searchCompany.map((item, key) =>
            <button className="company-btn" key={item.id} onClick={() => this.clickCompany(item.company_name)}>{item.company_name}</button>
        )

        const itemsProgram = this.state.searchProgram.map((item, key) =>
            <button className="company-btn" key={item.id} onClick={() => this.clickProgram(item.program_name)}> {item.program_name}</ button>
        )

        if (this.cookied === '' ){
            return <Redirect to='/login/user' />
        }else if(this.cookied === 'admin'){
            return <Redirect to='/admin' />
        }else{
        return (
          <div>
            <Navbar value={cookie.load("id")} />
            <div className="container">
              <div style={{ display: "flex" }}>
                <div className="user-box">
                  <div className="id-text-user">
                    <img src={userIcon} alt="user icon" />
                    <div className="longdo">
                      {this.state.userDetail && (
                        <Fragment>
                          <div className="text-user-profile">
                            Name: {this.state.userDetail.name}
                          </div>
                          <div className="text-user-profile">
                            ID: {this.state.userDetail.id}
                          </div>
                            <div className="text-user-profile">
                              Age: {this.state.userDetail.age} years
                            </div>
                        </Fragment>
                      )}
                    </div>
                  </div>
                  <div>Please insert your insurace</div>
                  <div>
                    <i class="fas fa-plus-circle"></i>

                    <input
                      className="input-users"
                      placeholder="insurance company"
                      onChange={this.setCompany}
                      value={this.state.companyValue}
                    />

                    <input
                      className="input-users"
                      placeholder="insurance program"
                      onChange={this.setProgram}
                      value={this.state.programValue}
                    />
                    <Button
                      variant="success"
                      size="sm"
                      className="submit-user-insu"
                      onClick={() => this.clickAdd()}
                    >
                      Submit
                    </Button>
                  </div>
                  <div className="mi">
                    <div className="company-layout">{itemsCompany}</div>
                    <div className="program-layout">{itemsProgram}</div>
                  </div>
                  <div className="scroll-list-insu">{insuranceItem}</div>
                  <div>
                    <Button
                      variant="primary"
                      size="sm"
                      className="save-insu"
                      onClick={() => this.clickSave()}
                    >
                      Save
                    </Button>
                  </div>
                </div>
                <div className="information-insurance">
                  <ShowInsuranceDetail />
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div className="user-history">
                  <UserHistory id={this.cookiedid} />
                <div className="user-approve">
                  <UserPaymentHistory id={this.cookiedid} />
                </div>
              </div>
            </div>
          </div>
        );
        }
    }
}

export default UserInput
