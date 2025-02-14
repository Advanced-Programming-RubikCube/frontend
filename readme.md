# Speedcubing Timer

## Overview

Speedcubing Timer is a web-based application designed for speedcubers to track their solve times, view statistics, and generate scrambles. The app features an intuitive interface, a solve history tracker, and a user-friendly timer.

## Features

- **Scramble Generator**: Provides random scrambles for different cube types.
- **Timer**: Start, stop, and reset the timer with ease.
- **Solve History**: Automatically logs solve times and displays them.
- **Statistics Dashboard**: View average times and best solve.
- **User Authentication**: Log in and manage personal solve history.
- **Responsive Design**: Works across different screen sizes and devices.

## Technologies Used

- **HTML, CSS, JavaScript** for front-end development.
- **CSS Flexbox & Grid** for responsive layout.
- **JavaScript** for timer logic and user interactions.
- **LocalStorage (or Database Integration)** to save user solve history.

## Installation

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Steps

1. Clone the Repository:

  ```bash
   git clone <repository_url>
   cd rubik-timer
  ```

2. Navigate to the project directory:

  ```bash
Copy
cd rubik-timer
  ```

3. Build and run the containers:

  ```bash
Copy
docker-compose up --build
  ```

4. Access the application:
  
  ```bash
Frontend: http://localhost:3000
Backend API: http://localhost:3001
  ```

## Usage

### 1. Open the Application

- Open your web browser and navigate to:  
  **[http://localhost:3000](http://localhost:3000)**

### 2. Using the Timer

- **Live Timer:**  
  The main page displays a large timer.
  
- **Start/Stop the Timer:**  
  - **Start:** Press and release the spacebar to start the timer.
  - **Stop:** Press the spacebar again to stop the timer.
  
- **Result:**  
  When you stop the timer, your recorded time will be displayed on the screen.

### 3. User Registration and Login

- **Using the App Without an Account:**  
  - You can use the timer without logging in, but your solve times will not be saved for future reference.
  
- **Saving Your Solve History:**  
  - To save your solve history, click the **Login** or **Sign Up** buttons located in the top-right corner.
  - An authentication modal will appear:
    - **Sign Up:** Enter a unique username and password to create an account.
    - **Login:** Enter your credentials to log in.
  - Upon successful authentication:
    - Your username will appear in the header along with a **Logout** button.
    - A sidebar (left panel) will be displayed, showing your solve history and statistics.

### 4. Dashboard Overview

- **Sidebar (Dashboard):**  
  When logged in, the sidebar on the left displays:
  - **Statistics:**  
    - **Average Time:** Your average solve time.
    - **Best Time:** Your best (minimum) solve time.
  - **Solve History:**  
    - A list of all your recorded solves is displayed below the statistics.

### 5. Logging Out

- To log out, simply click the **Logout** button in the header.
- Once logged out, your solves will not be saved until you log in again.

## Usage

1. Select your cube type.
2. Click the "Generate Scramble" button.
3. Press spacebar (or click Start) to begin the timer.
4. Press spacebar again (or click Stop) to record your solve time.
5. View your statistics and history on the dashboard.

## Future Improvements

- Cloud-based storage for user statistics.
- Additional scramble algorithms for different cube types.
- Dark mode support.
- Mobile app version.


## Contributors

- Santiago Andrés Benavides Coral 
