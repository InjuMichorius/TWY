// console.log('js gekoppelt')
const voice = document.querySelector(".voice");
const inputField = document.querySelector("input");
const send = document.querySelector(".send");
const chatBox = document.querySelector(".chat-box");

var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var recorder = new SpeechRecognition();

recorder.onstart = () => {
    // console.log('Voice activated')
};

recorder.onresult = (event) => {
    const resultIndex = event.resultIndex;
    const transcript = event.results[resultIndex][0].transcript
    inputField.value = transcript;
    console.log(transcript);
};

voice.addEventListener('click', () => {
    console.log('click')
    recorder.start();
});

send.addEventListener('click', () => {
    // console.log(inputField.value)   
    if (inputField.value) {
        const fanMessage = document.createElement("p");
        fanMessage.classList.add("message-fan")
        fanMessage.innerHTML = inputField.value;
        chatBox.appendChild(fanMessage);
        inputField.value = "";
    }

});