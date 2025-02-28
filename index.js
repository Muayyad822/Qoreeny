document.addEventListener("DOMContentLoaded", () => {
  const authContainer = document.getElementById("auth-container");
  const mainApp = document.getElementById("main-app");
  const nameInput = document.getElementById("name-input");
  const saveNameBtn = document.getElementById("save-name-btn");
  const userGreeting = document.getElementById("user-greeting");
  const goalInput = document.getElementById("goal-input");
  const addGoalBtn = document.getElementById("add-goal-btn");
  const goalsList = document.getElementById("goals-list");
  const motivationalMessage = document.getElementById("motivation-text");
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  let goals = JSON.parse(localStorage.getItem("goals")) || [];
  let userName = localStorage.getItem("userName");

  let currentTheme = localStorage.getItem("theme") || "dark";
  body.setAttribute("data-theme", currentTheme);
  updateThemeStyles(currentTheme);

  themeToggle.textContent = currentTheme === "dark" ? "🌞" : "🌙 ";

  themeToggle.addEventListener("click", () => {
    const newTheme =
      body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "🌞" : "🌙 ";
    updateThemeStyles(newTheme);
  });

  function updateThemeStyles(theme) {
    if (theme === "dark") {
      body.classList.remove("bg-white", "text-black");
      body.classList.add("bg-[#1e1e2e]", "text-white");
    } else {
      body.classList.remove("bg-[#1e1e2e]", "text-white");
      body.classList.add("bg-white", "text-black");
    }
  }

  const messages = [
    "Allah does not burden a soul beyond that it can bear. (Quran 2:286)",
    "The best among you are those who learn the Quran and teach it.",
    "Whoever fasts Ramadan out of faith and hope for reward, his previous sins will be forgiven.",
    "Verily, with hardship comes ease. (Quran 94:5)",
    "The most beloved deed to Allah is the most regular and constant, even if it is small.",
    "Keep striving! Small consistent deeds are beloved to Allah.",
    "Recite the Quran today, for it will intercede for you on the Day of Judgment.",
    "A little dua can change your whole day. Keep asking Allah!",
    "Be kind. Even a smile is charity!",
    "Every good deed will be multiplied this Ramadan. Keep going!",
    "The last 10 nights are special—seek Laylatul Qadr with dedication!",
    "Remember Allah, and He will remember you.",
    "Set your goals, stay disciplined, and trust in Allah’s plan!",
  ];

  const recommendedTasks = [
    "Pray Taraweeh",
    "Give Sadaqah",
    "Read one Juz of Quran",
    "Make dua for loved ones",
    "Help prepare Iftar",
    "Do Istighfar 100 times",
    "Read about a Hadith",
    "Perform Tahajjud",
    "Avoid gossip for a day",
    "Visit a sick person",
    "Call family members",
    "Reflect on a Quranic verse",
  ];

  const openRecommended = document.getElementById("open-recommended");
  const recommendedOverlay = document.getElementById("recommended-overlay");
  const recommendedList = document.getElementById("recommended-list");
  const closeRecommended = document.getElementById("close-recommended");

  openRecommended.addEventListener("click", () => {
    recommendedList.innerHTML = ""; // Clear before adding
    recommendedTasks.forEach((task) => {
      const li = document.createElement("li");
      li.className =
        "p-2 bg-gray-300 rounded-lg text-black text-center cursor-pointer hover:bg-gray-400";
      li.textContent = task;
      li.addEventListener("click", () => {
        goals.push({ text: task, completed: false });
        saveAndRender();
        recommendedOverlay.classList.add("hidden");
      });
      recommendedList.appendChild(li);
    });
    recommendedOverlay.classList.remove("hidden");
  });

  closeRecommended.addEventListener("click", () => {
    recommendedOverlay.classList.add("hidden");
  });

  function loadMotivation() {
    let today = new Date().toISOString().split("T")[0];
    let savedMotivation = localStorage.getItem("dailyMotivation");

    if (!savedMotivation || localStorage.getItem("motivationDate") !== today) {
      let randomMessage = messages[Math.floor(Math.random() * messages.length)];
      localStorage.setItem("dailyMotivation", randomMessage);
      localStorage.setItem("motivationDate", today);
      savedMotivation = randomMessage;
    }

    motivationalMessage.textContent = savedMotivation;
  }

  function renderGoals() {
    goalsList.innerHTML = "";
    goals.forEach((goal, index) => {
      const li = document.createElement("li");
      li.className =
        "flex justify-between items-center p-2 bg-gray-600 rounded-lg text-white";

      li.innerHTML = `
                <input type="checkbox" data-index="${index}" class="goal-checkbox" ${
        goal.completed ? "checked" : ""
      }>
                <span class="flex-grow ml-2 ${
                  goal.completed ? "line-through text-gray-400" : ""
                }">${goal.text}</span>
                <button data-index="${index}" class="delete-btn btn btn-sm btn-error">✖</button>
            `;

      goalsList.appendChild(li);
    });
  }

  addGoalBtn.addEventListener("click", () => {
    const text = goalInput.value.trim();
    if (text) {
      goals.push({ text, completed: false });
      goalInput.value = "";
      saveAndRender();
    }
  });

  goalsList.addEventListener("click", (event) => {
    const index = event.target.dataset.index;

    if (event.target.classList.contains("goal-checkbox")) {
      goals[index].completed = event.target.checked;
    } else if (event.target.classList.contains("delete-btn")) {
      goals.splice(index, 1);
    }

    saveAndRender();
  });

  function saveAndRender() {
    localStorage.setItem("goals", JSON.stringify(goals));
    renderGoals();
  }

  function resetGoalsAtMidnight() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight - now;

    setTimeout(() => {
      goals = goals.map((goal) => ({ ...goal, completed: false }));
      saveAndRender();
      resetGoalsAtMidnight();
    }, timeUntilMidnight);
  }

  function checkUser() {
    if (userName) {
      userGreeting.textContent = `Welcome, ${userName}! 👋`;
      authContainer.classList.add("hidden");
      mainApp.classList.remove("hidden");
    } else {
      authContainer.classList.remove("hidden");
      mainApp.classList.add("hidden");
    }
  }

  saveNameBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (name) {
      localStorage.setItem("userName", name);
      userName = name;
      checkUser();
    }
  });

  loadMotivation();
  renderGoals();
  checkUser();
  resetGoalsAtMidnight();
});
