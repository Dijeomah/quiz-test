
// Quiz categories with different question sets
const quizCategories = {
  general: {
    title: "General Knowledge",
    description: "Test your overall knowledge",
    questions: [
      {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
      },
      {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
      },
      {
        question: "Who painted the Mona Lisa?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
      },
      {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
      },
      {
        question: "In which year did World War II end?",
        answers: ["1943", "1944", "1945", "1946"],
        correct: 2
      },
      {
        question: "What is the chemical symbol for gold?",
        answers: ["Go", "Gd", "Au", "Ag"],
        correct: 2
      },
      {
        question: "What is the smallest country in the world?",
        answers: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
        correct: 1
      },
      {
        question: "How many continents are there?",
        answers: ["5", "6", "7", "8"],
        correct: 2
      },
      {
        question: "Which animal is the fastest on land?",
        answers: ["Lion", "Cheetah", "Leopard", "Tiger"],
        correct: 1
      },
      {
        question: "What is the tallest mountain in the world?",
        answers: ["K2", "Kilimanjaro", "Mount Everest", "Denali"],
        correct: 2
      }
    ]
  },
  science: {
    title: "Science & Technology",
    description: "Challenge your scientific mind",
    questions: [
      {
        question: "What is the speed of light?",
        answers: ["299,792,458 m/s", "150,000,000 m/s", "500,000,000 m/s", "1,000,000,000 m/s"],
        correct: 0
      },
      {
        question: "Which programming language is known as the 'language of the web'?",
        answers: ["Python", "JavaScript", "Java", "C++"],
        correct: 1
      },
      {
        question: "What is the powerhouse of the cell?",
        answers: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
        correct: 2
      },
      {
        question: "What does DNA stand for?",
        answers: ["Deoxyribonucleic Acid", "Dynamic Nuclear Acid", "Dual Nitrogen Acid", "Digital Natural Algorithm"],
        correct: 0
      },
      {
        question: "What is the atomic number of carbon?",
        answers: ["4", "6", "8", "12"],
        correct: 1
      },
      {
        question: "Who developed the theory of relativity?",
        answers: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Nikola Tesla"],
        correct: 1
      },
      {
        question: "What is the largest organ in the human body?",
        answers: ["Heart", "Brain", "Liver", "Skin"],
        correct: 3
      },
      {
        question: "What gas do plants absorb from the atmosphere?",
        answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correct: 2
      },
      {
        question: "What is the chemical formula for water?",
        answers: ["H2O", "CO2", "O2", "H2SO4"],
        correct: 0
      },
      {
        question: "How many planets are in our solar system?",
        answers: ["7", "8", "9", "10"],
        correct: 1
      }
    ]
  },
  history: {
    title: "History & Culture",
    description: "Journey through time",
    questions: [
      {
        question: "In which year did Christopher Columbus reach the Americas?",
        answers: ["1492", "1500", "1510", "1520"],
        correct: 0
      },
      {
        question: "Who was the first president of the United States?",
        answers: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
        correct: 1
      },
      {
        question: "Which ancient wonder of the world still exists today?",
        answers: ["Hanging Gardens of Babylon", "Great Pyramid of Giza", "Colossus of Rhodes", "Lighthouse of Alexandria"],
        correct: 1
      },
      {
        question: "The Great Wall of China was built to protect against invasions from which direction?",
        answers: ["South", "East", "North", "West"],
        correct: 2
      },
      {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correct: 1
      },
      {
        question: "In which year did the Titanic sink?",
        answers: ["1910", "1912", "1914", "1916"],
        correct: 1
      },
      {
        question: "Which empire was ruled by Julius Caesar?",
        answers: ["Greek Empire", "Roman Empire", "Persian Empire", "Ottoman Empire"],
        correct: 1
      },
      {
        question: "What was the primary language of ancient Rome?",
        answers: ["Greek", "Latin", "Italian", "French"],
        correct: 1
      },
      {
        question: "Who painted the Sistine Chapel ceiling?",
        answers: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
        correct: 2
      },
      {
        question: "Which country gifted the Statue of Liberty to the United States?",
        answers: ["England", "Spain", "France", "Italy"],
        correct: 2
      }
    ]
  },
  // NEW CUSTOM QUIZ CATEGORY
  custom: {
    title: "Custom Upload",
    description: "Upload your own JSON quiz",
    questions: [] // Initially empty
  }
};

// Game state
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let playerName = "";
let questions = [];
let selectedCategory = "general";
let isCustomQuizLoaded = false; // Track if a custom quiz has been successfully loaded

// Initialize game
function init() {
  try {
    displayQuizOptions();
  } catch (error) {
    showError("Failed to load quiz options. Please refresh the page.");
  }
}

// Display quiz category options
function displayQuizOptions() {
  const container = document.getElementById('quizOptions');
  container.innerHTML = '';

  Object.keys(quizCategories).forEach(key => {
    const category = quizCategories[key];
    const option = document.createElement('div');

    // Update custom quiz description if loaded
    if (key === 'custom' && isCustomQuizLoaded) {
      category.description = `Active: ${category.title}`;
    } else if (key === 'custom' && !isCustomQuizLoaded) {
      category.description = "Upload your own JSON quiz";
      category.title = "Custom Upload";
    }

    option.className = `quiz-option ${key === selectedCategory ? 'selected' : ''}`;
    option.onclick = () => selectQuizCategory(key);
    option.innerHTML = `
                    <div class="quiz-option-title">${category.title}</div>
                    <div class="quiz-option-desc">${category.description}</div>
                `;
    container.appendChild(option);
  });
}

// Select quiz category
function selectQuizCategory(categoryKey) {
  if (categoryKey === 'custom' && !isCustomQuizLoaded) {
    openUploadModal();
    return;
  }

  // If the user selects a custom quiz that is not loaded, it will open the modal.
  // If it IS loaded, it acts like a normal selection.
  selectedCategory = categoryKey;
  displayQuizOptions();
}

// --- New Modal/Upload Functions ---

function openUploadModal() {
  document.getElementById('uploadModalOverlay').classList.add('open');
}

function closeUploadModal() {
  document.getElementById('uploadModalOverlay').classList.remove('open');
}

function uploadCustomQuiz() {
  const jsonText = document.getElementById('jsonInput').value.trim();
  if (!jsonText) {
    showError("Please paste a JSON structure for the quiz.");
    return;
  }

  try {
    const customQuizData = JSON.parse(jsonText);

    // Basic validation of the JSON structure
    if (!customQuizData.title || !customQuizData.questions || !Array.isArray(customQuizData.questions) || customQuizData.questions.length === 0) {
      throw new Error("Invalid JSON structure. Must have 'title' and a non-empty 'questions' array.");
    }

    const isValid = customQuizData.questions.every(q =>
      q.question && Array.isArray(q.answers) && q.answers.length > 0 && typeof q.correct === 'number'
    );

    if (!isValid) {
      throw new Error("One or more questions are missing 'question', 'answers' array, or 'correct' index.");
    }


    // Load the validated data into the custom category
    quizCategories.custom.title = customQuizData.title;
    quizCategories.custom.description = customQuizData.description || "User uploaded quiz";
    quizCategories.custom.questions = customQuizData.questions;

    isCustomQuizLoaded = true;
    selectedCategory = 'custom';
    closeUploadModal();
    displayQuizOptions();
    showError(`Custom Quiz "${customQuizData.title}" loaded successfully!`);

  } catch (e) {
    showError(`Error loading custom quiz: ${e.message}`);
  }
}

// --- End New Modal/Upload Functions ---

// Load questions from selected category
function loadQuestions() {
  const category = quizCategories[selectedCategory];
  if (!category || !category.questions) {
    throw new Error("Invalid category selected");
  }

  if (category.questions.length === 0) {
    throw new Error("The selected quiz has no questions! Try selecting a different category or re-uploading the custom quiz.");
  }

  // Shuffle questions
  questions = [...category.questions].sort(() => Math.random() - 0.5);
}

// Show error message
function showError(message) {
  const errorElement = document.getElementById('errorMessage');
  errorElement.textContent = message;
  errorElement.classList.add('show');
  setTimeout(() => {
    errorElement.classList.remove('show');
  }, 5000);
}

// Start quiz
function startQuiz() {
  const nameInput = document.getElementById('playerName');
  playerName = nameInput.value.trim();

  if (!playerName) {
    showError("Please enter your name to start the quiz!");
    return;
  }

  if (selectedCategory === 'custom' && !isCustomQuizLoaded) {
    showError("Please upload a custom quiz or select a pre-defined category.");
    return;
  }


  try {
    loadQuestions();
  } catch (error) {
    showError(error.message);
    return;
  }

  currentQuestionIndex = 0;
  score = 0;

  showScreen('quizScreen');
  displayQuestion();
}

// Display question
function displayQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
    return;
  }

  const question = questions[currentQuestionIndex];

  if (!question || !question.answers) {
    showError("Question data is invalid. Skipping to next question.");
    currentQuestionIndex++;
    displayQuestion();
    return;
  }

  document.getElementById('questionNumber').textContent =
    `Question ${currentQuestionIndex + 1} of ${questions.length} (${quizCategories[selectedCategory].title})`;
  document.getElementById('questionText').textContent = question.question;
  document.getElementById('score').textContent = score;

  // Update progress bar
  const progress = ((currentQuestionIndex) / questions.length) * 100;
  document.getElementById('progressBar').style.width = progress + '%';

  // Display answers
  const answersContainer = document.getElementById('answersContainer');
  answersContainer.innerHTML = '';

  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer-btn';
    button.textContent = answer;
    button.onclick = () => selectAnswer(index);
    answersContainer.appendChild(button);
  });

  // Hide next button
  document.getElementById('nextBtn').classList.remove('show');

  // Start timer
  startTimer();
}

// Start timer
function startTimer() {
  timeLeft = 30;
  updateTimerDisplay();

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 10) {
      document.getElementById('timer').parentElement.classList.add('warning');
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000);
}

// Update timer display
function updateTimerDisplay() {
  document.getElementById('timer').textContent = timeLeft;
}

// Handle timeout
function handleTimeout() {
  const buttons = document.querySelectorAll('.answer-btn');
  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === questions[currentQuestionIndex].correct) {
      btn.classList.add('correct');
    }
  });

  document.getElementById('nextBtn').classList.add('show');
  document.getElementById('timer').parentElement.classList.remove('warning');
}

// Select answer
function selectAnswer(selectedIndex) {
  clearInterval(timer);

  const question = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll('.answer-btn');

  buttons.forEach((btn, index) => {
    btn.disabled = true;

    if (index === question.correct) {
      btn.classList.add('correct');
    }

    if (index === selectedIndex && selectedIndex !== question.correct) {
      btn.classList.add('incorrect');
    }
  });

  if (selectedIndex === question.correct) {
    score += 10 + Math.floor(timeLeft / 2); // Bonus points for time remaining
  }

  document.getElementById('score').textContent = score;
  document.getElementById('nextBtn').classList.add('show');
  document.getElementById('timer').parentElement.classList.remove('warning');
}

// Next question
function nextQuestion() {
  currentQuestionIndex++;
  displayQuestion();
}

// End quiz
function endQuiz() {
  clearInterval(timer);

  // Save score to leaderboard
  saveScore(playerName, score);

  // Display results
  document.getElementById('finalScore').textContent = `${score} points`;

  const maxPossibleScore = questions.length * (10 + Math.floor(30 / 2)); // Max possible score is 25 per question
  const percentage = (score / maxPossibleScore) * 100;
  let message = "";

  if (percentage >= 80) {
    message = "Outstanding! You're a quiz master!";
  } else if (percentage >= 60) {
    message = "Great job! You know your stuff!";
  } else if (percentage >= 40) {
    message = "Good effort! Keep learning!";
  } else {
    message = "Nice try! Practice makes perfect!";
  }

  document.getElementById('performanceMessage').textContent = message;

  // Display leaderboard
  displayLeaderboardOnResult();

  showScreen('resultScreen');
}

// Save score to leaderboard
function saveScore(name, points) {
  try {
    let leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard')) || [];

    leaderboard.push({
      name: name,
      score: points,
      date: new Date().toLocaleDateString()
    });

    // Sort by score (descending) and keep top 10
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10);

    localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
  } catch (error) {
    console.error('Failed to save score:', error);
  }
}

// Display leaderboard on result screen
function displayLeaderboardOnResult() {
  const leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard')) || [];
  const container = document.getElementById('leaderboardDisplay');

  if (leaderboard.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: #999;">No scores yet. Be the first!</p>';
    return;
  }

  let html = '<h3>Leaderboard</h3>';
  leaderboard.forEach((entry, index) => {
    // Logic to highlight the current player's score
    const isCurrentPlayer = entry.name === playerName && entry.score === score;
    html += `
                    <div class="leaderboard-entry ${isCurrentPlayer ? 'highlight' : ''}">
                        <span>${index + 1}. ${entry.name}</span>
                        <span>${entry.score} pts</span>
                    </div>
                `;
  });

  container.innerHTML = html;
}

// Show leaderboard from start screen
function showLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard')) || [];

  if (leaderboard.length === 0) {
    alert('No scores yet. Be the first to play!');
    return;
  }

  let message = 'TOP 10 LEADERBOARD\n\n';
  leaderboard.forEach((entry, index) => {
    message += `${index + 1}. ${entry.name} - ${entry.score} pts (${entry.date})\n`;
  });

  alert(message);
}

// Restart quiz
function restartQuiz() {
  loadQuestions();
  startQuiz();
}

// Go to start screen
function goToStart() {
  showScreen('startScreen');
  document.getElementById('playerName').value = '';

  // Reset custom quiz selection to general
  selectedCategory = 'general';
  displayQuizOptions();
}

// Show screen
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

// Initialize on page load
init();
