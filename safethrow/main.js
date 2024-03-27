

function prevStep(step) {
    
    document.getElementById('step'+step).style.display = 'none';
    document.getElementById('step'+(step-1)).style.display = 'block';
    
}
function nextStep(step) {
    document.getElementById('step'+(step-1)).style.display = 'none';
    document.getElementById('step'+step).style.display = 'block';
}
function submit(){
    alert("Вы успешно зарегистрировались!")
}

let eyeicon = document.getElementById('eyeicon');
let password = document.getElementById('passInput');

eyeicon.onclick = function() {
    if(password.type == "password"){
        password.type = "text";
        eyeicon.src = "icons/eye-opened.svg"
    }
    else{
        password.type = "password";
        eyeicon.src = "icons/eye-closed.svg"
    }
}