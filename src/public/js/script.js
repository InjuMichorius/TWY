let messages = document.querySelector('ul')
let gameForm = document.querySelector('#gameForm')
let input = document.querySelector('#textInput')

gameForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (input.value) {
        sendMessage();
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