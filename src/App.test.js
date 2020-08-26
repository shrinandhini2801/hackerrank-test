import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Server from "./infrastracture/server";

let server;
let mockStudents;
let mockCourses;
let mockStudentCourses;
let mockStudentToSelect;

const mockServicesObject = {
  getStudents: () => {
    return new Promise((resolve) => {
      resolve(mockStudents);
    });
  },

  getCoursesForStudent: (studentEmail) => {
    return new Promise((resolve) => {
      resolve(mockStudentCourses[studentEmail]);
    });
  },

  getCourse: (courseId) => {
    return new Promise((resolve) => {
      resolve(mockCourses.find(course => course.id === courseId));
    });
  },

  getStudent: (email) => {
    return new Promise((resolve) => {
      resolve(mockStudents.find(student => student.email === email));
    });
  }
}

jest.mock('./services/student.service', () => {
  return function() {
    return mockServicesObject;
  }
}); 

const spyOnGetStudents = jest.spyOn(mockServicesObject, "getStudents");
const spyOnGetCoursesForStudent = jest.spyOn(mockServicesObject, "getCoursesForStudent");
const spyOnGetCourse = jest.spyOn(mockServicesObject, "getCourse");

describe("Overall application tests", () => {

  beforeEach(() => {

    server = new Server();
    mockStudents = server.getRandomStudents();
    mockCourses = server.getCourses();
    mockStudentCourses = server.getRandomStudentCourses(mockStudents, mockCourses);
    mockStudentToSelect = mockStudents[1];

    ReactDOM.render(<App />, document.body);
  });

  afterEach(() => {
    spyOnGetStudents.mockClear();
    ReactDOM.unmountComponentAtNode(document.body);
  });

  it("Should display the complete list of students with full name in the dropdown", () => {
    const options = document.body.querySelectorAll("option");
    expect(options.length).toEqual(mockStudents.length + 1);

    const studentsOptions = Array.from(options).slice(1);
    studentsOptions.forEach((option, index) => {
      expect(option.innerHTML.includes(mockStudents[index].firstName)).toEqual(true);
      expect(option.innerHTML.includes(mockStudents[index].lastName)).toEqual(true);
    });
});

  it("Should call getStudents only once", () => {
      expect(spyOnGetStudents).toHaveBeenCalledTimes(1);
  });

});

describe("Selecting a student tests", () => {

  beforeEach(() => {

    server = new Server();
    mockStudents = server.getRandomStudents();
    mockCourses = server.getCourses();
    mockStudentCourses = server.getRandomStudentCourses(mockStudents, mockCourses);
    mockStudentToSelect = mockStudents[1];

    ReactDOM.render(<App />, document.body);
  });

  afterEach(() => {
    spyOnGetStudents.mockClear();
    spyOnGetCoursesForStudent.mockClear();
    spyOnGetCourse.mockClear();
    ReactDOM.unmountComponentAtNode(document.body);
  });

  it("should display the selected student's name, student number, email, and registration date", done => {
    const selectElement = document.body.querySelector("select");
    const options = document.body.querySelectorAll("option");
    const optionToSelect = (Array.from(options)).find((option) => {
      return option.innerHTML.includes(mockStudentToSelect.firstName) && 
        option.innerHTML.includes(mockStudentToSelect.lastName);
    });
    
    const notSelectedStudents = mockStudents.filter((student) => {
      student.email !== mockStudentToSelect.email;
    });

    selectElement.value = optionToSelect.value;
    const event = new Event("change", { bubbles: true });
    selectElement.dispatchEvent(event);
    
    setTimeout(() => {
      try {
        const studentInfoElements = Array.from(document.body.querySelectorAll(".student-info"));
        expect(studentInfoElements.length).toEqual(1);
        expect(studentInfoElements[0].innerHTML.includes(mockStudentToSelect.firstName)).toEqual(true);
        expect(studentInfoElements[0].innerHTML.includes(mockStudentToSelect.lastName)).toEqual(true);
        expect(studentInfoElements[0].innerHTML.includes(mockStudentToSelect.studentNumber)).toEqual(true);
        expect(studentInfoElements[0].innerHTML.includes(mockStudentToSelect.email)).toEqual(true);
        expect(studentInfoElements[0].innerHTML.includes(mockStudentToSelect.registrationDate.toLocaleDateString())).toEqual(true);
      
        notSelectedStudents.forEach((student) => {
          expect(!studentInfoElements[0].innerHTML.includes(student.firstName)).toEqual(true);
          expect(!studentInfoElements[0].innerHTML.includes(student.lastName)).toEqual(true);
          expect(!studentInfoElements[0].innerHTML.includes(student.studentNumber)).toEqual(true);
          expect(!studentInfoElements[0].innerHTML.includes(student.email)).toEqual(true);
          expect(!studentInfoElements[0].innerHTML.includes(student.registrationDate.toLocaleDateString())).toEqual(true);
        });
      
        done();
      } catch (err) {
        done.fail(err);
      }
    }, 4000);
  });

  it("should display the selected student's courses with the name, instructor, and credits - exact format", done => {

    const selectElement = document.body.querySelector("select");
    const options = document.body.querySelectorAll("option");
    const optionToSelect = (Array.from(options)).find((option) => {
      return option.innerHTML.includes(mockStudentToSelect.firstName) && 
        option.innerHTML.includes(mockStudentToSelect.lastName);
    });
    const studentCourses = mockStudentCourses[mockStudentToSelect.email];
    const studentCoursesNotTaken = mockCourses.filter((course) => {
      return !studentCourses.includes(course);
    });

    selectElement.value = optionToSelect.value;
    const event = new Event("change", { bubbles: true });
    selectElement.dispatchEvent(event);

    setTimeout(() => {
      try {
        const coursesInfoElements = Array.from(document.body.querySelectorAll(".course-info"));
    
        const matchedCourses = [];
        expect(coursesInfoElements.length).toEqual(studentCourses.length);
        coursesInfoElements.forEach((courseInfoElement) => {
          const matchCourse = mockCourses.find((course) => { 
            return courseInfoElement.innerHTML.includes(course.name);
          });
  
          expect(matchCourse).not.toBeNull();
          expect(!matchedCourses.includes(matchCourse.id)).toEqual(true);

          matchedCourses.push(matchCourse.id);

          expect(courseInfoElement.innerHTML.includes(matchCourse.name)).toEqual(true);
          expect(courseInfoElement.innerHTML.includes(matchCourse.instructor)).toEqual(true);
          expect(courseInfoElement.innerHTML.includes(matchCourse.credits.toString())).toEqual(true);

          const expectedCourseText = `${matchCourse.name } - ${matchCourse.instructor } (${matchCourse.credits } credits)`;
          expect(courseInfoElement.innerHTML.trim().includes(expectedCourseText.trim())).toEqual(true);

          studentCoursesNotTaken.forEach((course) => {
            expect(!courseInfoElement.innerHTML.includes(course.name)).toEqual(true);
            expect(!courseInfoElement.innerHTML.includes(course.instructor)).toEqual(true);
          });

          done();
        });
      } catch (err) {
        done.fail(err);
      }
    }, 3000);
  });

  it(`should display the selected student's courses in alphabetical order by course name`, done => {
    const courseIdsForSelectedStudent = mockStudentCourses[mockStudentToSelect.email];
    const courseNamesInAlphabeticalOrder = mockCourses.filter(course => courseIdsForSelectedStudent.includes(course.id))
      .sort((course1, course2) => course1.name.localeCompare(course2.name))
      .map(course => course.name);
    
    const selectElement = document.body.querySelector("select");
    const options = document.body.querySelectorAll("option");
    const optionToSelect = (Array.from(options)).find((option) => {
      return option.innerHTML.includes(mockStudentToSelect.firstName) && 
        option.innerHTML.includes(mockStudentToSelect.lastName);
    });
  
    selectElement.value = optionToSelect.value;
    const event = new Event("change", { bubbles: true });
    selectElement.dispatchEvent(event);
    
    setTimeout(() => {
      try {
        const coursesInfoElements = Array.from(document.body.querySelectorAll(".course-info"));
        courseNamesInAlphabeticalOrder.forEach((course, index) => {
          expect(coursesInfoElements[index].innerHTML.includes(course.name));
        });
        done();
      } catch (err) {
        done.fail(err);
      }
    }, 3000);
  });

  it(`should call getCoursesForStudent only once`, done => {
    const selectElement = document.body.querySelector("select");
    const options = document.body.querySelectorAll("option");
    const optionToSelect = (Array.from(options)).find((option) => {
      return option.innerHTML.includes(mockStudentToSelect.firstName) && 
        option.innerHTML.includes(mockStudentToSelect.lastName);
    });
  
    selectElement.value = optionToSelect.value;
    const event = new Event("change", { bubbles: true });
    selectElement.dispatchEvent(event);
    
    setTimeout(() => {
      try {
        expect(spyOnGetCoursesForStudent).toHaveBeenCalledTimes(1);
        done();
      } catch (err) {
        done.fail(err);
      }
    }, 3000);
  });
  
});

describe("No selection tests", () => {

  beforeEach(() => {

    server = new Server();
    mockStudents = server.getRandomStudents();
    mockCourses = server.getCourses();
    mockStudentCourses = server.getRandomStudentCourses(mockStudents, mockCourses);
    mockStudentToSelect = mockStudents[1];

    ReactDOM.render(<App />, document.body);
  });

  afterEach(() => {
    spyOnGetStudents.mockClear();
    spyOnGetCoursesForStudent.mockClear();
    spyOnGetCourse.mockClear();
    ReactDOM.unmountComponentAtNode(document.body);
  });

  it("should not display student info when no student is selected", () => {
    const options = document.body.querySelectorAll("option");
    expect(options.length).toEqual(mockStudents.length + 1);

    const studentInfoElements = document.body.querySelector(".student-info");
    expect(!studentInfoElements || !studentInfoElements[0].innerHTML.trim()).toEqual(true);
  });

  it(`should not display student courses list when no student is selected`, () => {
    const options = document.body.querySelectorAll("option");
    expect(options.length).toEqual(mockStudents.length + 1);

    const studentCoursesList = document.body.querySelectorAll('.course-info');
    expect(studentCoursesList.length).toEqual(0);
  });

});