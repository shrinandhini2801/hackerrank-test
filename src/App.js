import React, { Component, useState } from 'react';
import StudentCourses from './components/student-courses/StudentCourses';
import StudentInfo from './components/student-info/StudentInfo';
import StudentList from './components/student-list/StudentList';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedStudent: null,
    };
  }

  render() {
    const { selectedStudent } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Student-Courses Application</p>
        </header>
        <section>
          <StudentList
            setStudent={(value) => this.setState({ selectedStudent: value })}
          />
          {selectedStudent && (
            <React.Fragment>
              <StudentInfo info={selectedStudent} />
              <StudentCourses info={selectedStudent} />
            </React.Fragment>
          )}
        </section>
      </div>
    );
  }
}
export default App;
