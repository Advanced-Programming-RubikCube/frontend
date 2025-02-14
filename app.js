"use strict";

// ==========================
// Global Variables
// ==========================

// Global variable to store the  JWT token
let token = null;

// ==========================
// DOM Elements
// ==========================

// Header elements
const loginButton = document.getElementById("login-button");
const signupButton = document.getElementById("signup-button");
const logoutButton = document.getElementById("logout-button");
const authButtonsDiv = document.getElementById("auth-buttons");
const userInfoDiv = document.getElementById("user-info");
const usernameDisplay = document.getElementById("username-display");

// Modal elements
const authModal = document.getElementById("auth-modal");
const closeModalSpan = document.querySelector(".modal .close");
const loginFormContainer = document.getElementById("login-form");
const signupFormContainer = document.getElementById("signup-form");
const switchToSignupLink = document.getElementById("switch-to-signup");
const switchToLoginLink = document.getElementById("switch-to-login");

// Timer elements
const timerDisplay = document.getElementById("timer-display");
const cubeTypeSelect = document.getElementById("cube-type");
const resultDiv = document.getElementById("result");

// Sidebar elements
const sidebar = document.getElementById("sidebar");
const averageTimeElement = document.getElementById("average-time");
const bestTimeElement = document.getElementById("best-time");
const solveHistoryList = document.getElementById("solve-history");

// Timer-related variables
let startTime = null;
let timerInterval = null;
let isTiming = false;

// ==========================
// Modal Functions
// ==========================

// Show modal for login or sign up based on mode ("login" or "signup")
function showAuthModal(mode) {
  authModal.style.display = "block";
  if (mode === "login") {
    loginFormContainer.style.display = "block";
    signupFormContainer.style.display = "none";
  } else if (mode === "signup") {
    signupFormContainer.style.display = "block";
    loginFormContainer.style.display = "none";
  }
}

// ==========================
// Header Button Events
// ==========================

// Hide the authentication modal
function hideAuthModal() {
  authModal.style.display = "none";
}

// Show login modal when login button is clicked
loginButton.addEventListener("click", () => {
  showAuthModal("login");
});

// Show signup modal when signup button is clicked
signupButton.addEventListener("click", () => {
  showAuthModal("signup");
});

// Logout functionality
logoutButton.addEventListener("click", () => {
  token = null;
  userInfoDiv.style.display = "none";
  authButtonsDiv.style.display = "block";
  sidebar.style.display = "none";
  usernameDisplay.textContent = "";
});

// ==========================
// Modal Close and Switch Events
// ==========================

// Close modal when clicking on the "x"
closeModalSpan.addEventListener("click", hideAuthModal);

// Switch between login and sign up forms
switchToSignupLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginFormContainer.style.display = "none";
  signupFormContainer.style.display = "block";
});

// Switch to login form
switchToLoginLink.addEventListener("click", (e) => {
  e.preventDefault();
  signupFormContainer.style.display = "none";
  loginFormContainer.style.display = "block";
});

// ==========================
// Login Form Submission
// ==========================

const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("login-error");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  fetch("http://localhost:3001/login", {
    method: "POST",
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then(data => {
      token = data.access_token;
      authButtonsDiv.style.display = "none";
      userInfoDiv.style.display = "block";
      usernameDisplay.textContent = username;
      hideAuthModal();
      sidebar.style.display = "block";
      loadDashboard();
    })
    .catch(error => {
      loginError.textContent = "Login failed. Please check your credentials.";
      console.error(error);
    });
});

// ==========================
// Signup Form Submission
// ==========================

const signupForm = document.getElementById("signupForm");
const signupError = document.getElementById("signup-error");
signupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  fetch("http://localhost:3001/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Sign up failed");
      }
      return response.json();
    })
    .then(data => {
      token = data.access_token;
      authButtonsDiv.style.display = "none";
      userInfoDiv.style.display = "block";
      usernameDisplay.textContent = username;
      hideAuthModal();
      sidebar.style.display = "block";
      loadDashboard();
    })
    .catch(error => {
      signupError.textContent = "Sign up failed. Please try again.";
      console.error(error);
    });
});

// ==========================
// Scramble Functionality
// ==========================

const scrambleButton = document.getElementById("scramble-button");
const scrambleDisplay = document.getElementById("scramble-display");

scrambleButton.addEventListener("click", function () {
  const cubeType = document.getElementById("cube-type").value;
  fetch(`http://localhost:3001/scramble?cube_type=${cubeType}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to generate scramble");
      }
      return response.json();
    })
    .then(data => {
      scrambleDisplay.textContent = data.scramble;
    })
    .catch(error => {
      scrambleDisplay.textContent = "Error generating scramble";
      console.error(error);
    });
});

// ==========================
// Timer Functionality
// ==========================

// Prevent spacebar from scrolling the page
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
  }
});

// Start or stop the timer on spacebar release
document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    if (!isTiming) {
      startTimer();
    } else {
      stopTimer();
    }
  }
});

// Start the timer
function startTimer() {
  isTiming = true;
  startTime = performance.now();
  timerInterval = setInterval(() => {
    const elapsed = performance.now() - startTime;
    timerDisplay.textContent = formatTime(elapsed);
  }, 10);
}

// Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
  isTiming = false;
  const elapsed = performance.now() - startTime;

  // Display the final time in the result box
  resultDiv.textContent = "Time: " + formatTime(elapsed);

  // If the user is authenticated, send the solve to the backend
  if (token) {
    const cubeType = cubeTypeSelect.value;
    fetch("http://localhost:3001/solves/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({ cube_type: cubeType, solve_time: elapsed / 1000 }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Solve saved", data);
        loadDashboard(); // Update the sidebar with the latest data
      })
      .catch(error => console.error("Error saving solve", error));
  } else {
    console.log("User not logged in; solve not saved.");
  }

  // Reset the main timer display to "00:00.00" after 1 second
  setTimeout(() => {
    timerDisplay.textContent = "00:00.00";
  }, 1000);
}

// Format time in minutes:seconds.milliseconds
function formatTime(milliseconds) {
  const totalSeconds = milliseconds / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds.toFixed(2);
}

// ==========================
// Dashboard Functionality
// ==========================

// Load Dashboard: fetch user solves and update sidebar
function loadDashboard() {
  if (!token) return;
  fetch("http://localhost:3001/solves/", {
    headers: {
      "Authorization": "Bearer " + token,
    }
  })
    .then(response => response.json())
    .then(solves => {
      // Update the solve history list
      solveHistoryList.innerHTML = "";
      let totalTime = 0;
      let bestTime = Infinity;
      solves.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.cube_type}: ${item.solve_time.toFixed(2)}s at ${new Date(item.timestamp).toLocaleString()}`;
        solveHistoryList.appendChild(li);
        totalTime += item.solve_time;
        if (item.solve_time < bestTime) {
          bestTime = item.solve_time;
        }
      });
      if (solves.length > 0) {
        averageTimeElement.textContent = (totalTime / solves.length).toFixed(2);
        bestTimeElement.textContent = bestTime.toFixed(2);
      } else {
        averageTimeElement.textContent = "0.00";
        bestTimeElement.textContent = "0.00";
      }
    })
    .catch(error => console.error("Error loading dashboard:", error));
}
