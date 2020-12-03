// Assignment Code
var generateBtn = document.querySelector("#generate");

// Generate password
function generatePassword () {   
   
 // Get input for length criteria
    if (confirm("Make password length in the criteria?")){
        setLength = getLength();
        console.log(setLength)
    } else {
        var setLength = Math.floor(Math.random() * (129 - 8) + 8); // Random length if not specified
        console.log(setLength)
    }
    // Initialize "draftPassword" variable to store the current password string
    draftPassword = "";
    console.log(draftPassword)
    
    // Get input for character types selection
    var totalTypeAdd = 0;
    if (confirm("Make characters selection in the criteria?")){
        
        if (confirm("Add lowercase letters in the password?")) {
            var lowLetterAdd = true
            totalTypeAdd++
        }
        if (confirm("Add uppercase letters in the password?")) {
            var upLetterAdd = true
            totalTypeAdd++
        }
        if (confirm("Add numbers in the password?")) {
            var numberAdd = true
            totalTypeAdd++
        }
        if (confirm("Add special characters in the password?")){ 
            var spCharAdd = true
            totalTypeAdd++
        }
    }
    // Initialize "charTypeSelect", to store a pool of characters as selected by the user
    var charTypeSelect =  ""
    if (totalTypeAdd != 0) {
        if (lowLetterAdd) {
        charTypeSelect = charTypeSelect.concat(lowLetters)
        }
        if (upLetterAdd) {
            charTypeSelect = charTypeSelect.concat(upLetters)
        }
        if (numberAdd) {
            charTypeSelect = charTypeSelect.concat(numbers)
        }
        if (spCharAdd) {
            charTypeSelect = charTypeSelect.concat(spChars)
        }
    
    } else {
    // If none of the 4 character types has been specified, the pool will contain all of them
        charTypeSelect = charTypeSelect.concat(lowLetters, upLetters, numbers, spChars);
    }

    // Generate a password to match the length and the pool of characters, via random selection, 
    // and then split the new password into substrings
    
    draftPassword = draftPass(setLength,charTypeSelect).split("")
  
    // Until the step above, the draft password should meet all of the criteria input by the user, if any.
    // However, as a result of random selection, there are chances where a particular character group
    // is not selected at all and hence the password will not fulfill the criteria.


    // Introduce "missingCount" variable for the following, to store the count of any missing specified character group.
    var missingCount = totalTypeAdd;

    // Run a while loop if at least one character type is specified. It contains 2 parts:
    // 1. Replace some password characters by random characters from a particular character type, effectively generating a new password
    // 2. Check for missing characters
    // The loop ends when all of the speficied character types are present, or "missingCount = 0"
    
    while (missingCount != 0) {
        var missingCount = totalTypeAdd;
    // This part updates the draft password,
    // by replacing password characters at random index by random characters from a particular character type.
        if (lowLetterAdd) {
            draftPassword = checkCharacters(draftPassword, lowLetters)
        }
        if (upLetterAdd) {
            draftPassword = checkCharacters(draftPassword, upLetters)
        }
        if (numberAdd) {
            draftPassword = checkCharacters(draftPassword,numbers)
        }
        if (spCharAdd) {
            draftPassword = checkCharacters(draftPassword, spChars)
        }
        console.log(draftPassword)
        // This part checks the presense of the character type on the draft password
        if (lowLetterAdd){
            if (checkCharType(lowLetters, draftPassword)) {
                missingCount--;
            }
        }
        if (upLetterAdd) {
            if (checkCharType(upLetters, draftPassword)) {
                missingCount--;
            }
        }
        if (numberAdd) {
            if (checkCharType(numbers, draftPassword)) {
                missingCount--;
            } 
        }
        if (spCharAdd) {
            if (checkCharType(spChars, draftPassword)) {
                missingCount--;
            }   
        
        }
    }   
    console.log(draftPassword)

// Function to check if any from the character group is in the password
    function checkCharType(characterGroup, password){
        for (i=0; i < characterGroup.length; i++) {
            var check = false;
            if (password.includes(characterGroup[i])) {
            var check = true;
            var i = characterGroup.length; 
            }
        }
            return check;     
    }
}
// Function to get password length
function getLength() {
    var length = 0;
    while (length < 8 || length > 128) {
        var length = prompt("Please enter the password's length between 8 and 128.");
        if (length == undefined){
            var length = Math.floor(Math.random() * (129 - 8) + 8);
        }
    }
    return length;;
}

// Function to randomly select a character from the password and replace it by some characters from a character group
function checkCharacters(thePassword, characterType) {
    let i = 0;
    while (i < thePassword.length  && characterType.indexOf(thePassword[i]) === -1) {  
        var randIndex = Math.floor(Math.random() * thePassword.length);
        var randChar = characterType.charAt(Math.floor(Math.random() * characterType.length));
            thePassword.splice(randIndex,1,randChar);
            i++;
        };
            return thePassword;
    }
    

// Generate draft password of the specified length with certain character type
function draftPass(passwordLength, charTypeSelected) {
    var draftPassword = "";
    for (var i = 0; i <passwordLength; i++)
      draftPassword += charTypeSelected.charAt(Math.floor(Math.random() * charTypeSelected.length));
    return draftPassword;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password").value = draftPassword.join("");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Alphabets, numbers, special characters
const lowLetters = "abcdefghijklmnopqrstuvwxyz";

const upLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const numbers = "0123456789";

const spChars= "~!@#$%^&*()+{}|:',/.'";



