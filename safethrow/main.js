

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