const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const question = document.getElementById("question");
const subtitle = document.getElementById("subtitle");
const photo = document.getElementById("mainPhoto");

let clicks = 0;

// Photos for each "No" click (must match filenames in your repo)
const noPhotos = ["no1.jpeg", "no2.jpeg", "no3.jpeg", "no4.jpeg", "no5.jpeg"];

// Copy per photo / per click
const stages = [
  { q: "Interesting choice.", s: "I love the confidence, even if I disagree with the decision." },
  { q: "Let’s pause for a second.", s: "This feels like one of those moments you’ll later regret..." },
  { q: "Just to be clear.", s: "One button leads to a very nice Valentine’s Day. The other leads to a quiet but lasting judgment." },
  { q: "We can still fix this.", s: "I’m being very patient here (like Henry), considering the circumstances." },
  { q: "Final review.", s: "I’ve taken your feedback into account and remain confident that “Yes” is the correct answer." },
];

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function growYesButton() {
  const scale = clamp(1 + clicks * 0.04, 1, 1.28);
  yesBtn.style.transform = `scale(${scale})`;
}

function swapPhoto() {
  const idx = (clicks - 1) % noPhotos.length;
  const nextSrc = noPhotos[idx];

  photo.style.transition = "opacity 120ms ease";
  photo.style.opacity = "0.25";

  setTimeout(() => {
    photo.src = nextSrc;
    photo.onload = () => {
      photo.style.opacity = "1";
    };
  }, 120);
}

noBtn.addEventListener("click", () => {
  clicks += 1;

  // After the 5th stage: hide the No button
  if (clicks === stages.length) {
    noBtn.style.display = "none";
  }

  // If we've gone past the last stage: force redirect
  if (clicks > stages.length) {
    question.textContent = "Decision recorded.";
    subtitle.textContent = "Redirecting to the correct outcome…";
    setTimeout(() => {
      window.location.href = "yes.html";
    }, 1200);
    return;
  }

  const idx = clicks - 1;
  question.textContent = stages[idx].q;
  subtitle.textContent = stages[idx].s;

  swapPhoto();
  growYesButton();
});

