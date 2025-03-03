function calculatePlan() {
    const daysLeft = parseInt(document.getElementById("daysLeft").value);
    const pagesRead = parseInt(document.getElementById("pagesRead").value);
    const totalPages = 604;
    if (isNaN(daysLeft) || daysLeft <= 0 || isNaN(pagesRead) || pagesRead < 0 || pagesRead > totalPages) {
        document.getElementById("plan").innerHTML = "<p class='text-red-500'>Please enter valid numbers.</p>";
        return;
    }
    const remainingPages = totalPages - pagesRead;
    const dailyPages = Math.ceil(remainingPages / daysLeft);
    let planHTML = `<p class='mt-4 text-lg font-semibold'>Daily Target: Read ${dailyPages} pages per day.</p>`;
    document.getElementById("plan").innerHTML = planHTML;
}

function clearInputs() {
    document.getElementById("daysLeft").value = "";
    document.getElementById("pagesRead").value = "";
    document.getElementById("plan").innerHTML = "";
}