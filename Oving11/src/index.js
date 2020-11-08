// @flow
/* eslint eqeqeq: "off" */

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, Card, NavBar, Button, Row, Column } from './widgets';

import { createHashHistory } from 'history';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Student {
  id: number;
  static nextId = 1;

  firstName: string;
  lastName: string;
  email: string;

  constructor(firstName: string, lastName: string, email: string) {
    this.id = Student.nextId++;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
let students = [
  new Student('Ola', 'Jensen', 'ola.jensen@ntnu.no'),
  new Student('Kari', 'Larsen', 'kari.larsen@ntnu.no')
];

class Menu extends Component {
  render() {
    return (
      <NavBar brand="React example">
        <NavBar.Link to="/students">Students</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <Card title="React example with component state">Client-server communication will be covered next week.</Card>
    );
  }
}

class StudentList extends Component {
  render() {
    return (
      <Card title="Students">
        {students.map(student => (
          <Row key={student.id}>
            <Column width={2}>
              <NavLink activeStyle={{ color: 'darkblue' }} exact to={'/students/' + student.id}>
                {student.firstName} {student.lastName}
              </NavLink>
            </Column>
            <Column>
              <NavLink activeStyle={{ color: 'darkblue' }} to={'/students/' + student.id + '/edit'}>
                edit
              </NavLink>
            </Column>
          </Row>
        ))}
      </Card>
    );
  }
}

class StudentDetails extends Component<{ match: { params: { id: number } } }> {
  render() {
    let student = students.find(student => student.id == this.props.match.params.id);
    if (!student) {
      Alert.danger('Student not found: ' + this.props.match.params.id);
      return null; // Return empty object (nothing to render)
    }
    return (
      <Card title="Details">
        <Row>
          <Column width={2}>First name</Column>
          <Column>{student.firstName}</Column>
        </Row>
        <Row>
          <Column width={2}>Last name</Column>
          <Column>{student.lastName}</Column>
        </Row>
        <Row>
          <Column width={2}>Email</Column>
          <Column>{student.email}</Column>
        </Row>
      </Card>
    );
  }
}

class StudentEdit extends Component<{ match: { params: { id: number } } }> {
  firstName = ''; // Always initialize component member variables
  lastName = '';
  email = '';

  render() {
    return (
      <Card title="Edit">
        <form>
          <Row>
            <Column width={2}>First name</Column>
            <Column>
              <input
                type="text"
                value={this.firstName}
                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.firstName = event.target.value)}
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>Last name</Column>
            <Column>
              <input
                type="text"
                value={this.lastName}
                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.lastName = event.target.value)}
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>Email</Column>
            <Column>
              <input
                type="text"
                value={this.email}
                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.email = event.target.value)}
              />
            </Column>
          </Row>
          <Button.Danger onClick={this.save}>Save</Button.Danger>
        </form>
      </Card>
    );
  }

  // Initialize component state (firstName, lastName, email) when the component has been inserted into the DOM (mounted)
  mounted() {
    let student = students.find(student => student.id == this.props.match.params.id);
    if (!student) {
      Alert.danger('Student not found: ' + this.props.match.params.id);
      return;
    }

    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.email = student.email;
  }

  save() {
    let student = students.find(student => student.id == this.props.match.params.id);
    if (!student) {
      Alert.danger('Student not found: ' + this.props.match.params.id);
      return;
    }

    student.firstName = this.firstName;
    student.lastName = this.lastName;
    student.email = this.email;

    // Go to StudentDetails after successful save
    history.push('/students/' + student.id);
  }
}

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
        <Route exact path="/" component={Home} />
        <Route path="/students" component={StudentList} />
        <Route exact path="/students/:id" component={StudentDetails} />
        <Route exact path="/students/:id/edit" component={StudentEdit} />
      </div>
    </HashRouter>,
    root
  );
