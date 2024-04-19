let description1 = document.getElementById("reg-blank-desc1");
let description2 = document.getElementById("reg-blank-desc2");

let nextActionButton = document.getElementById("reg-blank-button-next");
let submitActionButton = document.getElementById("reg-blank-button-submit");
let prevActionButton = document.getElementById("reg-blank-button-prev");
let prev2ActionButton = document.getElementById("reg-blank-button-prev2");
let checkboxAction = document.getElementById("reg-checkbox-flex");
let buttonsMove = document.getElementById("reg-blank-buttons-flex");
let alreadyMove = document.getElementById("reg-blank-already");
var condition;

let blankMove = document.getElementById("reg-blank");
let flexblankMove = document.getElementById("reg-blank-flex-reserve");

let regBox1 = document.getElementsByClassName("reg-box1");
let regBox2 = document.getElementsByClassName("reg-box2");
let regBox = document.getElementsByClassName("reg-boxes");
let regBoxInput = document.getElementsByClassName("reg-box");

let errorDots = document.getElementsByClassName("error-dot")

let guideBox = document.getElementById("reg-guide");
let dots = document.getElementsByClassName("dot");
let dot1 = document.getElementById("dot1");
let dot2 = document.getElementById("dot2");
let dot3 = document.getElementById("dot3");


Object.assign(blankMove.style,{height:"560px"});
Object.assign(flexblankMove.style,{paddingTop:"90px"});
buttonsMove.style.cssText = `transform: translateY(-50px)`;
alreadyMove.style.cssText = `transform: translateY(-50px)`;

function nextAction() {
    if (validateEmail() === true && correctUserName()===true){
        condition = 2;
        Object.assign(blankMove.style,{height:"600px", transition: ".45s"});
        Object.assign(flexblankMove.style,{paddingTop:"70px", transition: ".45s"});
        for(let index = 0; index < regBox1.length; index++) {
            Object.assign(regBox1[index].style,{opacity:"0",zIndex:"1"});
        }
        for(let index = 0; index < regBox2.length; index++) {
            Object.assign(regBox2[index].style,{opacity:"1",zIndex:"2"});
        }
        Object.assign(nextActionButton.style,{opacity:"0",zIndex:"1"});
        Object.assign(submitActionButton.style,{opacity:"1",zIndex:"2"});
        Object.assign(prevActionButton.style,{opacity:"0",zIndex:"1"});
        Object.assign(prev2ActionButton.style,{opacity:"1",zIndex:"2"});

        Object.assign(checkboxAction.style,{transition:".5s", opacity:"1"});

        buttonsMove.style.cssText = `transition: .4s`;
        alreadyMove.style.cssText = `transition: .5s`;

        Object.assign(guideBox.style,{top: "70px", transition: ".55s"})
    }
    else{
        return;
    }
}
function prevAction() {
    condition = 1;
    Object.assign(blankMove.style,{height:"560px", transition: ".45s"});
    Object.assign(flexblankMove.style,{paddingTop:"90px", transition: ".45s"});
    for(let index = 0; index < regBox1.length; index++) {
        Object.assign(regBox1[index].style,{opacity:"1", zIndex:"2"});
    }
    for(let index = 0; index < regBox2.length; index++) {
        Object.assign(regBox2[index].style,{opacity:"0", zIndex:"1"});
    }
    Object.assign(nextActionButton.style,{opacity:"1",zIndex:"2"});
    Object.assign(submitActionButton.style,{opacity:"0",zIndex:"1"}); 
    Object.assign(prevActionButton.style,{opacity:".5",zIndex:"2"});
    Object.assign(prev2ActionButton.style,{opacity:"0",zIndex:"1"}); 

    Object.assign(checkboxAction.style,{transition:".3s", opacity:"0"});

    buttonsMove.style.cssText = `transition: .4s; transform: translateY(-50px)`;
    alreadyMove.style.cssText = `transition: .5s; transform: translateY(-50px)`;

    Object.assign(guideBox.style,{top: "90px", transition: ".55s"})
}

function check() {
    if(condition === 2) {
        Object.assign(dot1.style,{backgroundColor:"transparent", color:"var(--middleGray)"});
        Object.assign(dot2.style,{backgroundColor:"#6957f542", color:"var(--centerMiddleGray)"});
        Object.assign(description1.style,{opacity:"0",zIndex:"1"});
        setTimeout(() => {
            Object.assign(description2.style,{opacity:"1",zIndex:"2"});
        }, 200);
    }
    else if(condition === 1) {
        Object.assign(dot1.style,{backgroundColor:"#6957f542", color:"var(--centerMiddleGray)"});
        Object.assign(dot2.style,{backgroundColor:"transparent", color:"var(--middleGray)"});
        setTimeout(() => {
            Object.assign(description1.style,{opacity:"1", zIndex:"2"});
        }, 200);
        Object.assign(description2.style,{opacity:"0",zIndex:"1"});
    }
}

function inputCheck() {
    for(let index = 0; index < regBoxInput.length; index++) {
        if(regBoxInput[index].value === "") {
            errorDots[index].style.display = 'block';
        }
        else if(regBoxInput[index].value != ""){
            errorDots[index].style.display = 'none';
        }
    }
}

function validateEmail() {
    let flag = false;
    let email = document.getElementById("reg-mail");
    const re =  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    let dot = document.getElementById("e-d-email");
    if(re.test(String(email.value).toLowerCase())){
        dot.style.display = 'none';
        flag=true;
    }
    else{
        dot.style.display = 'block';
        flag = false;
    }
    return flag;
}

function correctUserName(){
    let flag = false;
    let userName = document.getElementById("reg-login");
    let dot = document.getElementById("e-d-userName");
    if(userName.value.length <5 || userName.value.length > 20){
        dot.style.display = 'block';
        flag = false;
    }
    else{
        dot.style.display = 'none';
        flag = true;
    }
    return flag;
}

function correctPass(){
    let pass = document.getElementById("reg-pass");
    const regexUpperCase = /[A-Z]/;
    const regexLowerCase = /[a-z]/;
    const regexSpecialChar = /[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:\'",<>\.\?\\|]/;
    const regexNumber = /\d/;
    let dot = document.getElementById("e-d-pass");

    if (pass.value.length < 8) {
        dot.style.display = 'block';
    }
    if (!regexUpperCase.test(String(pass.value))) {
        dot.style.display = 'block';
    } 
    
    if (!regexLowerCase.test(String(pass.value))) {
        dot.style.display = 'block';
    }

    if (!regexSpecialChar.test(String(pass.value))) {
        dot.style.display = 'block';
    }
    
    if (!regexNumber.test(String(pass.value))) {
        dot.style.display = 'block';
    }
    return;
}

const inputPassFIeld = document.getElementById("reg-pass")

inputPassFIeld.addEventListener("input", function(){
    let upper = document.getElementById("upper-letter");
    let lower = document.getElementById("lower-letter");
    let lenght = document.getElementById("pass-length");
    let digit = document.getElementById("number-symbol");
    let specSimbol = document.getElementById("spec-symbol");
    const regexUpperCase = /[A-Z]/;
    const regexLowerCase = /[a-z]/;
    const regexSpecialChar = /[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:\'",<>\.\?\\|]/;
    const regexNumber = /\d/;
    const pass = inputPassFIeld.value;

    if(pass.length >= 8){
        lenght.style.color = "green";
    }
    else if(pass.length < 8){
        lenght.style.color = "red";
    }
    if(regexUpperCase.test(String(pass))){
        upper.style.color = "green";
    }
    else if(!regexUpperCase.test(String(pass))){
        upper.style.color = "red";
    }
    if(regexLowerCase.test(String(pass))){
        lower.style.color = "green";
    }
    else if(!regexUpperCase.test(String(pass))){
        lower.style.color = "red";
    }
    if(regexSpecialChar.test(String(pass))){
        specSimbol.style.color = "green";
    }
    else if(!regexSpecialChar.test(String(pass))){
        specSimbol.style.color = "red";
    }
    if(regexNumber.test(String(pass))){
        digit.style.color = "green";
    }
    else if(!regexNumber.test(String(pass))){
        digit.style.color = "red";
    }
    const trimmedPass = pass.replace(/\s+/g, '');
    inputPassFIeld.value = trimmedPass;
});
function repasCheck(){
    let pass = document.getElementById("reg-pass");
    let repass = document.getElementById("reg-repass");
    let dot = document.getElementById("e-d-repass");
    if(pass.value === repass.value){
        dot.style.display = 'none';
    }
    else{
        dot.style.display = 'block';
    }
}