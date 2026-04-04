// auth.js
const AUTH_KEY = "healthsync-auth";
const LATEST_BOOKING_KEY = "healthsync-latest-booking";

// Mock Database para sa Demo
const mockUsers = {
  "staff": { role: "staff", name: "Nurse Sarah", username: "frontdesk@healthsync.com" },
  "patient": { role: "user", name: "Alex Reyes", username: "alex.reyes@email.com" }
};

function login(roleType) {
  const user = mockUsers[roleType] || mockUsers["patient"];
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  
  if (user.role === "staff") {
    window.location.href = "staff-dashboard.html";
  } else {
    window.location.href = "user-dashboard.html";
  }
}

function logout() {
  window.localStorage.removeItem(AUTH_KEY);
  window.location.href = "login.html";
}

function checkAuth() {
  const userStr = window.localStorage.getItem(AUTH_KEY);
  const requiredRole = document.body.dataset.protectedRole;

  if (!userStr) {
    if (requiredRole) window.location.href = "login.html";
    return null;
  }

  const user = JSON.parse(userStr);
  
  // Kung nasa maling dashboard ang user, i-redirect
  if (requiredRole && requiredRole !== user.role) {
    window.location.href = user.role === "staff" ? "staff-dashboard.html" : "user-dashboard.html";
  }
  
  return user;
}

function populateUserUI(user) {
  if (!user) return;
  document.querySelectorAll("[data-auth-name]").forEach(el => el.textContent = user.name);
  document.querySelectorAll("[data-auth-role]").forEach(el => el.textContent = user.role.toUpperCase());
  document.querySelectorAll("[data-auth-username]").forEach(el => el.textContent = user.username);
}

function renderLatestBooking() {
  const bookingContainers = document.querySelectorAll("[data-latest-booking]");
  if (!bookingContainers.length) return;

  const bookingStr = window.localStorage.getItem(LATEST_BOOKING_KEY);
  if (!bookingStr) {
    bookingContainers.forEach(el => {
      el.innerHTML = `<div class="empty-box">No pending appointments found.</div>`;
    });
    return;
  }

  const booking = JSON.parse(bookingStr);
  const bookingHTML = `
    <div class="booking-summary">
      <strong>${booking.specialty} with ${booking.doctor}</strong>
      <p>${booking.date} at ${booking.time}</p>
      <span class="status-pill status-pending">${booking.status}</span>
    </div>
  `;
  
  bookingContainers.forEach(el => el.innerHTML = bookingHTML);
}

// Initialize kapag nag-load ang page
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = checkAuth();
  populateUserUI(currentUser);
  renderLatestBooking();

  // Attach logout function
  document.querySelectorAll("[data-logout]").forEach(button => {
    button.addEventListener("click", logout);
  });

  // Handle Login form kung nasa login page
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const roleType = document.getElementById("roleSelect").value;
      login(roleType);
    });
  }
});