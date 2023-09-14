const form = document.getElementById("myForm");
const firstNameInput = document.getElementById("firstName");
const firstNameError = document.getElementById("firstNameError");
const lastNameInput = document.getElementById("lastName");
const lastNameError = document.getElementById("lastNameError");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
const mailingListCheckbox = document.getElementById("mailingListCheckbox");
const termsCheckbox = document.getElementById("termsCheckbox");
const mailingListError = document.getElementById("mailingListError");
const termsError = document.getElementById("termsError");
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("passwordError");
const passwordToggle = document.getElementById("passwordToggle");

// Password validation
passwordInput.addEventListener("input", function () {
  passwordError.textContent = "";
});

passwordInput.addEventListener("blur", function () {
  const passwordValue = passwordInput.value.trim();
  if (passwordValue === "") {
    passwordError.textContent = "Password is required.";
  } else if (!isValidPassword(passwordValue)) {
    passwordError.textContent =
      "Password must be 8 characters with 1 uppercase, 1 lowercase, and one special character.";
  }
});

// Last Name validation
lastNameInput.addEventListener("input", function () {
  lastNameError.textContent = "";
});

lastNameInput.addEventListener("blur", function () {
  if (lastNameInput.value.trim() === "") {
    lastNameError.textContent = "Last Name is required.";
  }
});

// Email validation
emailInput.addEventListener("input", function () {
  emailError.textContent = "";
});

emailInput.addEventListener("blur", function () {
  const emailValue = emailInput.value.trim();
  if (emailValue === "") {
    emailError.textContent = "Email Address is required.";
  } else if (!isValidEmail(emailValue)) {
    emailError.textContent = "Please enter a valid email address.";
  }
});

// ... Other field validations ...

// Form submission validation
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting by default

  let valid = true;
  const errorMessages = [
    firstNameError,
    lastNameError,
    emailError,
    passwordError,
  ];
  const checkboxError = document.getElementById("checkboxError");
  const checkboxErrorMsg = document.getElementById("checkboxErrorMsg");

  errorMessages.forEach((error) => {
    error.textContent = "";
  });

  checkboxError.style.display = "none"; // Hide the checkbox error initially
  checkboxErrorMsg.textContent = "";

  // Validate form fields
  if (firstNameInput.value.trim() === "") {
    firstNameError.textContent = "First Name is required.";
    valid = false;
  }

  if (lastNameInput.value.trim() === "") {
    lastNameError.textContent = "Last Name is required.";
    valid = false;
  }

  const emailValue = emailInput.value.trim();
  if (emailValue === "") {
    emailError.textContent = "Email Address is required.";
    valid = false;
  } else if (!isValidEmail(emailValue)) {
    emailError.textContent = "Please enter a valid email address.";
    valid = false;
  }

  const passwordValue = passwordInput.value.trim();
  if (passwordValue === "") {
    passwordError.textContent = "Password is required.";
    valid = false;
  } else if (!isValidPassword(passwordValue)) {
    passwordError.textContent =
      "Password must be 8 characters with 1 uppercase, 1 lowercase, and one special character.";
    valid = false;
  }

  const mailingListChecked = mailingListCheckbox.checked;
  const termsChecked = termsCheckbox.checked;

  if (!mailingListChecked || !termsChecked) {
    checkboxErrorMsg.textContent =
      "You must accept the policies in order to use Life Process Program";
    checkboxError.style.display = "block"; // Checkbox error
    valid = false;
  }

  if (mailingListChecked && termsChecked) {
    checkboxError.style.display = "none";
  }

  if (valid) {
    // Save form data in loal storage
    const formData = {
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      email: emailInput.value.trim(),
    };

    localStorage.setItem("formData", JSON.stringify(formData));

    alert("Data sent successfully!");

    form.reset();
  }
});

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Password toggle
passwordToggle.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordToggle.classList.add("visible");
  } else {
    passwordInput.type = "password";
    passwordToggle.classList.remove("visible");
  }
});

function isValidPassword(password) {
  if (password.length < 8) {
    return false;
  }

  //  1 uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // 1 lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }

  //  1 special character
  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
    return false;
  }

  return true;
}
