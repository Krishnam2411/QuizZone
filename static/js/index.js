// constants
const time = localStorage.getItem('Time');
const sessionTime = 600000;

if(((Date.now() - time) > sessionTime) || !time){
    start();
}
else{
    showName();
}

// functions
function showName(){
    const name = document.getElementById('Name');
    name.textContent = `${localStorage.getItem('PlayerName')}!`;
}
function start(){
    const screen = document.createElement('div');
    const logo = document.createElement('img');
    logo.src = 'static/images/logo.png';
    logo.id = "logo";
    const input = document.createElement('div');
    input.id = "input";
    const screenInput = document.createElement('input');
    screenInput.type="text";
    screenInput.placeholder="Enter your name";
    screenInput.maxLength="16";
    const screenButton = document.createElement('button');
    screenButton.textContent = "➜";
    screen.classList.add('screen');
    screenInput.classList.add('screenInput');
    screenButton.classList.add('screenButton');
    screen.appendChild(logo);
    input.appendChild(screenInput);
    input.appendChild(screenButton);
    screen.appendChild(input);
    screenButton.addEventListener('click', ()=>{
        let input = screenInput.value;
        if(input != ""){
            localStorage.setItem("PlayerName", input.charAt(0).toUpperCase()+input.substring(1));
            localStorage.setItem("Time", Date.now());
            screen.remove();
            showName();
        }
    })
    document.body.appendChild(screen);
}