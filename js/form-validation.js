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

firstNameInput.addEventListener("input", function () {
  firstNameError.textContent = "";
});

firstNameInput.addEventListener("blur", function () {
  if (firstNameInput.value.trim() === "") {
    firstNameError.textContent = "First Name is required.";
  }
});

lastNameInput.addEventListener("input", function () {
  lastNameError.textContent = "";
});

lastNameInput.addEventListener("blur", function () {
  if (lastNameInput.value.trim() === "") {
    lastNameError.textContent = "Last Name is required.";
  }
});

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

form.addEventListener("submit", function (event) {
  let valid = true;
  const errorMessages = [firstNameError, lastNameError, emailError];
  const checkboxError = document.getElementById("checkboxError");
  const checkboxErrorMsg = document.getElementById("checkboxErrorMsg");

  errorMessages.forEach((error) => {
    error.textContent = "";
  });

  checkboxError.style.display = "none"; // Hide the checkbox error initially
  checkboxErrorMsg.textContent = "";

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

  const mailingListChecked = mailingListCheckbox.checked;
  const termsChecked = termsCheckbox.checked;

  if (!mailingListChecked || !termsChecked) {
    checkboxErrorMsg.textContent =
      "You must accept the policies in order to use Life Process Program";
    checkboxError.style.display = "block"; // Show the checkbox error
    valid = false;
  }

  if (mailingListChecked && termsChecked) {
    // Both checkboxes are checked, so clear the checkbox error
    checkboxError.style.display = "none";
  }

  if (!valid) {
    event.preventDefault();
  }
});
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
