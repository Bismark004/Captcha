// Selecting necessary DOM elements
const captchaTextBox = document.querySelector(".captch_box input");
const refreshButton = document.querySelector(".refresh_button");
const captchaInputBox = document.querySelector(".captch_input input");
const message = document.querySelector(".message");
const submitButton = document.querySelector(".button");

// Variable to store the generated captcha
let captchaText = null;

/**
 * Generate a random captcha and display it in the input field
 */
function generateCaptcha() {
  const randomString = Math.random().toString(36).substring(2, 7);

  const randomStringArray = randomString.split("");
  const changeString = randomStringArray.map(function (char) {
    return Math.random() > 0.5 ? char.toUpperCase() : char;
  });

  captchaText = changeString.join("   ");
  captchaTextBox.value = captchaText;
}

// Generate a captcha when the page loads
generateCaptcha();

/**
 * Function to handle the 'Refresh' button click
 */
function refreshBtnClick() {
  generateCaptcha();
  captchaInputBox.value = "";
  captchaKeyUpValidate();
}

/**
 * Function to validate and handle the 'keyup' event in the captcha input box
 */
function captchaKeyUpValidate() {
  submitButton.classList.toggle("disabled", !captchaInputBox.value);

  if (!captchaInputBox.value) {
    message.classList.remove("active");
  }
}

/**
 * Function to validate the entered captcha
 */
function submitBtnClick() {
  captchaText = captchaText.split("").filter(function (char) {
    return char !== " ";
  }).join("");

  message.classList.add("active");

  if (captchaInputBox.value === captchaText) {
    message.innerText = "Entered captcha is correct";
    message.style.color = "#222620";
  } else {
    message.innerText = "Entered captcha is not correct";
    message.style.color = "#FF2525";
  }
}

// Add event listeners for the 'Refresh' button, captchaInputBox, and submit button
refreshButton.addEventListener("click", refreshBtnClick);
captchaInputBox.addEventListener("keyup", captchaKeyUpValidate);
submitButton.addEventListener("click", submitBtnClick);
