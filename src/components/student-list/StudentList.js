import React, { useEffect, useState } from 'react';
import StudentService from '../../services/student.service';
/*
Use a select element to display the list of students
*/
function StudentList(props) {
  const [studentsList, setStudentsList] = useState(null);
  const studentServiceObj = new StudentService();

  const getAllStudents = async () => {
    try {
      const list = await studentServiceObj.getStudents();
      setStudentsList(list);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getAllStudents();
  }, []);

  if (!studentsList) {
    return null;
  }

  const getOptions = () => {
    return (
      studentsList &&
      studentsList.map((item) => {
        return (
          <option
            value={JSON.stringify(item)}
            key={item.studentNumber}
          >{`${item.firstName} ${item.lastName}`}</option>
        );
      })
    );
  };

  const handleChange = (e) => {
    props.setStudent(e.target.value);
  };

  return (
    <div>
      <select
        defaultValue={'DEFAULT'}
        name="student-list-select"
        onChange={(e) => handleChange(e)}
      >
        <option value="DEFAULT" disabled>
          Select Students
        </option>
        {getOptions()}
      </select>
    </div>
  );
}

export default StudentList;
