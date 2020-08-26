import React from 'react';

function StudentInfo(props) {
  let studentInfo = JSON.parse(props.info);
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-CA');
  };
  return (
    props.info &&
    studentInfo && (
      <div style={{ padding: 20 }} className="student-info">
        <p align="left">
          Full Name: {studentInfo.firstName} <br></br>Student Number:{' '}
          {studentInfo.studentNumber} <br></br> Email: {studentInfo.email}{' '}
          <br></br>
          Registration Date: {formatDate(studentInfo.registrationDate)}
        </p>
      </div>
    )
  );
}

export default StudentInfo;
