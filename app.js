const word_el = document.getElementById("word");
const popup = document.getElementById("popup-container");
const message = document.getElementById("succes-message");
const wrongLetters_el = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
const message_el = document.getElementById("message");
const playAgainbtn = document.getElementById("play-again");

const correctLetters = [];
const wrongLetters = [];
const ronk = [];
let selectedWord = getrandomword();

function getrandomword() {
  const word = ["javascript", "java", "python", "css", "html"];

  return word[Math.floor(Math.random() * word.length)];
}

function displayword() {
  word_el.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) => `
    
    <div class="letter"> ${correctLetters.includes(letter) ? letter : ""} </div>
    `
    )
    .join("")} 
    
    
    `;

  const w = word_el.innerText.replace(/\n/g, "");

  if (w === selectedWord) {
    popup.style.display = "flex";
    message.innerText = "You Won...";
  }
}

function updateWrongletters() {
  wrongLetters_el.innerHTML = `${
    wrongLetters.length >= 0 ? " <h3> Wrong Letters</h3>" : " "
  } 
    ${wrongLetters.map((letter) => `<span>${letter}<span>`)}
    `;

  items.forEach((item, index) => {
    const errorCount = wrongLetters.length;

    if (index < errorCount) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  if (wrongLetters.length === items.length) {
    popup.style.display = "flex";
    message.innerText = "You Lost...";
  }
}

function displayMessage() {
  message_el.classList.add("show");

  setTimeout(function () {
    message_el.classList.remove("show");
  }, 2000);
}

playAgainbtn.addEventListener("click", function () {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = getrandomword();
  displayword();
  updateWrongletters();
  popup.style.display = "none";
});

window.addEventListener("keydown", function (e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      console.log("correctLetters", correctLetters);
      console.log("letter", letter);
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayword();
      } else {
        displayMessage();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongletters();
      } else {
        displayMessage();
      }
    }
  }
});

displayword();
