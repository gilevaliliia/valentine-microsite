const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const question = document.getElementById("question");
const subtitle = document.getElementById("subtitle");
const counter = document.getElementById("counter");
const photo = document.getElementById("mainPhoto");
const controls = document.getElementById("controls");

let clicks = 0;

// Configure the "No click" photo set (put these files in the same folder)
const noPhotos = ["no1.jpeg", "no2.jpeg", "no3.jpeg", "no4.jpeg", "no5.jpeg"];

// Witty, not cringy, no emojis
const stages = [
  {
    q: "Interesting choice.",
    s: "I love the confidence, even if I disagree with the decision."
  },
  {
    q: "Let’s pause for a second.",
    s: "This feels like one of those moments you’ll later regret..."
  },
  {
    q: "Just to be clear.",
    s: "One button leads to a very nice Valentine’s Day. The other leads to a quiet but lasting judgment."
  },
  {
    q: "We can still fix this.",
    s: "I’m being very patient here (like Henry), considering the circumstances."
  },
  {
    q: "Final review.",
    s: "I’ve taken your feedback into account and remain confident that “Yes” is the correct answer."
  }
];

function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

function growYesButton(){
  // subtle growth
  const scale = clamp(1 + clicks * 0.04, 1, 1.28);
  yesBtn.style.transform = `scale(${scale})`;
}

function swapPhoto(){
  const idx = (clicks - 1) % noPhotos.length;
  const nextSrc = noPhotos[idx];

  // quick fade swap
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

  // If we've gone past the last stage, redirect to Yes
  if (clicks > stages.length) {
    question.textContent = "Decision recorded.";
    subtitle.textContent = "Redirecting to the correct outcome…";
    setTimeout(() => (window.location.href = "yes.html"), 1200);
    return;
  }

  // Normal stage updates
  const idx = clicks - 1;
  question.textContent = stages[idx].q;
  subtitle.textContent = stages[idx].s;

  swapPhoto();
  growYesButton();

  // ✅ add this:
  if (clicks === stages.length) {
    noBtn.style.display = "none";
  }
});


  // Normal No-cycle behavior
  const idx = clicks - 1;
  question.textContent = stages[idx].q;
  subtitle.textContent = stages[idx].s;
  counter.textContent = `Times you chose chaos: ${clicks}`;

  swapPhoto();
  growYesButton();
});
