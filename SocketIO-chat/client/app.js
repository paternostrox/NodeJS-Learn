const socket = io('ws://localhost:8080');

socket.on('message', data => {
    const el = document.createElement('li');
    el.innerHTML = data;
    document.querySelector('ul').appendChild(el);
});

const button = document.querySelector('button');
const input = document.querySelector('input');

button.onclick = () => {
    const text = input.value;
    socket.send(text);
    input.value = "";
}

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        button.click();
    }
});