/**
 * Alpine Property Group - Authentication Module
 * Simple email-based authentication with whitelist
 */

// Configuration
const AUTH_CONFIG = {
  // Authorized emails (whitelist)
  authorizedEmails: [
    'steve@alpinepropertygroupllc.com',
    'bryan@alpinepropertygroupllc.com',
    'brian.vettori@alpinepropertygroupllc.com'
  ],
  
  // Shared password (change this to set a new password)
  password: 'Alpine109!',
  
  // Session storage key
  sessionKey: 'alpine_auth_session'
};

/**
 * Check if user is authenticated
 */
function isAuthenticated() {
  const session = sessionStorage.getItem(AUTH_CONFIG.sessionKey);
  if (!session) return false;
  
  try {
    const data = JSON.parse(session);
    return data.authenticated === true && AUTH_CONFIG.authorizedEmails.includes(data.email);
  } catch (e) {
    return false;
  }
}

/**
 * Authenticate user with email and password
 */
function authenticate(email, password) {
  // Normalize email
  email = email.toLowerCase().trim();
  
  // Check if email is in whitelist
  if (!AUTH_CONFIG.authorizedEmails.includes(email)) {
    return {
      success: false,
      error: 'Email not authorized. Contact steve@alpinepropertygroupllc.com for access.'
    };
  }
  
  // Check password
  if (password !== AUTH_CONFIG.password) {
    return {
      success: false,
      error: 'Incorrect password.'
    };
  }
  
  // Store session
  const sessionData = {
    authenticated: true,
    email: email,
    timestamp: Date.now()
  };
  sessionStorage.setItem(AUTH_CONFIG.sessionKey, JSON.stringify(sessionData));
  
  return {
    success: true,
    email: email
  };
}

/**
 * Get current user email
 */
function getCurrentUser() {
  const session = sessionStorage.getItem(AUTH_CONFIG.sessionKey);
  if (!session) return null;
  
  try {
    const data = JSON.parse(session);
    return data.email;
  } catch (e) {
    return null;
  }
}

/**
 * Logout current user
 */
function logout() {
  sessionStorage.removeItem(AUTH_CONFIG.sessionKey);
  window.location.href = 'login.html';
}

/**
 * Require authentication (redirect to login if not authenticated)
 * Call this at the top of every protected page
 */
function requireAuth() {
  if (!isAuthenticated()) {
    // Store intended destination
    sessionStorage.setItem('alpine_auth_redirect', window.location.pathname + window.location.search);
    window.location.href = 'login.html';
  }
}

/**
 * Add logout button to page header
 * Call this after DOM is loaded on protected pages
 */
function addLogoutButton() {
  const user = getCurrentUser();
  if (!user) return;
  
  // Find header or create one
  const header = document.querySelector('.header, .app-header');
  if (!header) return;
  
  // Create user info and logout button
  const userContainer = document.createElement('div');
  userContainer.style.cssText = 'display: flex; align-items: center; gap: 16px; margin-left: auto;';
  
  const userInfo = document.createElement('div');
  userInfo.style.cssText = 'text-align: right;';
  userInfo.innerHTML = `
    <div style="font-size: 12px; color: #64748B; margin-bottom: 2px;">Logged in as</div>
    <div style="font-size: 14px; font-weight: 600; color: #1A1A1A;">${user}</div>
  `;
  
  const logoutBtn = document.createElement('button');
  logoutBtn.innerHTML = '🚪 Logout';
  logoutBtn.className = 'btn btn-secondary';
  logoutBtn.style.cssText = `
    padding: 10px 20px;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    background: white;
    color: #2D3748;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  `;
  
  logoutBtn.onmouseover = () => {
    logoutBtn.style.background = '#F7F8FA';
    logoutBtn.style.borderColor = '#CBD5E1';
  };
  
  logoutBtn.onmouseout = () => {
    logoutBtn.style.background = 'white';
    logoutBtn.style.borderColor = '#E2E8F0';
  };
  
  logoutBtn.onclick = logout;
  
  userContainer.appendChild(userInfo);
  userContainer.appendChild(logoutBtn);
  
  // Insert at end of header
  header.appendChild(userContainer);
}
