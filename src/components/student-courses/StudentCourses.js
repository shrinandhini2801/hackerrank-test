import React, { useEffect, useState } from 'react';
import StudentService from '../../services/student.service';

function StudentCourses(props) {
  let studentInfo = JSON.parse(props.info);
  const [courseList, setcourseList] = useState(null);
  const studentServiceObj = new StudentService();

  const getCourses = async () => {
    try {
      const list = await studentServiceObj.getCoursesForStudent(
        studentInfo.email
      );
      setcourseList(list);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getCourses();
  }, []);

  const getCourseList = () => {
    return (
      <ol>
        {courseList.length > 0 &&
          courseList.map((item) => {
            <p>
              {item.courseName} - {item.courseInstructor} ({item.courseCredits}{' '}
              credits)
            </p>;
          })}
      </ol>
    );
  };

  if (!courseList) return null;

  return <div className="course-info">{getCourseList()}</div>;
}

export default StudentCourses;
