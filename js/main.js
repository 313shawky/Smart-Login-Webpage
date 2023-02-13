var login = document.querySelector('.login');
var loginLink = document.querySelector('.login-link');
var loginForm = document.querySelector('.login-form');

var signup = document.querySelector('.sign-up');
var signupLink = document.querySelector('.signup-link');
var signupForm = document.querySelector('.signup-form');

var emptyLogin = document.querySelector('#empty-login');
var emptySignup = document.querySelector('#empty-signup');
var successed = document.querySelector('.successed');
var exist = document.querySelector('.exist');

var emailError = document.querySelector('.email-error');
var passwordError = document.querySelector('.password-error');

var users = [];

if(localStorage.getItem('users') != null){
    users = JSON.parse(localStorage.getItem('users'));
}



// Signup
signup.addEventListener('click', function(){
    var user = {
        name: document.querySelector('.name').value,
        email: document.querySelector('.email').value,
        password: document.querySelector('.password').value
    };
    
    if(checkIsEmpty(user.name) && checkIsEmpty(user.email) && checkIsEmpty(user.password)){
        emptySignup.classList.replace("d-block", "d-none");
        if(checkEmailExist(user.email) == false){
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            successed.classList.replace("d-none", "d-block");
            clearRegisterForm();
        }
        else{
            exist.classList.replace("d-none", "d-block");
        }
    }
    else{
        emptySignup.classList.replace("d-none", "d-block");
        console.log("no input");
    }
});

signupLink.addEventListener('click', function(){
    loginForm.classList.replace("d-block", "d-none");
    signupForm.classList.replace("d-none", "d-block");
});

//Login
login.addEventListener('click', function(){
    emailError.classList.replace("d-block", "d-none");
    passwordError.classList.replace("d-block", "d-none");
    var user = {
        email: document.querySelector('.login-email').value,
        password: document.querySelector('.login-password').value
    };
    if(checkIsEmpty(user.email) && checkIsEmpty(user.password)){
        emptyLogin.classList.replace("d-block", "d-none");
        var index =  validateEmail(user.email, user.password);
        if(index >= 0){
            console.log(users[index].name);
            window.location.href = "home.html";
            localStorage.setItem('name', JSON.stringify(users[index].name));
            clearLoginForm();
        }
    }
    else{
        emptyLogin.classList.replace("d-none", "d-block");
    }
});

function clearLoginForm(){
    document.querySelector('.login-email').value = "";
    document.querySelector('.login-password').value = "";
}

function clearRegisterForm(){
    document.querySelector('.name').value = "";
    document.querySelector('.email').value = "";
    document.querySelector('.password').value = "";
}

loginLink.addEventListener('click', function(){
    loginForm.classList.replace("d-none", "d-block");
    signupForm.classList.replace("d-block", "d-none");
});

function checkIsEmpty(inputValue){
    exist.classList.replace("d-block", "d-none");
    successed.classList.replace("d-block", "d-none");
    if(inputValue == ""){
        return false;
    }
    else{
        return true;
    }
}

function checkEmailExist(email){
    for(var i = 0; i < users.length; i++){
        if(users[i].email == email){
            successed.classList.replace("d-block", "d-none");
            return true;
        }
        else{
            continue;
        }
    }
    exist.classList.replace("d-block", "d-none");
    return false;
}

function validateEmail(email, password){
    for(var i = 0; i < users.length; i++){
        if(users[i].email == email){
            emailError.classList.replace("d-block", "d-none");
            if(users[i].password == password){
                passwordError.classList.replace("d-block", "d-none");
                return i;
            }
            else{
                passwordError.classList.replace("d-none", "d-block");
                return -1;
            }
        }
        else{
            continue;
        }
    }
    emailError.classList.replace("d-none", "d-block");
    return -1;
}
