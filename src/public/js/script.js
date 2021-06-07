let messages = document.querySelector('.chat_messages')
let gameForm = document.querySelector('#gameForm')
let input = document.querySelector('#textInput')
const voice = document.querySelector(".btnVoice")
const textInput = document.querySelector("#textInput")
const send = document.querySelector(".btnAnswer")

var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var recorder = new SpeechRecognition()

gameForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (input.value) {
        sendMessage()
        input.value = ''
    }
})

function sendMessage() {
    let element = document.createElement('li')
    element.classList.add('message')
    element.classList.add('you')
    element.innerHTML = element.innerHTML + `
        <p class="text_meta">
            YOU
        </p>
        <p class="text">
            ${input.value}
        </p>
    `;

    document.querySelector('.chat_messages').appendChild(element)

    messages.scrollTop = messages.scrollHeight

    if (input.value.includes("song")) {
        setTimeout(function() {
            let elementTWY = document.createElement('li')
            elementTWY.classList.add('message')
            elementTWY.classList.add('twy')
            elementTWY.innerHTML = elementTWY.innerHTML + `
                <p class="text_meta">
                    TWY
                </p>
              <p class="text">
                <a href="https://soundcloud.com/robotwy/fountain">Here</a> you can find my newest release!
              </p>
            `;

            document.querySelector('.chat_messages').appendChild(elementTWY)

            messages.scrollTop = messages.scrollHeight
        }, 1000);
    }
}

recorder.onstart = () => {
    console.log('Voice activated')
};

recorder.onresult = (event) => {
    const resultIndex = event.resultIndex;
    const transcript = event.results[resultIndex][0].transcript
    textInput.value = transcript
    console.log(transcript)
};

voice.addEventListener('click', () => {
    console.log('click')
    recorder.start()
});

send.addEventListener('click', () => {
    // console.log(inputField.value)   
    if (textInput.value) {
        const fanMessage = document.createElement("li")
        const meta = document.createElement("p")
        const text = document.createElement("p")
        fanMessage.classList.add("message")
        fanMessage.classList.add("you")
        meta.classList.add("text_meta")
        meta.innerText = "You"
        text.classList.add("text")
        text.innerText = textInput.value
        fanMessage.appendChild(meta)
        fanMessage.appendChild(text)
        messages.appendChild(fanMessage)
        textInput.value = ""
    }
});