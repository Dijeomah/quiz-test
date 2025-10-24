# Dynamic Quiz Game: General, Science, History, and Custom Quizzes

This is a dynamic, front-end-only quiz application built with HTML, CSS, and vanilla JavaScript. It offers multiple built-in quiz categories and an exciting feature that allows users to **upload their own quiz questions** using a simple JSON structure.

The game is timed, scores are calculated based on speed and correctness, and results are saved to a local leaderboard.

---

## How to Play

### 1. Getting Started

1.  **Enter Your Name:** Type your name into the **"Your Name"** input field. This name will be saved to the leaderboard upon quiz completion.
2.  **Select a Category:** Choose from one of the three built-in categories (General Knowledge, Science & Technology, History & Culture) or select **"Custom Upload"** to load your own questions.
3.  **Start Quiz:** Click the **"Start Quiz"** button.

### 2. Answering Questions

* **Time Limit:** You have **30 seconds** to answer each question. The timer is displayed in the top right and will turn red and pulse when under 10 seconds.
* **Answering:** Click on one of the four answer buttons below the question text.
* **Scoring:**
  * A **correct answer** earns **10 base points** plus a time bonus (up to 15 points if answered instantly).
  * An **incorrect answer** or **timeout** earns **0 points**.
* **Feedback:** After a selection, the correct answer turns **green** and an incorrect choice turns **red**.
* **Next Question:** Click the **"Next Question"** button to proceed. The progress bar at the top tracks your overall progress.

### 3. Viewing Results

* The quiz ends when you have answered all questions.
* The **Result Screen** will display your **Final Score**, a **Performance Message** based on your percentage, and the updated local **Leaderboard**.
* Use the **"Play Again"** button to restart with the currently selected quiz or **"Main Menu"** to return to the category selection screen.

---

## Key Features

### 1. Custom Quiz Upload (The JSON Feature)

This feature allows you to dynamically load your own quiz content using a simple JSON text input.

#### How to Upload

1.  On the **Start Screen**, select the **"Custom Upload"** quiz option.
2.  A modal will appear. Paste your complete quiz JSON into the text area.
3.  Click **"Load Quiz"**.
4.  If successful, the Custom Upload title will update to your quiz's title, and you can now start the quiz!

#### Required JSON Structure

Your JSON must be a single object containing a `title` (string) and a `questions` array.

| Property      | Type   | Description                                                                                                                                                                                           |
| :------------ | :----- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | String | The name of your custom quiz.                                                                                                                                                                         |
| `description` | String | (Optional) A brief descriptor for the category card.                                                                                                                                                  |
| `questions`   | Array  | An array of question objects.                                                                                                                                                                         |
| **(Inside Array)** | | |
| `question`    | String | The text of the question.                                                                                                                                                                             |
| `answers`     | Array  | An array of strings representing the four answer choices.                                                                                                                                             |
| `correct`     | Number | The **zero-based index** of the correct answer in the `answers` array (e.g., `0` for the first answer, `3` for the last answer). **Crucial for scoring.** |

#### Test JSON Example:

You can copy and paste this structure to test the feature:
```json
{
  "title": "My Custom Quiz",
  "description": "Questions uploaded by me!",
  "questions": [
    {
      "question": "Which programming language is this game written in?",
      "answers": ["Python", "Java", "JavaScript", "C#"],
      "correct": 2
    },
    {
      "question": "How many seconds do you have to answer each question?",
      "answers": ["10", "15", "30", "60"],
      "correct": 2
    },
    {
      "question": "What CSS property centers content?",
      "answers": ["float", "display: flex", "margin-left: auto", "transform: center"],
      "correct": 1
    }
  ]
}
```
### 2. Leaderboard
* Persistence: Scores are automatically saved to the local leaderboard using your browser's localStorage, allowing scores to remain even after the browser is closed and reopened.
* Access: You can view the Top 10 leaderboard by clicking "View Leaderboard" on the main menu, or view the highlighted ranking on the Result Screen after finishing a game.

#### Technical Stack
* HTML: Structure
* CSS: Styling and responsive design
* JavaScript: Game logic, scoring, DOM manipulation, timing, and local data persistence.


This application is a fully contained, client-side project.
