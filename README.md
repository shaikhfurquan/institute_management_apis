# Institute Management APIs

This document provides an overview of the available APIs for user registration, login, course management, student management, and fee management.

## Table of Contents
- [User  APIs](#user-apis)
  - [User  Register API](#user-register-api)
  - [User  Login API](#user-login-api)
- [Course APIs](#course-apis)
  - [Add Course API](#add-course-api)
  - [Get All Courses](#get-all-courses)
  - [Get Course by ID](#get-course-by-id)
  - [Delete Course by ID](#delete-course-by-id)
  - [Update Course](#update-course)
  - [Get Latest Five Courses](#get-latest-five-courses)
- [Student APIs](#student-apis)
  - [Add Student API](#add-student-api)
  - [Get All Students](#get-all-students)
  - [Get All Students for a Course](#get-all-students-for-a-course)
  - [Delete Student by ID](#delete-student-by-id)
  - [Update Student by ID](#update-student-by-id)
  - [Get Latest 5 Students](#get-latest-5-students)
- [Fee APIs](#fee-apis)
  - [Add Fee API](#add-fee-api)
  - [Get Fee History](#get-fee-history)
  - [Get All Fees for a Student in a Course](#get-all-fees-for-a-student-in-a-course)

---

## User APIs

### User Register API
- **Endpoint:** `POST http://localhost:6060/api/user/register`
- **Purpose:** Allows new users to register by providing their details.
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:6060/api/user/register' \
    --form 'firstName="fname"' \
    --form 'image=@"/C:/Users/intel/Downloads/profile-8268938_640.webp"' \
    --form 'lastName="lname"' \
    --form 'email="sf@gmail.com"' \
    --form 'password="123456"'
    ```

### User Login API
- **Endpoint:** `POST http://localhost:6060/api/user/login`
- **Purpose:** Authenticates users and provides a token for subsequent requests.
- **Request Body:**
    ```json
    {
        "email": "sf@gmail.com",
        "password": "123456"
    }
    ```
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:6060/api/user/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "sf@gmail.com",
        "password": "123456"
    }'
    ```

## Course APIs

### Add Course API
- **Endpoint:** `POST http://localhost:6060/api/course/add-course`
- **Purpose:** Enables instructors to add new courses to the platform.
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:6060/api/course/add-course' \
    --header 'Cookie: YOUR_TOKEN_HERE' \
    --form 'courseName="MERN"' \
    --form 'price="23000"' \
    --form 'description="MERN full stack"' \
    --form 'startDate="09/09/2024"' \
    --form 'endDate="09/12/2024"' \
    --form 'image=@"/C:/Users/intel/Downloads/laptop-png.jpg"'
    ```

### Get All Courses
- **Endpoint:** `GET http://localhost:6060/api/course/get-all`
- **Purpose:** Retrieves all courses added by the logged-in user.
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:6060/api/course/get-all' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### Get Course by ID
- **Endpoint:** `GET http://localhost:6060/api/course/get/:courseId`
- **Purpose:** Fetches details of a specific course using its ID.
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:6060/api/course/get/COURSE_ID_HERE' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### Delete Course by ID
- **Endpoint:** `DELETE http://localhost:6060/api/course/delete/:courseId`
- **Purpose:** Removes a course from the platform using its ID.
- **CURL Example:**
    ```bash
    curl --location --request DELETE 'http://localhost:6060/api/course/delete/COURSE_ID _HERE' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### Update Course
- **Endpoint:** `PUT http://localhost:6060/api/course/update/:courseId`
- **Purpose:** Updates the details of an existing course.
- **CURL Example (with files):**
    ```bash
    curl --location --request PUT 'http://localhost:6060/api/course/update/COURSE_ID_HERE' \
    --header 'Cookie: YOUR_TOKEN_HERE' \
    --form 'courseName="MERN/PERN"' \
    --form 'price="25000"' \
    --form 'description="MERN full stack"' \
    --form 'startDate="09/09/2024"' \
    --form 'endDate="09/12/2024"' \
    --form 'image=@"/C:/Users/intel/Downloads/profile-pic.jpg"'
    ```

### Get Latest Five Courses
- **Endpoint:** `GET http://localhost:6060/api/course/latest-courses`
- **Purpose:** Retrieves the five most recently added courses.
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:6060/api/course/latest-courses' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

## Student APIs

### Add Student API
- **Endpoint:** `POST http://localhost:6060/api/student/add-student`
- **Purpose:** Allows instructors to enroll new students in courses.
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:6060/api/student/add-student' \
    --header 'Cookie: YOUR_TOKEN_HERE' \
    --form 'fullName="std"' \
    --form 'email="std@gmail.com"' \
    --form 'address="M.H"' \
    --form 'phone="1010101010"' \
    --form 'image=@"/C:/Users/intel/Downloads/linux-image.jpg"' \
    --form 'courseId="6776e7b65c6ecb5e597b406c"'
    ```

### Get All Students
- **Endpoint:** `GET http://localhost:6060/api/student/get-all`
- **Purpose:** Retrieves a list of all students enrolled in the platform.
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:6060/api/student/get-all' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### Get All Students for a Course
- **Endpoint:** `GET http://localhost:6060/api/student/get-all/:courseId`
- **Purpose:** Fetches all students enrolled in a specific course.
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:6060/api/student/get-all/COURSE_ID_HERE' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### Delete Student by ID
- **Endpoint:** `DELETE http://localhost:6060/api/student/delete/:studentId`
- **Purpose:** Removes a student from the platform using their ID.
- **CURL Example:**
    ```bash
    curl --location --request DELETE 'http://localhost:6060/api/student/delete/STUDENT_ID_HERE' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### Update Student by ID
- **Endpoint:** `PUT http://localhost:6060/api/student/update/:studentId`
- **Purpose:** Updates the details of an existing student.
- **CURL Example (with file):**
    ```bash
    curl --location --request PUT 'http://localhost:6060/api/student/update/STUDENT_ID_HERE' \
    --header 'Cookie: YOUR_TOKEN_HERE' \
    --form 'fullName="std3"' \
    --form 'email="std3@gmail.com"' \
    --form 'address="M.H......."' \
    --form 'phone="1010101010"' \
    --form 'image=@"/C:/Users/intel/Downloads/std1.jpg"' \
    --form 'courseId="6776e7b65c6ecb5e597b406c"'
    ```

### Get Latest 5 Students
- **Endpoint:** `GET http://localhost:6060/api/student/get/latest-students`
- **Purpose:** Retrieves the five most recently added students.
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:6060/api/student/get/latest-students' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

## Fee APIs

### Add Fee API
- **Endpoint:** `POST http://localhost:6060/api/fee/add-fee`
- **Purpose:** Allows instructors to record fee payments made by students.
- **Request Body:**
    ```json
    {
        "fullName": "std1",
        "phone": "1010101010",
        "email": "std1@gmail.com",
        "amount": 25000,
        "courseId": "6776f7d79849b792ab8edcf1",
        "remark": "Fee for the python course"
    }
    ```
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:6060/api/fee/add-fee' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: YOUR_TOKEN_HERE' \
    --data-raw '{
        "fullName": "std1",
        "phone": "1010101010",
        "email": "std1@gmail.com",
        "amount": 25000,
        "courseId": "6776f7d79849b792ab8edcf1",
        "remark": "Fee for the python course"
    }'
    ```

### Get Fee History
- **Endpoint:** `GET http://localhost:6060/api/fee/fee-history`
- **Purpose:** Retrieves the fee payment history for the logged-in user.
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:6060/api/fee/fee-history' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```

### Get All Fees for a Student in a Course
- **Endpoint:** `GET http://localhost:6060/api/fee/all-fee/?courseId={courseId}&phone={phone}`
- **Purpose:** Fetches all fee records for a specific student in a course.
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:6060/api/fee/all-fee/?courseId=COURSE_ID_HERE&phone=PHONE_NUMBER_HERE' \
    --header 'Cookie: YOUR_TOKEN_HERE'
    ```