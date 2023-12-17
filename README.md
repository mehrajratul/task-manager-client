Task Manager

Task Manager is a full-stack MERN (MongoDB, Express.js, React, Node.js) application designed to help users efficiently manage their tasks. The app features user authentication using Firebase, a clean and user-friendly interface crafted with Tailwind and Daisy UI, task creation with date and time tracking, JWT-based authorization, and a review system for user feedback.

Table of Contents
1.Features
2.Installation
3.Usage
4.Authentication
5.Task Management
6.Reviews
7.Contributing
8.Features

User Authentication: Utilizes Firebase for secure email and password authentication.
UI Design: Tailwind and Daisy UI are employed to create an aesthetically pleasing and intuitive user interface.
Task Creation: Users can easily add tasks through a simple input field and see them displayed in a table above.
Date and Time Tracking: The app records and displays the date and time when each task is created.
Authorization: Implements JSON Web Tokens (JWT) for secure authorization.
Task Management: Allows users to update or delete tasks as needed.
Review System: Users can provide feedback through the review feature, with reviews showcased in a dedicated page.

Installation

Clone the repository: git clone https://github.com/your-username/task-manager.git
Navigate to the project folder: cd task-manager
Install dependencies for both the server and client: npm run install-all
Set up Firebase credentials for authentication.

Usage

Start the server: npm run server
Start the client: npm run client
Visit http://localhost:3000 in your browser to access the Task Manager app.
Authentication
The app uses Firebase for user authentication.
Users can sign up with their email and password.
JWT is employed for secure authorization.
Task Management
Adding Tasks:

Input a task in the provided field.
Click the "Add" button to add the task.
Updating Tasks:

Users can update a task as needed.
Deleting Tasks:

Users can delete tasks they no longer need.
Date and Time Tracking:

The app records and displays the date and time when a task is created.
Reviews

Users can provide feedback on the app in the dedicated reviews page.

Reviews are displayed to enhance user interaction and app improvement.

Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.
