const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const inpWord = document.getElementById("inp-word");

// Function to fetch and display word details
function fetchWord() {
    const word = inpWord.value.trim();
    if (!word) return; // Prevent empty input
    fetch(`${url}${word}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const audioSrc = data[0].phonetics.find((phonetic) => phonetic.audio)?.audio || "";
            result.innerHTML = `
            <div class="word">
                <h3>${word}</h3>
                <button onclick="playSound('${audioSrc}')">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic || "No phonetic available"}/</p>
            </div>
            <p class="word-meaning">
               ${data[0].meanings[0].definitions[0].definition || "No definition available"}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>`;
            sound.setAttribute("src", audioSrc);
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
}

// Event listener for search button
btn.addEventListener("click", fetchWord);

// Event listener for Enter key press
inpWord.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        fetchWord();
    }
});

// Function to play sound
function playSound(audioSrc) {
    if (audioSrc) {
        sound.setAttribute("src", audioSrc);
        sound.play();
    } else {
        alert("Audio not available for this word.");
    }
}
