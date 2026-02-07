const noBtn = document.getElementById("noBtn");
const question = document.getElementById("question");
const subtitle = document.getElementById("subtitle");

let clicks = 0;

const messages = [
  "Really? 😭",
  "Are you sure? 🤨",
  "Think again 🙈",
  "This feels incorrect 😤",
  "Okay… last chance 💘"
];

noBtn.addEventListener("click", () => {
  clicks++;
  question.textContent = messages[clicks % messages.length];
  subtitle.textContent = "Try again 😇";
});
