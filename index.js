const generateBtn = document.getElementById("generate-btn");
const output = document.getElementById("output");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const lengthFeedback = document.getElementById("length");
const lengthSlider = document.getElementById("slider");
const alertText = document.getElementById("alert-user");

const uppercaseChars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const lowercaseChars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numberChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbolChars = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
let allChars = [];
lengthSlider.value = 0;
lengthFeedback.textContent = lengthSlider.value;

// Updating the length feedback when the user changes the slider value
lengthSlider.addEventListener("input", () => {
    lengthFeedback.textContent = lengthSlider.value;
});

// Checking which checkboxes are checked and adding the corresponding characters to the allChars array
function checkCharacters() {
    uppercaseCheckbox.checked ? allChars.push(...uppercaseChars) : allChars = allChars.filter(char => !uppercaseChars.includes(char));
    lowercaseCheckbox.checked ? allChars.push(...lowercaseChars) : allChars = allChars.filter(char => !lowercaseChars.includes(char));
    numbersCheckbox.checked ? allChars.push(...numberChars) : allChars = allChars.filter(char => !numberChars.includes(char));
    symbolsCheckbox.checked ? allChars.push(...symbolChars) : allChars = allChars.filter(char => !symbolChars.includes(char));
}

// Styling the alert text
function styleAlertText() {
    alertText.style.color = "red";
    alertText.style.fontStyle = "italic";
    alertText.style.fontSize = "0.875rem";

    setTimeout(() => {
        alertText.textContent = "";
    }, 3000);
}

// Generating the password and checking for errors
function generate() {
    checkCharacters();
    let passwordLength = lengthSlider.value;
    let password = "";

    if (passwordLength === "0" && allChars.length === 0) {

        alertText.textContent = "Password length must be greater than 0 and at least one character type must be selected.";
        styleAlertText();

    } else if (passwordLength === "0") {

        alertText.textContent = "Password length must be greater than 0.";
        styleAlertText();

    } else if (!uppercaseCheckbox.checked && !lowercaseCheckbox.checked && 
               !numbersCheckbox.checked && !symbolsCheckbox.checked) {

        alertText.textContent = "At least one character type must be selected.";
        styleAlertText();

    } else {

        for (let i = 0; i < passwordLength; i++) {
            const randomize = Math.floor(Math.random() * allChars.length);
            let randomChar = allChars[randomize];
            password += randomChar;
        }
        output.textContent = password;
    }
}

// Copying the password to clipboard when the user clicks on the output
function copyToClipboard() {

    if (output.textContent !== "") {
        navigator.clipboard.writeText(output.textContent);
        alertText.style.color = "#4ADF86";
        alertText.textContent = "Copied to clipboard!";
        setTimeout(() => {
            alertText.textContent = "";
        }, 3000);
    }

}

generateBtn.addEventListener("click", generate);
output.addEventListener("click", copyToClipboard);