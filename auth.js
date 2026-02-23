// scripts/auth.js

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const loginBtn = document.getElementById('loginBtn');

// Toggle forms
if (showSignup) showSignup.addEventListener('click', () => {
  loginForm.classList.add('hidden');
  signupForm.classList.remove('hidden');
});
if (showLogin) showLogin.addEventListener('click', () => {
  signupForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

// Signup
if (signupForm) signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert('Signup successful! You can now login.');
      signupForm.reset();
      signupForm.classList.add('hidden');
      loginForm.classList.remove('hidden');
    })
    .catch(error => {
      alert(error.message);
    });
});

// Login
if (loginForm) loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert('Login successful!');
      window.location.href = 'index.html';
    })
    .catch(error => {
      alert(error.message);
    });
});

// Dynamic Logout / Login button
if (loginBtn) {
  auth.onAuthStateChanged(user => {
    if (user) {
      loginBtn.innerText = 'Logout';
      loginBtn.onclick = () => {
        auth.signOut()
          .then(() => {
            alert('Logged out successfully.');
            window.location.reload();
          })
          .catch(error => alert(error.message));
      };
    } else {
      loginBtn.innerText = 'Login / Signup';
      loginBtn.onclick = () => window.location.href = 'login-signup.html';
    }
  });
}