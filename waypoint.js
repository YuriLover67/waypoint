// Where to send the user once they continue past their results.
const RESULTS_PAGE = "resources.html";

document.addEventListener("DOMContentLoaded", () => {
    const fieldsets = document.querySelectorAll(".quiz fieldset");
    const doneMessage = document.getElementById("quiz-done");
    const progress = document.getElementById("progress");
    const resultSection = document.getElementById("result");
    const resultText = document.getElementById("result-text");
    const continueBtn = document.getElementById("continue-btn");

    // Tracks which button is currently selected in each fieldset,
    // storing the button's index (0-3) as its intensity value.
    const answers = new Map();

    function updateProgress() {
        if (!progress) return;
        const percent = Math.round((answers.size / fieldsets.length) * 100);
        progress.textContent = `${percent}% complete`;
    }

    fieldsets.forEach((fieldset) => {
        const buttons = fieldset.querySelectorAll("button");

        buttons.forEach((button, index) => {
            button.addEventListener("click", () => {
                // Un-select any previously chosen button in this same question.
                buttons.forEach((b) => b.classList.remove("selected"));

                // Select the one just clicked. Clicking a different button
                // later just re-runs this, so they can freely change their mind.
                button.classList.add("selected");

                // Store the button's position (0 = lowest intensity,
                // 3 = highest) rather than its text, so scoring doesn't
                // depend on exact wording.
                answers.set(fieldset, index);

                updateProgress();
                checkCompletion();
            });
        });
    });

    function checkCompletion() {
        const allAnswered = answers.size === fieldsets.length;

        if (allAnswered && doneMessage) {
            doneMessage.style.display = "block";
            doneMessage.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }

    function showResult() {
        // Each question contributes 0-3. Max possible = number of
        // questions * 3.
        const maxScore = fieldsets.length * 3;
        const total = Array.from(answers.values()).reduce((sum, v) => sum + v, 0);
        const percent = Math.round((total / maxScore) * 100);

        if (resultText) {
            resultText.textContent = `${percent}% overwhelmed`;
        }

        // Hide the quiz itself, show the result screen instead.
        document.querySelector(".quiz").style.display = "none";
        if (resultSection) {
            resultSection.style.display = "block";
            resultSection.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }

    if (doneMessage) {
        // Hide it until the quiz is actually finished.
        doneMessage.style.display = "none";

        // Make it act like a button: only reveal the result when the
        // user clicks it, and only once every question has an answer.
        doneMessage.style.cursor = "pointer";
        doneMessage.addEventListener("click", () => {
            if (answers.size === fieldsets.length) {
                showResult();
            }
        });
    }

    if (resultSection) {
        // Hidden until the quiz is finished and "Done" is clicked.
        resultSection.style.display = "none";
    }

    if (continueBtn) {
        continueBtn.addEventListener("click", () => {
            window.location.href = RESULTS_PAGE;
        });
    }
});
