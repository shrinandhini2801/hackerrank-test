import { getRandomDate, getRandomFirstName, getRandomLastName, getRandomInt } from './random-helper';
import uuid from 'uuid/v4';

const courseNames = ['Algebra', 'Calculus', 'Physics', 'Biology', 'History', 'English', 'Geography', 'Drama', 'Music', 'Art', 'Philosophy'];

export default class Server {

    constructor() {
        this.students = this.getRandomStudents();
        this.courses = this.getCourses();
        this.studentCourses = this.getRandomStudentCourses(this.students, this.courses);
    }

    getStudents() {
        return new Promise((resolve)=> {
            resolve(this.students);
        });
    }

    getStudent(studentEmail) {
        return new Promise((resolve) => {
            resolve(this.students.find(student => student.email === studentEmail));
        });
    }

    getCoursesForStudent(studentEmail) {
        return new Promise((resolve) => {
            resolve(this.studentCourses[studentEmail] || []);
        });
    }

    getCourse(courseId) {
        return new Promise((resolve) => {
            resolve(this.courses.find(course => course.id === courseId));
        })
    }
  
    getRandomStudents() {
        const numberOfStudents = getRandomInt(10, 20);
        return Array(numberOfStudents)
            .fill(undefined)
            .map(_ => {
                const firstName = getRandomFirstName();
                const lastName = getRandomLastName();
                return {
                    firstName,
                    lastName,
                    studentNumber: getRandomInt(10000, 1000000),
                    email:`${firstName}.${lastName}${getRandomInt(2,20)}@school.com`,
                    registrationDate: getRandomDate() 
                };
            });
    }
  
    getRandomStudentCourses(students, courses) { 
        return students.reduce((StudentCoursesDictionary, student) => {
            StudentCoursesDictionary[student.email] = this.getRandomCourses(courses);
            return StudentCoursesDictionary;
        }, {});
    }

  getCourses() {
      return courseNames.map((courseName) => ({
        id: uuid(),
        name: courseName,
        instructor: `${getRandomFirstName()} ${getRandomLastName()}`,
        credits: getRandomInt(1, 3)
    }));
  }
  
  getRandomCourses(courses) {
    const numberOfApplications = getRandomInt(5, courses.length);
    return Array.from(new Set(Array(numberOfApplications)
      .fill(undefined)
      .map(_ => getRandomInt(0, courses.length - 1))))
      .map(uniqueIndex => courses[uniqueIndex]);
  }
}