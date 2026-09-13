/* =================================
   UNSTABLE // EXPERIMENT 07
   INTERACTION SCRIPT
================================= */


/* ---------- SCROLL REVEAL ---------- */

history.scrollRestoration = "manual";

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    observer.observe(element);
});


/* ---------- CURSOR GLOW ---------- */

const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left = event.clientX + "px";
    cursorGlow.style.top = event.clientY + "px";

});


/* ---------- MAIN BUTTON ---------- */

const unstableButton = document.getElementById("unstableButton");
const attemptsDisplay = document.getElementById("attempts");
const scoreDisplay = document.getElementById("score");
const complianceDisplay = document.getElementById("compliance");
const warningMessage = document.getElementById("warningMessage");

let attempts = 0;
let score = 0;

let neuralResponse = 87.42;
let systemStability = 94.08;

const messages = [
    "That was definitely not supposed to happen.",
    "Interesting. You actually pressed it.",
    "The system noticed that.",
    "Please stop pressing the button.",
    "You are making this considerably worse.",
    "Experiment stability is decreasing."
];




unstableButton.onclick = function () {

    attempts++;
    score += 10;

    attemptsDisplay.textContent = attempts;
    scoreDisplay.textContent =
        String(score).padStart(3, "0");


    /* ---------- UPDATE DIAGNOSTICS ---------- */

    // Neural response increases as the subject interacts
    neuralResponse += Math.random() * 3 + 1;

    // System stability decreases with every interaction
    systemStability -= Math.random() * 5 + 3;

    // Keep values within sensible limits
    neuralResponse = Math.min(neuralResponse, 99.99);
    systemStability = Math.max(systemStability, 0);


    // Update the numbers on screen
    document.getElementById("neuralResponse")
    .textContent = neuralResponse.toFixed(2) + "%";

    document.getElementById("systemStability")
    .textContent = systemStability.toFixed(2) + "%";

    document.getElementById("liveNeural")
    .textContent = neuralResponse.toFixed(2) + "%";

    document.getElementById("liveStability")
    .textContent = systemStability.toFixed(2) + "%";


    // Update progress bars
    document.querySelector(".fill-one").style.width =
        neuralResponse + "%";

    document.querySelector(".fill-two").style.width =
        systemStability + "%";


    /* ---------- SUBJECT COMPLIANCE ---------- */

    const compliance = Math.max(
        0,
        100 - attempts * 15
    );

    complianceDisplay.textContent =
        compliance + "%";

    document.querySelector(".fill-three").style.width =
        compliance + "%";


    /* ---------- WARNING MESSAGE ---------- */

    const messageIndex = Math.min(
        attempts - 1,
        messages.length - 1
    );

    warningMessage.textContent =
        messages[messageIndex];


    /* ---------- MAKE BUTTON UNSTABLE ---------- */

    if (attempts >= 2) {
        moveMainButton();
    }


    /* ---------- CONTINUE EXPERIMENT ---------- */

    if (attempts >= 5) {

        warningMessage.textContent =
            "CRITICAL: Subject has ignored every warning.";
        

        setTimeout(() => {

            document.getElementById("instabilitySection")
                .scrollIntoView({
                    behavior: "smooth"
                });

            setTimeout(() => {
                document.getElementById("instabilityLock").classList.add("unlocked");
            }, 800);


        }, 700);
    }

};


/* ---------- MOVE MAIN BUTTON ---------- */

function moveMainButton() {

    const arena = document.getElementById("buttonArena");

    const maxX =
        arena.clientWidth - unstableButton.offsetWidth - 20;

    const maxY =
        arena.clientHeight - unstableButton.offsetHeight - 20;

    const x = Math.random() * maxX + 10;
    const y = Math.random() * maxY + 10;

    unstableButton.style.left = x + "px";
    unstableButton.style.top = y + "px";

    unstableButton.style.transform = "none";
}


/* ---------- CATCH CHALLENGE ---------- */

const targetButton = document.getElementById("targetButton");
const challengeArea = document.getElementById("challengeArea");
const capturesDisplay = document.getElementById("captures");
const challengeMessage = document.getElementById("challengeMessage");

let captures = 0;

targetButton.addEventListener("click", () => {

    captures++;

    score += 100;

    capturesDisplay.textContent = captures;

    scoreDisplay.textContent =
        String(score).padStart(3, "0");

    if (captures < 5) {

        challengeMessage.textContent =
            "It moved. Again.";

        moveTarget();

    } else {

        challengeMessage.textContent =
            "STABILITY TEST COMPLETE. Proceed to final protocol.";

        targetButton.textContent = "DONE";

        targetButton.disabled = true;

       

        setTimeout(() => {

            document.querySelector(".final-section")
                .scrollIntoView({
                    behavior: "smooth"
                });

            setTimeout(() => {
                 document.getElementById("finalLock").classList.add("unlocked");
            }, 800);

        }, 700);
    }

});


/* ---------- MOVE TARGET ---------- */

function moveTarget() {

    const areaWidth =
        challengeArea.clientWidth;

    const areaHeight =
        challengeArea.clientHeight;

    const buttonSize =
        targetButton.offsetWidth;

    const x =
        Math.random() * (areaWidth - buttonSize);

    const y =
        Math.random() * (areaHeight - buttonSize);

    targetButton.style.left = x + "px";
    targetButton.style.top = y + "px";

    targetButton.style.transform = "none";
}


/* ---------- FINAL REACTION TEST ---------- */

const startTest = document.getElementById("startTest");
const reactionButton = document.getElementById("reactionButton");
const reactionMessage = document.getElementById("reactionMessage");

let reactionStartTime = 0;
let reactionTimer = null;
let testRunning = false;

startTest.addEventListener("click", () => {

    if (testRunning) {
        return;
    }

    testRunning = true;

    reactionButton.style.display = "none";

    reactionMessage.textContent =
        "WAIT FOR THE SIGNAL...";

    startTest.textContent =
        "TEST RUNNING...";

    const delay =
        Math.random() * 1500 + 1000;

    reactionTimer = setTimeout(() => {

        reactionStartTime = performance.now();

        reactionButton.style.display =
            "block";

        reactionMessage.textContent =
            "SIGNAL DETECTED — CLICK NOW!";

    }, delay);

});


/* ---------- REACTION BUTTON ---------- */

reactionButton.addEventListener("click", () => {

    if (!testRunning || reactionStartTime === 0) {
        return;
    }

    const reactionTime =
        Math.round(
            performance.now() - reactionStartTime
        );

    reactionButton.style.display = "none";

    reactionMessage.textContent =
        `REACTION TIME: ${reactionTime} ms`;

    let bonus = 0;

    if (reactionTime < 300) {
        bonus = 500;
    } else if (reactionTime < 500) {
        bonus = 350;
    } else if (reactionTime < 800) {
        bonus = 200;
    } else {
        bonus = 100;
    }

    score += bonus;

    scoreDisplay.textContent =
        String(score).padStart(3, "0");

    testRunning = false;
    reactionStartTime = 0;

    startTest.textContent =
        "TEST COMPLETE";

    setTimeout(showResult, 1200);

});


/* ---------- FINAL RESULT ---------- */

function showResult() {

    const resultOverlay =
        document.getElementById("resultOverlay");

    const finalScore =
        document.getElementById("finalScore");

    const resultText =
        document.getElementById("resultText");

    finalScore.textContent =
        String(score).padStart(3, "0");

    if (score >= 800) {

        resultText.textContent =
            "Exceptional response. System stability is irrelevant now.";

    } else if (score >= 500) {

        resultText.textContent =
            "You performed well. Unfortunately, the experiment is still unstable.";

    } else {

        resultText.textContent =
            "The experiment has officially gone off the rails.";

    }

    resultOverlay.classList.add("show");


    /* Save high score */

    const previousHighScore =
        Number(localStorage.getItem("unstableHighScore")) || 0;

    if (score > previousHighScore) {

        localStorage.setItem(
            "unstableHighScore",
            score
        );

    }

}


/* ---------- RESTART ---------- */

const restartButton =
    document.getElementById("restartButton");

restartButton.addEventListener("click", () => {

    window.scrollTo(0, 0);

    window.location.reload();

});

