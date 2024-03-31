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

let guideBox = document.getElementById("reg-guide");
let dot1 = document.getElementById("dot1");
let dot2 = document.getElementById("dot2");
let dot3 = document.getElementById("dot3");


Object.assign(blankMove.style,{height:"560px"});
Object.assign(flexblankMove.style,{paddingTop:"90px"});
buttonsMove.style.cssText = `transform: translateY(-50px)`;
alreadyMove.style.cssText = `transform: translateY(-50px)`;

function nextAction() {
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

    Object.assign(guideBox.style,{top: "70px", transition: "1s"})
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
    if(condition === 1) {
        Object.assign(dot1.style,{backgroundColor:"#6957f524"});
        Object.assign(dot2.style,{backgroundColor:"transparent"});
    }
    else if(condition === 2) {
        Object.assign(dot1.style,{backgroundColor:"transparent"});
        Object.assign(dot2.style,{backgroundColor:"#6957f524"});
    }
}