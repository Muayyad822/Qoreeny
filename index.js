document.addEventListener("DOMContentLoaded", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(() => console.log("Service Worker Registered"))
      .catch((error) =>
        console.error("Service Worker Registration Failed:", error)
      );
  }

  if (Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notifications enabled!");
      }
    });
  }

  function updateNotification() {
    if (Notification.permission === "granted") {
      const completedGoals = goals.filter((goal) => goal.completed).length;
      const remainingGoals = goals.length - completedGoals;
  
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Ramadan Goals Progress", {
          body: `✅ Completed: ${completedGoals}\n⏳ Remaining: ${remainingGoals}`,
          icon: "https://fav.farm/🌙",
          badge: "https://fav.farm/🌙",
          requireInteraction: true, // Keeps notification persistent
          tag: "ramadan-goals", // Ensures only one notification is active at a time
          renotify: true, // Replaces the previous notification with an update
        });
      });
    }
  }
  

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

  const authContainer = document.getElementById("auth-container");
  const mainApp = document.getElementById("main-app");
  const nameInput = document.getElementById("name-input");
  const saveNameBtn = document.getElementById("save-name-btn");
  const userGreeting = document.getElementById("user-greeting");
  const goalInput = document.getElementById("goal-input");
  const addGoalBtn = document.getElementById("add-goal-btn");
  const goalsList = document.getElementById("goals-list");
  const errorDisplay = document.getElementById("error-display");
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

  function saveAndRender() {
    localStorage.setItem("goals", JSON.stringify(goals));
    renderGoals();
    updateNotification(); // Ensure notifications update when goals change
  }

  addGoalBtn.addEventListener("click", () => {
    const text = goalInput.value.trim();
    try {
        if (text) {
          goals.push({ text, completed: false });
          goalInput.value = "";
          saveAndRender();
        } else {
          throw new Error("Goal input cannot be empty");
        }
    } catch (error) {
        errorDisplay.textContent = error.message;
        setTimeout(() => {
          errorDisplay.textContent = "";
        }, 2000); 
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

  function resetGoalsAtMidnight() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set to next midnight
    const timeUntilMidnight = midnight - now;
  
    // Set a timeout to run at the next midnight
    setTimeout(() => {
      resetGoals(); // Reset goals and update UI
      saveAndRender();
  
      // After the first run, set an interval to run every 24 hours
      setInterval(() => {
        resetGoals(); // Reset goals and update UI
        saveAndRender();
      }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    }, timeUntilMidnight);
  
    // Handle cases where the tab becomes active after being inactive
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) {
          resetGoals(); // Reset goals and update UI
          saveAndRender();
        }
      }
    });
  }
  
  // Helper function to reset goals
  function resetGoals() {
    goals = goals.map((goal) => ({ ...goal, completed: false }));
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

  function displayIslamicDate() {
    const today = new Date();
    const hijriDate = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(today);
  
    const hijriDay = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
      day: "numeric",
    }).format(today);
  
    const hijriMonth = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
      month: "numeric",
    }).format(today);
  
    // let ramadanDay = hijriMonth === "9" ? `Ramadan Day: ${hijriDay}` : "";
  
    document.getElementById("islamic-date").innerHTML = `
      📅 ${hijriDate} 
    `;
  }
  
  

  renderGoals();
  checkUser();
  displayIslamicDate();
  resetGoalsAtMidnight();
});
