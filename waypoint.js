// Where to send the user once every question has an answer.
const RESULTS_PAGE = "resources.html";

document.addEventListener("DOMContentLoaded", () => {
    const fieldsets = document.querySelectorAll(".quiz fieldset");
    const doneMessage = document.getElementById("quiz-done");

    // Tracks which button is currently selected in each fieldset.
    const answers = new Map();

    fieldsets.forEach((fieldset) => {
        const buttons = fieldset.querySelectorAll("button");

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                buttons.forEach((b) => b.classList.remove("selected"));
                button.classList.add("selected");
                answers.set(fieldset, button.textContent);
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

    if (doneMessage) {
        doneMessage.style.display = "none";
        doneMessage.style.cursor = "pointer";
        doneMessage.addEventListener("click", () => {
            if (answers.size === fieldsets.length) {
                window.location.href = RESULTS_PAGE;
            }
        });
    }
});