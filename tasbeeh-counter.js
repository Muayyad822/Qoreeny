document.addEventListener("DOMContentLoaded", () => {
    const countDisplay = document.getElementById("count");
    const incrementBtn = document.getElementById("increment");
    const decrementBtn = document.getElementById("decrement");
    const resetBtn = document.getElementById("reset");
    
    let count = 0;

    function updateDisplay() {
        countDisplay.textContent = count;
    }

    incrementBtn.addEventListener("click", () => {
        count++;
        updateDisplay();
        navigator.vibrate?.(50);
    });

    decrementBtn.addEventListener("click", () => {
        if (count > 0) {
            count--;
            updateDisplay();
            navigator.vibrate?.(30);
        }
    });

    resetBtn.addEventListener("click", () => {
        count = 0;
        updateDisplay();
        navigator.vibrate?.(100);
    });

    updateDisplay();
});
