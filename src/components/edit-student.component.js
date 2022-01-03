import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditStudent extends Component {

  constructor(props) {
    super(props)

    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentRollno = this.onChangeStudentRollno.bind(this);
    this.onChangeStudentTelephone = this.onChangeStudentTelephone.bind(this);
    this.onChangeStudentLocation = this.onChangeStudentLocation.bind(this);
    this.onChangeStudentPayment = this.onChangeStudentPayment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      name: '',
      email: '',
      rollno: '',
      telephone: '',
      location:'',
      payment:''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/students/edit-student/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          rollno: res.data.rollno,
          telephone: res.data.telephone,
          location: res.data.location,
          payment: res.data.payment

        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeStudentName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeStudentEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeStudentRollno(e) {
    this.setState({ rollno: e.target.value })
  }

  onChangeStudentTelephone(e) {
    this.setState({ telephone: e.target.value })
  }
  onChangeStudentPayment(e) {
    this.setState({ payment: e.target.value })
  }
  onChangeStudentLocation(e) {
    this.setState({ location: e.target.value })
  }


  onSubmit(e) {
    e.preventDefault()

    const studentObject = {
      name: this.state.name,
      email: this.state.email,
      rollno: this.state.rollno,
      telephone: this.state.telephone,
      payment: this.state.payment,
      location: this.state.location
    };

    axios.put('http://localhost:4000/students/update-student/' + this.props.match.params.id, studentObject)
      .then((res) => {
        console.log(res.data)
        console.log('Student successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Student List 
    this.props.history.push('/student-list')
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeStudentName} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Telephone</Form.Label>
          <Form.Control type="number" value={this.state.telephone} onChange= {this.onChangeStudentTelephone} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Roll No</Form.Label>
          <Form.Control type="text" value={this.state.rollno} onChange={this.onChangeStudentRollno} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" value={this.state.location} onChange={this.onChangeStudentLocation}  />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Payment</Form.Label>
          <Form.Control type="number" value={this.state.payment} onChange={this.onChangeStudentPayment} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Update Employee
        </Button>
      </Form>
    </div>);
  }
}