import Server from "../infrastracture/server";

export default class StudentService {

    constructor(){
        this.server = new Server();
    }

    /**
    * Returns an Observable of Student array that represents all the school's students
    */
    getStudents() {
        return new Promise((resolve) => {
            this.server.getStudents().then(students => resolve(students));
        });
    }
    /**
    * Gets the Student object associated with a student email as an Observable
    */
    getStudent(studentEmail) {
        return new Promise((resolve) => {
            this.server.getStudent(studentEmail).then(student => resolve(student));
        });
    }

    /**
    * Returns an Observable of string array that represents the course Ids
    * that the student with the passed e-mail has registered for
    */
    getCoursesForStudent(studentEmail) {
        return new Promise((resolve) => {
            this.server.getCoursesForStudent(studentEmail).then(courses => resolve(courses));
        });
    }

    /**
    * Gets the Course object that is represented by the provided courseId as an Observable
    */
    getCourse(courseId) {
        return new Promise((resolve) => {
            this.server.getCourse(courseId).then(course => resolve(course));
        });
    }
}