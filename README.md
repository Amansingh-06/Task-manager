# Task Management Dashboard

A task management dashboard built with React for managing tasks, including the ability to add, update, and delete tasks. The application communicates with a RESTful API for task operations.

## Features

- Add new tasks with title, description, status, priority, and due date.
- Edit existing tasks.
- Delete tasks.
- Fetch tasks from a backend API.

## Technologies Used

- **Frontend**: React, React Hooks
- **Styling**: Tailwind CSS
- **Backend**: Node.js (Express.js, MongoDB) – API for managing tasks

## Setup Instructions

### Prerequisites

- Node.js
- npm or yarn
- A running backend API that exposes the following endpoints:
  - `GET /api/tasks`: Get all tasks.
  - `POST /api/tasks`: Create a new task.
  - `PUT /api/tasks/:taskId`: Update an existing task.
  - `DELETE /api/tasks/:taskId`: Delete a task.

### Steps to Run the Frontend Locally

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/task-management-dashboard.git
    cd task-management-dashboard
    ```

2. Install dependencies:
    ```bash
    npm install
    ```
   Or if you use `yarn`:
    ```bash
    yarn install
    ```

3. Set up your backend API (if not already running):
    - Make sure your backend API is running on `http://localhost:8000` or modify the URLs in the code accordingly.

4. Start the React development server:
    ```bash
    npm start
    ```
   Or with `yarn`:
    ```bash
    yarn start
    ```

5. Open your browser and go to `http://localhost:3000`.


