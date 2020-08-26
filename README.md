# Important Note

You can find these requiremtns under the solution root folder, file name: README.md

# Problem Description

Your task is to build an application that allows users to view a list of students and courses they registered for.

There are sub components placeholders to guide you under: src/components folder.
Please read the requirements carefully before proceeding.

# Requirements

Using the service provided under src/services/student.service.ts, implement the following requirements:

## In student-list component:

Create a dropdown for the students list using a simple "select" HTML element.
In the dropdown you created, display the first name and last name of all the students (ex: ‘Ernest Watson’).
By default, none of the students should be selected when the app is launched. Add a placeholder option such as "Select Student" that cannot be selected.
User should be able to select a student from the dropdown

* Important: Make use of "select" element as the dropdown selector.

## In student-info components:

When the user selects a student from the dropdown in the student-list component, you should:

Display the Name, Student Number, Email, and Registration Date of the selected student beside the corresponding labels, inside the elements provided with their ids
Name should be full name: first name and last name (ex: ‘Ernest Watson’)
The registration date should be in the format of local short date string - i.e. use * toLocaleDateString *

Sample draft:
Full Name: Fred King
Student Number: 687378
Email: Fred.King7@school.com
Registration Date: 8/3/2019

* Important: Mark the root element with class name: "student-info". 
* Important: There should be only one student info comppnent

* Do not display the field labels or field values if there is no user selected from the dropdown


## In student-courses component:

When the user selects a student from the dropdown in the above component, you should:

List the courses that the selected student has:
Each list item should be displayed with the course name, instructor, and credits in the following format:
<courseName> - <courseInstructor> (<courseCredits> credits)
example: Biology - Bertha Howard (3 credits)
You should display the courses in alphabetical order by course name
Bonus: Do not display this list, including the “Courses:” label if there is no user selected from the dropdown

* Important: Each list item should be marked with a class name: "course-info"
* Important: Display only the relevant courses.

# Details

src/services/student.service.ts is the service that calls a mock server and exposes all the data you need to build the app. Familiarize yourself with the methods there.
src/models contains the data models used.
DO NOT delete any of the components (app, student-list, student-info, student-courses).
Your task is to complete the implementation of these components. 
You may use functional or class React components.
You are not allowed to add any additional NPM package.

# Your Own IDE Tips

In offline mode, pushing the code to git is not enough - you have to also submit the code before the time runs out.


# Online IDE Tips

To run the application, click on the Run button and select Run at the top.

Look at the Terminal window below called Run for progress.

Please be patient as the first time you run the application, it will take some time to install node modules and set up a server.

If you see any npm errors, please click Run again.


To see where the app is running, look at the link beside preview:
Click on this URL to open it in your browser to test your app. Here is what the Run tab looks like:

# How to Execute Tests Used For Scoring

Click the Run Tests button at the bottom of the page to make sure your solution passes all the required tests.