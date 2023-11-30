const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = ({ data }) => {
    const el = document.createElement('li');
    el.innerHTML = data;
    document.querySelector('ul').appendChild(el);
};

const button = document.querySelector('button');
const input = document.querySelector('input');

button.onclick = () => {
    const text = input.value;
    socket.send(text);
    input.value = "";
}

document.querySelector('input').addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        button.click();
    }
});