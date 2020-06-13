let voices, currentVoice;

const playBtn = document.getElementById('play-btn');
const textInput = document.getElementById('text-input');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const speedInput = document.getElementById('speed-input');
const selectVoice = document.getElementById('select-voice');

playBtn.addEventListener('click', () => {
    readText(textInput.value)
});

pauseBtn.addEventListener('click', pauseReading);

stopBtn.addEventListener('click', stopReading);

selectVoice.addEventListener('change', (e)=> {
    selectedIndex = e.target.selectedIndex; 
    currentVoice = voices[selectedIndex];
})

speedInput.addEventListener('change', ()=> {
    stopReading();
    readText(utterance.text.substring(currentCharacter));
})

const utterance = new SpeechSynthesisUtterance();

let currentCharacter;

utterance.addEventListener('boundary', e => {
    currentCharacter = e.charIndex;
    //console.log(e);
});

function readText(text){
    if (speechSynthesis.paused && speechSynthesis.speaking) return speechSynthesis.resume();

    utterance.text = text;
    utterance.rate = speedInput.value || 1;
    utterance.voice = currentVoice;

    speechSynthesis.speak(utterance);
}

function pauseReading(){
    if (speechSynthesis.speaking) speechSynthesis.pause();
}

function stopReading(){
    speechSynthesis.resume();
    speechSynthesis.cancel();
}


function populateVoices(){
    voices = speechSynthesis.getVoices();
    voices.forEach(
        voice => {
            let option = document.createElement('option');
            let optionText = `${voice.name} ${voice.lang}`;

            if (voice.default) optionText += ` (Default)`;

            if (typeof currentVoice === 'undefine'){
                currentVoice = voice
                Option.selected = true;
            } 

            if (currentVoice === voice) option.selected = true;

            option.textContent = optionText;
            selectVoice.appendChild(option)


        }
    );
}

//invoke the populate voices func
populateVoices();
speechSynthesis.onvoiceschanged = populateVoices;


