// Habit Tracker - Extracts goals from local storage and highlights common ones

document.addEventListener("DOMContentLoaded", () => {
    const habitList = document.getElementById("habit-list");
  
    let goals = JSON.parse(localStorage.getItem("goals")) || [];
    let goalHistory = JSON.parse(localStorage.getItem("goalHistory")) || {};
  
    // Identify common daily goals based on past completions
    const goalFrequency = {};
    goals.forEach((goal) => {
      const text = goal.text.toLowerCase();
      goalFrequency[text] = (goalFrequency[text] || 0) + 1;
    });
  
    const sortedGoals = Object.entries(goalFrequency).sort((a, b) => b[1] - a[1]);
    const commonDailyGoals = sortedGoals.slice(0, 5).map(([text]) => text);
  
    function renderHabits() {
      habitList.innerHTML = "";
      goals.forEach((goal, index) => {
        const li = document.createElement("li");
        li.className = "p-2 bg-gray-600 rounded-lg text-white flex justify-between items-center";
        
        if (commonDailyGoals.includes(goal.text.toLowerCase())) {
          li.classList.add("bg-green-500"); // Highlight common daily goals
        }
  
        li.innerHTML = `
          <span>${goal.text}</span>
          <input type="checkbox" data-index="${index}" class="habit-checkbox" ${goal.completed ? "checked" : ""}>
        `;
  
        habitList.appendChild(li);
      });
    }
  
    habitList.addEventListener("click", (event) => {
      if (event.target.classList.contains("habit-checkbox")) {
        const index = event.target.dataset.index;
        goals[index].completed = event.target.checked;
        localStorage.setItem("goals", JSON.stringify(goals));
      }
    });
  
    renderHabits();
  });
  