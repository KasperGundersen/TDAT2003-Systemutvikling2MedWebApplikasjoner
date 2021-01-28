// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from './components/header.js';
import jQuery from "jquery";


class Student {
  id: number;
  static nextId = 1;

  firstName: string;
  lastName: string;
  email: string;
  courses: Array<number>;

  constructor(firstName: string, lastName: string, email: string, courses: Array<number>) {
    this.id = Student.nextId++;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.courses = courses;
  }
}
let students = [
  new Student('Ola', 'Jensen', 'ola.jensen@ntnu.no', [1, 3]),
  new Student('Kari', 'Larsen', 'kari.larsen@ntnu.no', [2, 4])
];

class Menu extends Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <NavLink activeStyle={{ color: 'darkblue' }} exact to="/">
                React example
              </NavLink>
            </td>
            <td>
              <NavLink activeStyle={{ color: 'darkblue' }} to="/students">
                Students
              </NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class Home extends Component {
  render() {
    return <div>React example with static pages</div>;
  }
}

class StudentList extends Component {
  render() {
    return (
      <div className="card" style={{ width: 'auto' }}>
        <ul className="list-group list-group-flush">
          {students.map(student => (
            <li className="list-group-item" key={student.id}>
              <NavLink activeStyle={{ color: 'darkblue' }} to={'/students/' + student.id}>
                {student.firstName} {student.lastName}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}



class StudentDetails extends Component<{ match: { params: { id: number } } }> {
  render() {
    let student = students.find(student => student.id == this.props.match.params.id);
    if (!student) {
      console.error('Student not found'); // Until we have a warning/error system (next week)
      return null; // Return empty object (nothing to render)
    }
    return (
      <div className="card" style={{ width: 'auto' }}>
        <ul className="list-group list-group-flush">
          <h3 style={{ marginLeft: '20px' }}>Details</h3>
          <li className="list-group-item">First name: {student.firstName}</li>
          <li className="list-group-item">Last name: {student.lastName}</li>
          <li className="list-group-item">Email: {student.email}</li>
          <li className="list-group list-group-flush">
            <div className="card" style={{ width: 'auto' }}>
              <ul className="list-group list-group-flush">
                <h5 style={{ marginLeft: '20px' }}>Courses: </h5>{student.courses.map(courseId => (
                  <a className="list-group-item" key={courseId}>
                    <a>
                      {courses.find(course => course.id == courseId).code}{' '}
                      {courses.find(course => course.id == courseId).title}
                    </a>
                  </a>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
class Course {
  id: number;
  static nextId = 1;

  code: string;
  title: string;
  students: Array<number>;

  constructor(code: string, title: string, students: Array<number>) {
    this.id = Course.nextId++;
    this.code = code;
    this.title = title;
    this.students = students;
  }
}
let courses = [
  new Course('TDAT2001', 'Realfag for dataingeniører', [1]),
  new Course('TDAT2002', 'Matematikk 2', [2]),
  new Course('TDAT2003', 'Systemutvikling 2 med web-applikasjoner', [1]),
  new Course('TDAT2005', 'Algoritmer og datastrukturer', [2])
];
//to={'/students/' + student.id}
class CoursesList extends Component {
  render() {
    return (
      <div className="card" style={{ width: 'auto' }}>
        <div className="card-body">
          <div className="card-title">
            <h3>Courses</h3>
            <ul className="list-group list-group-flush">
              {courses.map(course => (
                <li className="list-group-item" key={course.id}>
                  <NavLink activeStyle={{ color: 'darkblue' }} to={'/courses/' + course.id} class="card-link">
                    {course.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

class CoursesDetails extends Component<{ match: { params: { id: number } } }> {
  render() {
    let course = courses.find(course => course.id == this.props.match.params.id);
    if (!course) {
      console.error('Course not found'); // Until we have a warning/error system (next week)
      return null; // Return empty object (nothing to render)
    }
    return (
      <div className="card" style={{ width: 'auto' }}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Code: {course.code}</li>
          <li className="list-group-item">Title: {course.title}</li>
          <li className="list-group-item">Students: {course.students.map(studentId => (
            <a className="list-group-item" key={studentId}>
              <a>
                {students.find(student => student.id == studentId).firstName}{' '}
                {students.find(student => student.id == studentId).lastName}
              </a>
            </a>
          ))}
          </li>
        </ul>
      </div>
    );
  }
}
const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div style={{ margin: '20px' }}>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/students" component={StudentList} />
        <Route path="/courses" component={CoursesList} />
        <Route path="/courses/:id" component={CoursesDetails} />
        <Route path="/students/:id" component={StudentDetails} />
      </div>
    </HashRouter>,
    root
  );
