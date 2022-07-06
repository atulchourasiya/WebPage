let dropdownMenu = document.getElementsByClassName('dropdownMenu');
let dropdownItem = document.getElementsByClassName('dropdown-item');
let closebtn = document.getElementsByClassName('closebtn');
let id = document.getElementById('userbox');
//On blur select button
id.onfocus = function () {
    if (id.value === 'Sign up') {
        dropdownMenu[1].style.display = 'flex';
        dropdownMenu[2].style.display = 'none';
    } else if (id.value === 'Sign in' && dropdownMenu[1].style.display !== 'flex' && dropdownMenu[2].style.display !== 'flex') {
        dropdownMenu[0].style.display = 'block';
    }
};
// handle select
function handleSelect() {
    if (id.value === 'Sign up') {
        dropdownMenu[1].style.display = 'flex';
        dropdownMenu[0].style.display = 'none';
        dropdownMenu[2].style.display = 'none';
    } else {
        dropdownMenu[0].style.display = 'block';
        dropdownMenu[1].style.display = 'none';
        dropdownMenu[2].style.display = 'none';
    }
}
// signup and forget password
Array.from(dropdownItem).forEach((element, index) => {
    element.addEventListener('click', () => {
        dropdownMenu[0].style.display = 'none';
        if (index === 0) {
            dropdownMenu[1].style.display = 'flex';
        } else {
            dropdownMenu[2].style.display = 'flex';
        }
    });
});
// close button
Array.from(closebtn).forEach((element, index) => {
    element.addEventListener('click', () => {
        dropdownMenu[index].style.display = 'none';
    });
});

function showPassword(id) {
    id = document.getElementById(id);
    id.setAttribute('type', 'text');
    setTimeout(() => {
        id.setAttribute('type', 'password');
    }, 500);
}

// Username validation
let signUsername = document.getElementById('signUsername');
let forgetUsername = document.getElementById('forgetUsername');
let validationUsername = document.getElementById('validationUsername');
let validationForgetUsername = document.getElementById('validationForgetUsername');
let returnusername = false;

function validateUserName(elementId, ValidationText) {
    let regexUsername = /^[a-zA-Z0-9][\w\.-]{1,15}[a-zA-Z0-9]$/;
    let user = localStorage.getItem('User');
    let userObj;
    elementId.addEventListener('input', function () {
        if (elementId === signUsername) {
            if (regexUsername.test(elementId.value) && user === null) {
                addValidation(
                    elementId,
                    ValidationText,
                    'Looks amazing!',
                    true
                );
                returnusername = true;
            } else if (
                regexUsername.test(elementId.value) &&
                user !== null
            ) {
                userObj = JSON.parse(user);
                let isPresent = false;
                Array.from(userObj).forEach(element => {
                    if (element.name === elementId.value) {
                        isPresent = true;
                    }
                });
                if (isPresent === false) {
                    addValidation(
                        elementId,
                        ValidationText,
                        'Looks amazing!',
                        true
                    );
                    returnusername = true;
                } else {
                    addValidation(
                        elementId,
                        ValidationText,
                        'Username is already taken!',
                        false
                    );
                    returnusername = false;
                }
            } else {
                let space = /(?=.*[" "])/;
                if (space.test(elementId.value)) {
                    addValidation(
                        elementId,
                        ValidationText,
                        `Username can't contain space and can only include . -  _ in between!`,
                        false
                    );
                } else {
                    addValidation(
                        elementId,
                        ValidationText,
                        'Username must be unique and only start/end with a letter or number and can include . -  _ in between!',
                        false
                    );
                }
                returnusername = false;
            }
        } else {
            if (regexUsername.test(elementId.value)) {
                addValidation(
                    elementId,
                    ValidationText,
                    'Looks amazing!',
                    true
                );
                returnusername = true;
            } else {
                let space = /(?=.*[" "])/;
                if (space.test(elementId.value)) {
                    addValidation(
                        elementId,
                        ValidationText,
                        `Username can't contain space and can only include . -  _ in between!`,
                        false
                    );
                } else {
                    addValidation(
                        elementId,
                        ValidationText,
                        'Username must be unique and only start/end with a letter or number and can include . -  _ in between!',
                        false
                    );
                }
                returnusername = false;
            }
        }
    });
}
validateUserName(signUsername, validationUsername);
validateUserName(forgetUsername, validationForgetUsername);
// Password Validation
let signPassword = document.getElementById('signPassword');
let forgetPassword = document.getElementById('forgetPassword');
let validationPassword = document.getElementById('validationPassword');
let validationForgetPassword = document.getElementById('validationForgetPassword');
let returnpassword = false;

function validatePassword(elementId, ValidationText) {
    let regexPassword = /(?=.*[0-9]).{8,20}/;
    elementId.addEventListener('input', function () {
        if (regexPassword.test(elementId.value)) {
            addValidation(
                elementId,
                ValidationText,
                'Looks amazing!',
                true
            );
            (elementId === signPassword) ? validateCPassword(signCPassword, validationCPassword): validateCPassword(forgetCPassword, validationForgetCPassword);
            returnpassword = true;
        } else {
            let space = /(?=.*[" "])/;
            if (space.test(elementId.value)) {
                addValidation(
                    elementId,
                    ValidationText,
                    `Password can't contain space!`,
                    false
                );
            } else {
                addValidation(
                    elementId,
                    ValidationText,
                    'Password must be atleast 8 character long and contain atleast one digit[0-9]!',
                    false
                );
            }
            returnpassword = false;
        }
    });
}
validatePassword(signPassword, validationPassword);
validatePassword(forgetPassword, validationForgetPassword);
// Confirm Password Validation
let signCPassword = document.getElementById('signCPassword');
let forgetCPassword = document.getElementById('forgetCPassword');
let validationCPassword = document.getElementById('validationCPassword');
let validationForgetCPassword = document.getElementById('validationForgetCPassword');
let returncpassword = false;

function validateCPassword(elementId, ValidationText) {
    let regexCPassword = /(?=.*[0-9]).{8,20}/;
    elementId.addEventListener('input', function () {
        if (regexCPassword.test(elementId.value)) {
            if ((elementId === signCPassword) ? (elementId.value !== signPassword.value) : (elementId.value !== forgetPassword.value)) {
                addValidation(
                    elementId,
                    ValidationText,
                    'Confirm password must match with password!',
                    false
                );
                returncpassword = false;
            } else {
                addValidation(
                    elementId,
                    ValidationText,
                    'Looks amazing!',
                    true
                );
                returncpassword = true;
            }
        } else {
            let space = /(?=.*[" "])/;
            if (space.test(elementId.value)) {
                addValidation(
                    elementId,
                    ValidationText,
                    `Password can't contain space!`,
                    false
                );
            } else {
                addValidation(
                    elementId,
                    ValidationText,
                    'Password must be atleast 8 character long and contain atleast one digit[0-9]!',
                    false
                );
            }
            returncpassword = false;
        }
    });
    if (elementId.value === ((elementId === signCPassword) ? signPassword.value : forgetPassword.value) && elementId.value !== '') {
        addValidation(
            elementId,
            ValidationText,
            'Looks amazing!',
            true
        );
        returncpassword = true;
    }
}
validateCPassword(signCPassword, validationCPassword);
validateCPassword(forgetCPassword, validationForgetCPassword);
//Validate security
let signSecurity = document.getElementById('signSecurity');
let forgetSecurity = document.getElementById('forgetSecurity');
let validationSecurity = document.getElementById('validationSecurity');
let validationForgetSecurity = document.getElementById('validationForgetSecurity');
let returnsecurity = false;

function validateSecurity(elementId, ValidationText) {
    elementId.addEventListener('blur', function () {
        if (elementId.value === '') {
            addValidation(elementId, ValidationText, "Please select a valid question!", false);
            returnsecurity = false;
        } else {
            addValidation(elementId, ValidationText, "Looks amazing!", true);
            returnsecurity = true;
        }
    })
}
validateSecurity(signSecurity, validationSecurity);
validateSecurity(forgetSecurity, validationForgetSecurity);
//Validate answer
let signAnswer = document.getElementById('signAnswer');
let forgetAnswer = document.getElementById('forgetAnswer');
let validationAnswer = document.getElementById('validationAnswer');
let validationForgetAnswer = document.getElementById('validationForgetAnswer');
let returnanswer = false;

function validateAnswer(elementId, ValidationText) {
    let regexAnswer = /^[a-zA-Z ]{3,20}$/;
    elementId.addEventListener('input', function () {
        console.log(regexAnswer.test(elementId.value));
        if (regexAnswer.test(elementId.value)) {
            addValidation(elementId, ValidationText, "Looks amazing!", true);
            returnanswer = true;
        } else {
            addValidation(elementId, ValidationText, "Answer must be atleast 3 character long and only contain letters and spaces!", false);
            returnanswer = false;
        }
    })
}
validateAnswer(signAnswer, validationAnswer);
validateAnswer(forgetAnswer, validationForgetAnswer);

// Validation style function
function addValidation(elementId, ValidationText, invalidTextString, state) {
    if (state) {
        elementId.classList.add('is-valid');
        elementId.classList.remove('is-invalid');
        ValidationText.classList.add('valid-tooltip');
        ValidationText.classList.remove('invalid-tooltip');
        ValidationText.innerText = invalidTextString;
    } else {
        elementId.classList.add('is-invalid');
        elementId.classList.remove('is-valid');
        ValidationText.classList.remove('valid-tooltip');
        ValidationText.classList.add('invalid-tooltip');
        ValidationText.innerText = invalidTextString;
    }
}

//Signup 

function signUp() {
    if (returnusername && returnpassword && returncpassword && returnsecurity && returnanswer) {
        let user = localStorage.getItem('User');
        let userObj;
        if (user === null) {
            userObj = [];
        } else {
            userObj = JSON.parse(user);
        }
        userObj.push({
            name: signUsername.value,
            password: signPassword.value,
            securityquestion: signSecurity.value,
            securityanswer: signAnswer.value,
            notes: [],
            task: [],
        });
        localStorage.setItem('User', JSON.stringify(userObj));
        alert('congratulations🎉!You have successfully created your account!');
        signUsername.value = '';
        signPassword.value = '';
        signCPassword.value = '';
        signSecurity.value = '';
        signAnswer.value = '';
        signUsername.classList.remove('is-valid');
        signPassword.classList.remove('is-valid');
        signCPassword.classList.remove('is-valid');
        signSecurity.classList.remove('is-valid');
        signAnswer.classList.remove('is-valid');
        dropdownMenu[1].style.display = 'none';
        resetreturnvalue();
        ShowUser();
    } else {
        alert("⚠️ Please enter valid info before Sign up!");
    }
}

function ShowUser() {
    let userbox = document.getElementById('userbox');
    let user = localStorage.getItem('User');
    let userObj;
    if (user === null) {
        userObj = [];
    } else {
        userObj = JSON.parse(user);
    }
    let html = '';
    userObj.forEach(element => html += `<option>${element.name}</option>`)
    html += `<option>Sign in</option>
	<option>Sign up</option>`;
    userbox.innerHTML = html;
}
ShowUser();

// forget Submit 
function Submit() {
    if (returnusername && returnsecurity && returnanswer) {
        let FirstContainer = document.getElementsByClassName('forgetfirstContainer');
        let SecondContainer = document.getElementsByClassName('forgetSecondContainer');
        let user = localStorage.getItem('User');
        let userObj;
        if (user === null) {
            alert("⚠️ User information not available!");
        } else {
            userObj = JSON.parse(user);
        }
        let ispresent = false;
        userObj.forEach(Element => {
            if (Element.name === forgetUsername.value) {
                if (Element.securityquestion === forgetSecurity.value && Element.securityanswer === forgetAnswer.value) {
                    Array.from(FirstContainer).forEach(Element => Element.style.display = 'none');
                    Array.from(SecondContainer).forEach(Element => Element.style.display = 'block');
                    ispresent = true;
                }
            }
        });
        if (!ispresent) {
            alert("⚠️ User information not available!");
        }

    } else {
        alert("⚠️ Please enter valid info before Submit!");
    }
}
//changePassword
function changePassword() {
    if (returnpassword && returncpassword) {
        let FirstContainer = document.getElementsByClassName('forgetfirstContainer');
        let SecondContainer = document.getElementsByClassName('forgetSecondContainer');
        let user = localStorage.getItem('User');
        let userObj = JSON.parse(user);
        userObj.forEach(Element => {
            if (Element.name === forgetUsername.value && Element.securityquestion === forgetSecurity.value && Element.securityanswer === forgetAnswer.value) {
                Element.password = forgetPassword.value;
            }
        });
        localStorage.setItem('User', JSON.stringify(userObj));
        alert('congratulations🎉!You have successfully change your password!');
        forgetUsername.value = '';
        forgetPassword.value = '';
        forgetCPassword.value = '';
        forgetSecurity.value = '';
        forgetAnswer.value = '';
        forgetUsername.classList.remove('is-valid');
        forgetPassword.classList.remove('is-valid');
        forgetCPassword.classList.remove('is-valid');
        forgetSecurity.classList.remove('is-valid');
        forgetAnswer.classList.remove('is-valid');
        Array.from(FirstContainer).forEach(Element => Element.style.display = 'block');
        Array.from(SecondContainer).forEach(Element => Element.style.display = 'none');
        dropdownMenu[2].style.display = 'none';
        resetreturnvalue();
    }
}

function resetreturnvalue() {
    returnusername = false;
    returnpassword = false;
    returncpassword = false;
    returnsecurity = false;
    returnanswer = false;
}