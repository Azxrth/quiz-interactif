console.log("Quiz JS loaded...");

const getElement = (selector) => document.querySelector(selector);
const showElement = (element) => (element.style.display = "");
const hideElement = (element) => (element.style.display = "none");
const setText = (element, text) => (element.textContent = text);

const createAnswerButton = (text, onClick) => {
  const btn = document.createElement("button");
  btn.classList.add("answer-btn");
  btn.textContent = text;
  btn.addEventListener("click", onClick);
  return btn;
};

const updateScoreDisplay = (scoreElement, score, total) => {
  scoreElement.textContent = `Votre score : ${score} / ${total}`;
};

const lockAnswers = (container) => {
  const buttons = container.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));
};

const markCorrectAnswer = (container, correctIndex) => {
  const buttons = container.querySelectorAll("button");
  if (buttons[correctIndex]) {
    buttons[correctIndex].classList.add("correct");
  }
};

const loadFromLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const startTimer = (duration, onTick, onComplete) => {
  let timeLeft = duration;
  const timerId = setInterval(() => {
    timeLeft--;
    onTick(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerId);
      onComplete();
    }
  }, 1000);
  return timerId;
};

const questions = [
  {
    text: "Quelle est la capitale de la France ?",
    answers: ["Marseille", "Paris", "Lyon", "Bordeaux"],
    correct: 1,
    timeLimit: 10,
  },
  {
    text: "Combien font 2 + 3 ?",
    answers: ["3", "4", "5", "1"],
    correct: 2,
    timeLimit: 5,
  },
  {
    text: "Quelle est la capitale de l'Italie ?",
    answers: ["Rome", "Milan", "Naples", "Venise"],
    correct: 0,
    timeLimit: 8,
  },
  {
    text: "Quelle planète est la plus grande du système solaire ?",
    answers: ["Jupiter", "Saturne", "Mars", "Vénus"],
    correct: 0,
    timeLimit: 10,
  },
  {
    text: "En quelle année l'homme a-t-il marché sur la Lune pour la première fois ?",
    answers: ["1969", "1959", "1975", "1981"],
    correct: 0,
    timeLimit: 12,
  },
  {
    text: "Quel est le symbole chimique de l'eau ?",
    answers: ["H2O", "O2", "CO2", "NaCl"],
    correct: 0,
    timeLimit: 6,
  },
  {
    text: "Qui a écrit \"Les Misérables\" ?",
    answers: [
      "Victor Hugo",
      "Émile Zola",
      "Alexandre Dumas",
      "Gustave Flaubert",
    ],
    correct: 0,
    timeLimit: 10,
  },
  {
    text: "Quel est le plus long fleuve du monde ?",
    answers: ["Nil", "Amazone", "Yangtsé", "Mississippi"],
    correct: 0,
    timeLimit: 9,
  },
  {
    text: "Dans quel continent se trouve le Sahara ?",
    answers: ["Afrique", "Asie", "Amérique", "Europe"],
    correct: 0,
    timeLimit: 7,
  },
  {
    text: "Quelle est la monnaie du Japon ?",
    answers: ["Yen", "Won", "Yuan", "Rouble"],
    correct: 0,
    timeLimit: 7,
  },
  {
    text: "Combien y a-t-il de continents sur Terre ?",
    answers: ["7", "5", "6", "8"],
    correct: 0,
    timeLimit: 6,
  },
  {
    text: "Qui a peint la Joconde ?",
    answers: ["Léonard de Vinci", "Michel-Ange", "Raphaël", "Donatello"],
    correct: 0,
    timeLimit: 10,
  },
  {
    text: "Quelle est la plus haute montagne du monde ?",
    answers: ["Everest", "K2", "Kilimandjaro", "Mont Blanc"],
    correct: 0,
    timeLimit: 9,
  },
  {
    text: "Quel organe pompe le sang dans le corps humain ?",
    answers: ["Le cœur", "Le foie", "Les poumons", "Le rein"],
    correct: 0,
    timeLimit: 7,
  },
  {
    text: "Quel pays a pour capitale Canberra ?",
    answers: ["Australie", "Nouvelle-Zélande", "Canada", "Afrique du Sud"],
    correct: 0,
    timeLimit: 8,
  },
  {
    text: "Quel est le plus grand océan ?",
    answers: ["Pacifique", "Atlantique", "Indien", "Arctique"],
    correct: 0,
    timeLimit: 8,
  },
  {
    text: "Combien de secondes y a-t-il dans une minute ?",
    answers: ["60", "90", "45", "100"],
    correct: 0,
    timeLimit: 5,
  },
  {
    text: "Quel instrument mesure la température ?",
    answers: ["Thermomètre", "Baromètre", "Hygromètre", "Altimètre"],
    correct: 0,
    timeLimit: 7,
  },
  {
    text: "Quelle langue est la plus parlée au monde (locuteurs natifs) ?",
    answers: ["Mandarin", "Anglais", "Espagnol", "Hindi"],
    correct: 0,
    timeLimit: 10,
  },
  {
    text: "Quel est l'astre au centre du système solaire ?",
    answers: ["Le Soleil", "La Terre", "La Lune", "Mars"],
    correct: 0,
    timeLimit: 6,
  },
  {
    text: "Dans quel pays se trouve la ville de Rio de Janeiro ?",
    answers: ["Brésil", "Argentine", "Portugal", "Mexique"],
    correct: 0,
    timeLimit: 8,
  },
  {
    text: "Quel est le plus petit des continents ?",
    answers: ["Océanie", "Europe", "Antarctique", "Amérique du Sud"],
    correct: 0,
    timeLimit: 9,
  },
];

const TIME_TRIAL_DURATION = 150;

let currentQuestionIndex = 0;
let score = 0;
let bestScore = loadFromLocalStorage("bestScore", 0);
let questionTimerId = null;
let globalTimerId = null;
let globalTimeLeft = 0;
let isTimeTrial = false;

// DOM Elements
const introScreen = getElement("#intro-screen");
const questionScreen = getElement("#question-screen");
const resultScreen = getElement("#result-screen");

const bestScoreValue = getElement("#best-score-value");
const bestScoreEnd = getElement("#best-score-end");

const questionText = getElement("#question-text");
const answersDiv = getElement("#answers");
const nextBtn = getElement("#next-btn");
const startBtn = getElement("#start-btn");
const restartBtn = getElement("#restart-btn");
const timeTrialToggle = getElement("#time-trial-toggle");
const timeTrialDurationInput = getElement("#time-trial-duration");
const timerDiv = getElement("#timer-div");
const globalTimerDiv = getElement("#global-timer-div");
const globalTimeLeftSpan = getElement("#global-time-left");
const progressFill = getElement("#progress-fill");

const scoreText = getElement("#score-text");
const timeLeftSpan = getElement("#time-left");

const currentQuestionIndexSpan = getElement("#current-question-index");
const totalQuestionsSpan = getElement("#total-questions");

// Init
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

setText(bestScoreValue, bestScore);

const clearTimers = () => {
  clearInterval(questionTimerId);
  clearInterval(globalTimerId);
  questionTimerId = null;
  globalTimerId = null;
};

const updateProgressBar = () => {
  if (!progressFill) {
    return;
  }
  const total = questions.length;
  const current = Math.min(currentQuestionIndex + 1, total);
  const percent = total ? Math.round((current / total) * 100) : 0;
  progressFill.style.width = `${percent}%`;
};

const getTimeTrialDuration = () => {
  if (!timeTrialDurationInput) {
    return TIME_TRIAL_DURATION;
  }
  const rawValue = parseInt(timeTrialDurationInput.value, 10);
  if (!Number.isFinite(rawValue) || rawValue <= 0) {
    return TIME_TRIAL_DURATION;
  }
  return rawValue;
};

function startQuiz() {
  hideElement(introScreen);
  showElement(questionScreen);

  clearTimers();
  currentQuestionIndex = 0;
  score = 0;
  isTimeTrial = timeTrialToggle ? timeTrialToggle.checked : false;

  setText(totalQuestionsSpan, questions.length);

  if (isTimeTrial) {
    globalTimeLeft = getTimeTrialDuration();
    setText(globalTimeLeftSpan, globalTimeLeft);
    showElement(globalTimerDiv);
    hideElement(timerDiv);
    globalTimerId = startTimer(
      globalTimeLeft,
      (timeLeft) => {
        globalTimeLeft = timeLeft;
        setText(globalTimeLeftSpan, timeLeft);
      },
      () => {
        lockAnswers(answersDiv);
        endQuiz();
      }
    );
  } else {
    hideElement(globalTimerDiv);
    showElement(timerDiv);
  }

  showQuestion();
}

function showQuestion() {
  clearInterval(questionTimerId);

  const q = questions[currentQuestionIndex];
  setText(questionText, q.text);
  setText(currentQuestionIndexSpan, currentQuestionIndex + 1);
  updateProgressBar();

  answersDiv.innerHTML = "";
  q.answers.forEach((answer, index) => {
    const btn = createAnswerButton(answer, () => selectAnswer(index, btn));
    answersDiv.appendChild(btn);
  });

  nextBtn.classList.add("hidden");

  if (isTimeTrial) {
    return;
  }

  setText(timeLeftSpan, q.timeLimit);
  questionTimerId = startTimer(
    q.timeLimit,
    (timeLeft) => setText(timeLeftSpan, timeLeft),
    () => {
      lockAnswers(answersDiv);
      nextBtn.classList.remove("hidden");
    }
  );
}

function selectAnswer(index, btn) {
  clearInterval(questionTimerId);

  const q = questions[currentQuestionIndex];
  if (index === q.correct) {
    score++;
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
  }

  markCorrectAnswer(answersDiv, q.correct);
  lockAnswers(answersDiv);
  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearTimers();
  hideElement(questionScreen);
  showElement(resultScreen);

  updateScoreDisplay(scoreText, score, questions.length);

  if (score > bestScore) {
    bestScore = score;
    saveToLocalStorage("bestScore", bestScore);
  }
  setText(bestScoreEnd, bestScore);
}

function restartQuiz() {
  clearTimers();
  hideElement(resultScreen);
  showElement(introScreen);

  setText(bestScoreValue, bestScore);
}
