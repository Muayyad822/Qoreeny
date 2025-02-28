# 🌙 Qoreeny: My Ramadan Buddy

This is a simple web app to help users track their Ramadan goals and stay motivated throughout the month. It allows users to add personal goals, choose from a list of recommended goal, track their completion, and receive notifications about their progress.

## Features

- **Goal Management**: Add, complete, and delete goals.
- **Persistent Storage**: Goals are saved in `localStorage`.
- **Daily Reset**: Goals reset automatically at midnight.
- **Recommended Tasks**: Users can choose from a list of suggested Ramadan tasks.
- **Theming**: Toggle between light and dark mode.
- **User Authentication**: Enter and save your name for a personalized experience.
- **Push Notifications**: Get updated notifications on your Ramadan goal progress.

## Usage

1. Enter your name to start tracking goals.
2. Add new goals manually or select from recommended tasks.
3. Mark goals as completed and receive progress notifications.
4. Change the theme using the theme toggle button.
5. Goals reset automatically at midnight.

### New Feature: Single Persistent Notification

- The app now ensures only **one** notification is shown at a time.
- When goals are updated, the previous notification is replaced with a new one.
- The notification includes:
  - ✅ Completed Goals
  - ⏳ Remaining Goals
- **Implementation Details:**
  - Uses a `tag: "ramadan-goals"` to replace existing notifications.
  - `renotify: true` ensures users are alerted again when the notification updates.

### Service Worker Updates

- Notifications will close when clicked.
- Ensures seamless tracking without cluttering the notification panel.

## Installation

1. Clone this repository:
   ```sh
   git clone https://github.com/your-repo/Qoreeny.git
   ```
2. Navigate into the project directory:
   ```sh
   cd Qoreeny
   ```
3. Open `index.html` in a browser.

## Contributing

Feel free to fork the repository and submit pull requests!

## License

MIT License
