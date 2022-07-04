let dropdownMenu = document.getElementsByClassName('dropdownMenu');
let dropdownItem = document.getElementsByClassName('dropdown-item');
let closebtn = document.getElementsByClassName('closebtn');
let id = document.getElementById('userbox');
//On blur select button
id.onblur = function () {
	if (id.value === 'Sign up') {
		dropdownMenu[1].style.display = 'flex';
		dropdownMenu[2].style.display = 'none';
	}
	else if(id.value === 'Login' && dropdownMenu[1].style.display !== 'flex'&&dropdownMenu[2].style.display!== 'flex')
	{
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
let returnusername =false;
function validateUserName() {
	let validationUsername = document.getElementById('validationUsername');
	let regexUsername = /^[a-zA-Z0-9][\w\.-]{1,15}[a-zA-Z0-9]$/;
	let user = localStorage.getItem('User');
	let userObj;
	signUsername.addEventListener('blur', function () {
		if (regexUsername.test(signUsername.value) && user === null) {
			addValidation(
				signUsername,
				validationUsername,
				'Looks amazing!',
				true
			);
			returnusername = true;
		} else if (
			regexUsername.test(signUsername.value) &&
			user !== null
		) {
			userObj = JSON.parse(user);
			let isPresent = false;
			Array.from(userObj).forEach(element => {
				if (element.name === signUsername.value) {
					isPresent = true;
				}
			});
			if (isPresent === false) {
				addValidation(
					signUsername,
					validationUsername,
					'Looks amazing!',
					true
				);
				returnusername = true;
			} else {
				addValidation(
					signUsername,
					validationUsername,
					'Username is already taken!',
					false
				);
				returnusername = false;
			}
		} else {
			addValidation(
				signUsername,
				validationUsername,
				'Username must be unique and only start/end with a letter or number and can include [ . - _ ]',
				false
			);
			returnusername = false;
		}
	});
}
validateUserName();
// Password Validation
let signPassword = document.getElementById('signPassword');
let returnpassword = false;
function validatePassword() {
	let validationPassword = document.getElementById('validationPassword');
	let regexPassword =
		/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!%@#$&\-\*\._]).{8,20}$/;
	signPassword.addEventListener('blur', function () {
		if (regexPassword.test(signPassword.value)) {
			addValidation(
				signPassword,
				validationPassword,
				'Looks amazing!',
				true
			);
      validateCPassword();
			returnpassword = true;
		} else {
			addValidation(
				signPassword,
				validationPassword,
				'Password must have Small letter[a-z] Capital letter[A-Z] Number[0-9] Special character[ ! % @ # $ & - * . _ ]',
				false
			);
			returnpassword = false;
		}
	});
}
validatePassword();
// Confirm Password Validation
let signCPassword = document.getElementById('signCPassword');
let returncpassword = false;
function validateCPassword() {
	let validationCPassword = document.getElementById(
		'validationCPassword'
	);
	let regexCPassword =
		/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!%@#$&\-\*\._]).{8,20}$/;
	signCPassword.addEventListener('blur', function () {
		if (regexCPassword.test(signCPassword.value)) {
			if (signCPassword.value !== signPassword.value) {
				addValidation(
					signCPassword,
					validationCPassword,
					'Confirm password must match with password',
					false
				);
				returncpassword = false;
			} else {
				addValidation(
					signCPassword,
					validationCPassword,
					'Looks amazing!',
					true
				);
        returncpassword = true;
      }
		} else {
			addValidation(
				signCPassword,
				validationCPassword,
				'Password must have Small letter[a-z] Capital letter[A-Z] Number[0-9] Special character[ ! % @ # $ & - * . _ ]',
				false
			);
			returncpassword = false;
		}
	});
  if (signCPassword.value === signPassword.value && signCPassword.value !== '') {
    addValidation(
      signCPassword,
      validationCPassword,
      'Looks amazing',
      true
    );
    returncpassword = true;
}
}
validateCPassword();
//Validate security
let signSecurity = document.getElementById('signSecurity');
let returnsecurity = false;
function validateSecurity(){
  let validationSecurity = document.getElementById('validationSecurity');
  signSecurity.addEventListener('blur', function () {
    if(signSecurity.value === '')
    {
      addValidation(signSecurity,validationSecurity,"Please select a valid question!",false);
      returnsecurity = false;
    }
    else
    {
      addValidation(signSecurity,validationSecurity,"Looks amazing!",true);
      returnsecurity = true;
    }
  })
}
validateSecurity()
//Validate answer
let signAnswer = document.getElementById('signAnswer');
let returnanswer = false;
function validateAnswer(){
  let validationAnswer = document.getElementById('validationAnswer');
  let regexAnswer = /[a-zA-Z ]{4,20}/;
  signAnswer.addEventListener('blur', function () {
    if(regexAnswer.test(signAnswer.value))
    {
      addValidation(signAnswer,validationAnswer,"Looks amazing!",true);
      returnanswer = true;
    }
    else
    {
		addValidation(signAnswer,validationAnswer,"Answer must be 4 character long!",false);
      returnanswer = false;
    }
  })
}
validateAnswer()

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

function signUp()
{
  if(returnusername&&returnpassword&&returncpassword&&returnsecurity&&returnanswer)
  {
    let user = localStorage.getItem('User');
    let userObj;
    if(user===null)
    {
      userObj = [];
    }
    else 
    {
      userObj = JSON.parse(user);
    }
    userObj.push({
      name:signUsername.value,
      password:signPassword.value,
      securityquestion:signSecurity.value,
      securityanswer:signAnswer.value,
      notes: [],
      task: [],
    });
    localStorage.setItem('User',JSON.stringify(userObj));
    alert('congratulations🎉!You have successfully created your account');
    signUsername.value ='';
    signPassword.value ='';
    signCPassword.value = '';
    signSecurity.value ='';
    signAnswer.value = '';
    signUsername.classList.remove('is-valid');
    signPassword.classList.remove('is-valid');
    signCPassword.classList.remove('is-valid');
    signSecurity.classList.remove('is-valid');
    signAnswer.classList.remove('is-valid');
    dropdownMenu[1].style.display = 'none';
	 ShowUser();
  }
  else
  {
	alert("⚠️Access Denied! Please enter valid info before Sign up");
  }
}

function ShowUser(){
	let userbox = document.getElementById('userbox');
	let user = localStorage.getItem('User');
	let userObj;
	if(user===null)
	{
		userObj =[];
	}
	else 
	{
		userObj = JSON.parse(user);
	}
	let html = '';
	userObj.forEach(element=> html += `<option>${element.name}</option>`)
	html += `<option>Login</option>
	<option>Sign up</option>`;
	userbox.innerHTML = html;
}
ShowUser();