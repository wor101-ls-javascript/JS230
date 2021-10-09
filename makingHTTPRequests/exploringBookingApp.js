let request = new XMLHttpRequest();

// 1. How many staff are there?
request.open('GET', '/api/staff_members');
request.send();
let staff = JSON.parse(request.responseText);
let numberOfStaff = staff.length;
console.log(numberOfStaff === 5);
console.log('');


// 2. How many students are there?
request.open('GET', '/api/students');
request.send();
let students = JSON.parse(request.responseText);
let numberOfStudents = students.length;
console.log(numberOfStudents === 5);

// 3. How many schedules exist?
request.open('GET', '/api/schedules');
request.send();
let schedules = JSON.parse(request.responseText);
let numberOfSchedules = schedules.length;
console.log(numberOfSchedules === 9);

// 4. How many scheduls have bookings?
// no API interface to determine must parse schedules for those without emails
let schedulesWithBookings = schedules.filter(sched => sched['student_email'] !== null);
console.log(schedulesWithBookings === 3);

// 5. Do all staff have schedules?
// get all astaf ID's from schedules
let scheduleStaffIDs = schedules.map(schedule => schedule.staff_id);
// get all staff ID's
let staffIDs = staff.map(elem => elem.id);
// confirm if each staff ID exists in schedules staff ID's
staffIDs.every(id => scheduleStaffIDs.includes(id)); // returns false
// answer is NO

// 6. Did all students book a schedule?
// filter all schedules to only those with student emails not NULL
let bookedSchedules = schedules.filter(sched => sched.student_email !== null);
// transform scheduls array into array of student emails
let scheduleEmails = bookedSchedules.map(sched => sched.student_email);
// get all student emails
let studentEmails = students.map(stud => stud.email);
// check if every student email is included in array of schedule student emails
studentEmails.every(email => scheduleEmails.includes(email)); // returns false
// NO