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
  // Questions faciles
  {
    text: "Quelle est la capitale de la France ?",
    answers: ["Marseille", "Paris", "Lyon", "Bordeaux"],
    correct: 1,
    timeLimit: 10,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-01.mp3",
  },
  {
    text: "Combien font 2 + 3 ?",
    answers: ["3", "4", "5", "1"],
    correct: 2,
    timeLimit: 5,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-02.mp3",
  },
  {
    text: "Quelle est la capitale de l'Italie ?",
    answers: ["Rome", "Milan", "Naples", "Venise"],
    correct: 0,
    timeLimit: 8,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-03.mp3",
  },
  {
    text: "Quelle planète est la plus grande du système solaire ?",
    answers: ["Jupiter", "Saturne", "Mars", "Vénus"],
    correct: 0,
    timeLimit: 10,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-04.mp3",
  },
  {
    text: "Quel est le symbole chimique de l'eau ?",
    answers: ["H2O", "O2", "CO2", "NaCl"],
    correct: 0,
    timeLimit: 6,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-05.mp3",
  },
  {
    text: "Dans quel continent se trouve le Sahara ?",
    answers: ["Afrique", "Asie", "Amérique", "Europe"],
    correct: 0,
    timeLimit: 7,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-06.mp3",
  },
  {
    text: "Quelle est la monnaie du Japon ?",
    answers: ["Yen", "Won", "Yuan", "Rouble"],
    correct: 0,
    timeLimit: 7,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-07.mp3",
  },
  {
    text: "Combien y a-t-il de continents sur Terre ?",
    answers: ["7", "5", "6", "8"],
    correct: 0,
    timeLimit: 6,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-08.mp3",
  },
  {
    text: "Qui a peint la Joconde ?",
    answers: ["Léonard de Vinci", "Michel-Ange", "Raphaël", "Donatello"],
    correct: 0,
    timeLimit: 10,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-09.mp3",
  },
  {
    text: "Quelle est la plus haute montagne du monde ?",
    answers: ["Everest", "K2", "Kilimandjaro", "Mont Blanc"],
    correct: 0,
    timeLimit: 9,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-10.mp3",
  },
  {
    text: "Quel organe pompe le sang dans le corps humain ?",
    answers: ["Le cœur", "Le foie", "Les poumons", "Le rein"],
    correct: 0,
    timeLimit: 7,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-11.mp3",
  },
  {
    text: "Quel est le plus grand océan ?",
    answers: ["Pacifique", "Atlantique", "Indien", "Arctique"],
    correct: 0,
    timeLimit: 8,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-12.mp3",
  },
  {
    text: "Combien de secondes y a-t-il dans une minute ?",
    answers: ["60", "90", "45", "100"],
    correct: 0,
    timeLimit: 5,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-13.mp3",
  },
  {
    text: "Quel instrument mesure la température ?",
    answers: ["Thermomètre", "Baromètre", "Hygromètre", "Altimètre"],
    correct: 0,
    timeLimit: 7,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-14.mp3",
  },
  {
    text: "Quel est l'astre au centre du système solaire ?",
    answers: ["Le Soleil", "La Terre", "La Lune", "Mars"],
    correct: 0,
    timeLimit: 6,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-15.mp3",
  },
  {
    text: "Dans quel pays se trouve la ville de Rio de Janeiro ?",
    answers: ["Brésil", "Argentine", "Portugal", "Mexique"],
    correct: 0,
    timeLimit: 8,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-16.mp3",
  },
  {
    text: "Quelle est la capitale du Canada ?",
    answers: ["Ottawa", "Toronto", "Vancouver", "Montréal"],
    correct: 0,
    timeLimit: 8,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-17.mp3",
  },
  {
    text: "Quelle est la capitale de l'Espagne ?",
    answers: ["Madrid", "Barcelone", "Valence", "Séville"],
    correct: 0,
    timeLimit: 7,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-18.mp3",
  },
  {
    text: "Combien de côtés a un hexagone ?",
    answers: ["6", "5", "8", "7"],
    correct: 0,
    timeLimit: 6,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-19.mp3",
  },
  {
    text: "Quel est le plus grand mammifère ?",
    answers: ["Baleine bleue", "Éléphant d'Afrique", "Giraffe", "Hippopotame"],
    correct: 0,
    timeLimit: 8,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-20.mp3",
  },
  {
    text: "Quel gaz les plantes absorbent-elles principalement ?",
    answers: ["Dioxyde de carbone", "Oxygène", "Azote", "Hydrogène"],
    correct: 0,
    timeLimit: 8,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-21.mp3",
  },
  {
    text: "Quel est le symbole chimique du fer ?",
    answers: ["Fe", "Fi", "Ir", "Fr"],
    correct: 0,
    timeLimit: 7,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-22.mp3",
  },
  {
    text: "Combien de joueurs composent une équipe de football sur le terrain ?",
    answers: ["11", "10", "9", "12"],
    correct: 0,
    timeLimit: 7,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-23.mp3",
  },
  {
    text: "Quel pays est aussi appelé le pays du Soleil-Levant ?",
    answers: ["Japon", "Chine", "Corée du Sud", "Thaïlande"],
    correct: 0,
    timeLimit: 7,
    difficulty: "easy",
    audioSrc: "../assets/audio/question-24.mp3",
  },
  // Questions intermédiaires
  {
    text: "En quelle année l'homme a-t-il marché sur la Lune pour la première fois ?",
    answers: ["1969", "1959", "1975", "1981"],
    correct: 0,
    timeLimit: 12,
    difficulty: "medium",
    audioSrc: "../assets/audio/question-25.mp3",
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
    difficulty: "medium",
    audioSrc: "../assets/audio/question-26.mp3",
  },
  {
    text: "Quel est le plus long fleuve du monde ?",
    answers: ["Nil", "Amazone", "Yangtsé", "Mississippi"],
    correct: 0,
    timeLimit: 9,
    difficulty: "medium",
    audioSrc: "../assets/audio/question-27.mp3",
  },
  {
    text: "Quel pays a pour capitale Canberra ?",
    answers: ["Australie", "Nouvelle-Zélande", "Canada", "Afrique du Sud"],
    correct: 0,
    timeLimit: 8,
    difficulty: "medium",
    audioSrc: "../assets/audio/question-28.mp3",
  },
  {
    text: "Quelle langue est la plus parlée au monde (locuteurs natifs) ?",
    answers: ["Mandarin", "Anglais", "Espagnol", "Hindi"],
    correct: 0,
    timeLimit: 10,
    difficulty: "medium",
    audioSrc: "../assets/audio/question-29.mp3",
  },
  {
    text: "Quel est le plus petit des continents ?",
    answers: ["Océanie", "Europe", "Antarctique", "Amérique du Sud"],
    correct: 0,
    timeLimit: 9,
    difficulty: "medium",
    audioSrc: "../assets/audio/question-30.mp3",
  },
  {
    text: "Quelle est la capitale de la Turquie ?",
    answers: ["Ankara", "Istanbul", "Izmir", "Bursa"],
    correct: 0,
    timeLimit: 9,
    difficulty: "medium",
    audioSrc: "../assets/audio/question-31.mp3",
  },
  {
    text: "Quelle est la capitale du Brésil ?",
    answers: ["Brasilia", "Rio de Janeiro", "São Paulo", "Salvador"],
    correct: 0,
    timeLimit: 9,
    difficulty: "medium",
    audioSrc: "../assets/audio/question-32.mp3",
  },
  {
    text: "Quel est le plus long os du corps humain ?",
    answers: ["Fémur", "Tibia", "Humérus", "Radius"],
    correct: 0,
    timeLimit: 9,
    difficulty: "medium",
    audioSrc: "../assets/audio/question-33.mp3",
  },
  {
    text: "Dans quel océan se trouve Madagascar ?",
    answers: ["Indien", "Atlantique", "Pacifique", "Arctique"],
    correct: 0,
    timeLimit: 9,
    difficulty: "medium",
    audioSrc: "../assets/audio/question-34.mp3",
  },
  {
    text: "En quelle année a commencé la Première Guerre mondiale ?",
    answers: ["1914", "1939", "1929", "1918"],
    correct: 0,
    timeLimit: 10,
    difficulty: "medium",
    audioSrc: "../assets/audio/question-35.mp3",
  },
  {
    text: "Quel est le principal composant de l'air ?",
    answers: ["Azote", "Oxygène", "Dioxyde de carbone", "Argon"],
    correct: 0,
    timeLimit: 10,
    difficulty: "medium",
    audioSrc: "../assets/audio/question-36.mp3",
  },
  {
    text: "Quel est le symbole chimique de l'or ?",
    answers: ["Au", "Ag", "O", "Gd"],
    correct: 0,
    timeLimit: 8,
    difficulty: "medium",
    audioSrc: "../assets/audio/question-37.mp3",
  },
  {
    text: "Qui a peint \"La Nuit étoilée\" ?",
    answers: ["Vincent van Gogh", "Claude Monet", "Pablo Picasso", "Salvador Dalí"],
    correct: 0,
    timeLimit: 10,
    difficulty: "medium",
    audioSrc: "../assets/audio/question-38.mp3",
  },
  // Questions difficiles
  {
    text: "Combien de chromosomes possède l'être humain ?",
    answers: ["46", "23", "44", "48"],
    correct: 0,
    timeLimit: 12,
    difficulty: "hard",
    audioSrc: "../assets/audio/question-39.mp3",
  },
  {
    text: "Quel courant océanique chaud influence le climat de l'Europe de l'Ouest ?",
    answers: ["Gulf Stream", "El Niño", "Kuroshio", "Labrador"],
    correct: 0,
    timeLimit: 13,
    difficulty: "hard",
    audioSrc: "../assets/audio/question-40.mp3",
  },
  {
    text: "Quelle est la plus grande lune de Saturne ?",
    answers: ["Titan", "Europe", "Ganymède", "Callisto"],
    correct: 0,
    timeLimit: 12,
    difficulty: "hard",
    audioSrc: "../assets/audio/question-41.mp3",
  },
  {
    text: "Quelle est la distance moyenne entre la Terre et le Soleil ?",
    answers: [
      "150 millions de km",
      "15 millions de km",
      "1,5 million de km",
      "300 millions de km",
    ],
    correct: 0,
    timeLimit: 14,
    difficulty: "hard",
    audioSrc: "../assets/audio/question-42.mp3",
  },
];

const difficultyOrder = {
  easy: 0,
  medium: 1,
  hard: 2,
};

const getDifficultyRank = (difficulty) =>
  difficultyOrder[difficulty] ?? difficultyOrder.medium;

// Fonction pour mélanger les questions (Fisher-Yates shuffle)
const shuffleQuestions = (questionsArray) => {
  const shuffled = [...questionsArray];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Fonction pour mélanger les réponses d'une question tout en ajustant l'indice correct
const shuffleAnswers = (question) => {
  const answerIndices = Array.from({ length: question.answers.length }, (_, i) => i);
  const shuffledIndices = [...answerIndices];
  
  // Mélanger les indices des réponses
  for (let i = shuffledIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
  }
  
  // Créer un mapping ancien indice -> nouvel indice
  const indexMapping = {};
  shuffledIndices.forEach((oldIndex, newIndex) => {
    indexMapping[oldIndex] = newIndex;
  });
  
  // Créer une copie de la question avec les réponses mélangées
  const shuffledAnswers = shuffledIndices.map(oldIndex => question.answers[oldIndex]);
  const newCorrectIndex = indexMapping[question.correct];
  
  return {
    ...question,
    answers: shuffledAnswers,
    correct: newCorrectIndex
  };
};

const buildProgressiveQuestions = () => {
  const sorted = questions
    .map((question, index) => ({ ...question, _index: index }))
    .sort((a, b) => {
      const diff =
        getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty);
      return diff || a._index - b._index;
    })
    .map(({ _index, ...question }) => question);
  
  // Mélanger les questions au début de chaque quiz
  const shuffledQuestions = shuffleQuestions(sorted);
  
  // Mélanger les réponses pour chaque question
  return shuffledQuestions.map(question => shuffleAnswers(question));
};

const TIME_TRIAL_DURATION = 240;
const AUDIO_BASE_PATH = "../assets/audio";
const USE_SPEECH_ONLY = true;

let activeQuestions = buildProgressiveQuestions();
let questionStats = new Array(activeQuestions.length).fill(null);
let questionStartTime = null;
let audioStatusMessage = "";
let audioAvailable = false;
let audioFallbackText = "";
let audioSourceForQuestion = "";
let isAudioPlaying = false;
let speechUtterance = null;
let speechVoices = [];
let preferredVoice = null;
const audioPlayer = new Audio();
audioPlayer.preload = "auto";
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
const playAudioBtn = getElement("#play-audio-btn");
const audioStatus = getElement("#audio-status");
const statsScreen = getElement("#stats-screen");
const statsCorrect = getElement("#stats-correct");
const statsWrong = getElement("#stats-wrong");
const statsAverageTime = getElement("#stats-average-time");
const statsList = getElement("#stats-list");

const scoreText = getElement("#score-text");
const timeLeftSpan = getElement("#time-left");

const currentQuestionIndexSpan = getElement("#current-question-index");
const totalQuestionsSpan = getElement("#total-questions");

// Init
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);
if (playAudioBtn) {
  playAudioBtn.addEventListener("click", toggleAudioPlayback);
}

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
  const total = activeQuestions.length;
  const current = Math.min(currentQuestionIndex + 1, total);
  const percent = total ? Math.round((current / total) * 100) : 0;
  progressFill.style.width = `${percent}%`;
};

const difficultyLabels = {
  easy: "Facile",
  medium: "Moyen",
  hard: "Difficile",
};

const formatSeconds = (value) => {
  if (!Number.isFinite(value)) {
    return "0s";
  }
  return `${value.toFixed(1)} s`;
};

const hasSpeechSupport = () =>
  "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

const pickPreferredVoice = (voices) => {
  if (!voices.length) {
    return null;
  }
  return (
    voices.find(
      (voice) =>
        voice.lang.toLowerCase().startsWith("fr") && voice.localService
    ) ||
    voices.find((voice) => voice.lang.toLowerCase().startsWith("fr")) ||
    voices.find((voice) => voice.localService) ||
    voices[0]
  );
};

const loadSpeechVoices = () => {
  if (!hasSpeechSupport()) {
    speechVoices = [];
    preferredVoice = null;
    return;
  }
  const voices = window.speechSynthesis.getVoices();
  speechVoices = Array.isArray(voices) ? voices : [];
  preferredVoice = pickPreferredVoice(speechVoices);
};

const updateAudioUI = ({ playing, available, status }) => {
  if (typeof available === "boolean") {
    audioAvailable = available;
  }
  if (typeof status === "string") {
    audioStatusMessage = status;
  }
  if (typeof playing === "boolean") {
    isAudioPlaying = playing;
  }
  if (!playAudioBtn) {
    return;
  }
  playAudioBtn.disabled = !audioAvailable;
  playAudioBtn.classList.toggle("is-playing", Boolean(playing));
  playAudioBtn.textContent = isAudioPlaying ? "Lecture en cours" : "Lecture";
  if (audioStatus) {
    setText(audioStatus, audioStatusMessage);
  }
};

const stopAudio = ({ showStatus } = { showStatus: false }) => {
  if (!audioPlayer.paused) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }
  if (hasSpeechSupport()) {
    window.speechSynthesis.cancel();
  }
  if (showStatus) {
    updateAudioUI({ playing: false, status: "Lecture arrêtée" });
  } else {
    isAudioPlaying = false;
  }
};

const getAudioSource = (question, index) => {
  if (USE_SPEECH_ONLY) {
    return null;
  }
  if (question && question.audioSrc) {
    return question.audioSrc;
  }
  const safeIndex = Number.isFinite(index) ? index : 0;
  return `${AUDIO_BASE_PATH}/question-${String(safeIndex + 1).padStart(
    2,
    "0"
  )}.mp3`;
};

const speakQuestion = (text) => {
  if (!hasSpeechSupport()) {
    updateAudioUI({ playing: false, status: "Audio indisponible" });
    return;
  }
  const speakNow = () => {
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();
    speechUtterance = new SpeechSynthesisUtterance(text);
    speechUtterance.lang = "fr-FR";
    if (!speechVoices.length) {
      loadSpeechVoices();
    }
    if (preferredVoice) {
      speechUtterance.voice = preferredVoice;
    }
    speechUtterance.rate = 1;
    speechUtterance.pitch = 1;
    speechUtterance.volume = 1;
    speechUtterance.onstart = () => {
      updateAudioUI({ playing: true, status: "Lecture en cours" });
    };
    speechUtterance.onend = () => {
      updateAudioUI({ playing: false, status: "Audio prêt" });
    };
    speechUtterance.onerror = () => {
      updateAudioUI({ playing: false, status: "Audio indisponible" });
    };
    window.speechSynthesis.speak(speechUtterance);
    setTimeout(() => {
      if (!window.speechSynthesis.speaking) {
        window.speechSynthesis.speak(speechUtterance);
      }
    }, 200);
    updateAudioUI({ playing: true, status: "Synthèse vocale" });
  };

  if (!speechVoices.length) {
    loadSpeechVoices();
  }
  if (!preferredVoice && speechVoices.length) {
    preferredVoice = pickPreferredVoice(speechVoices);
  }
  if (!speechVoices.length) {
    updateAudioUI({ playing: false, status: "Chargement des voix..." });
    window.speechSynthesis.onvoiceschanged = () => {
      loadSpeechVoices();
      preferredVoice = pickPreferredVoice(speechVoices);
      speakNow();
    };
    return;
  }
  speakNow();
};

const playAudioFile = async (src, fallbackText) => {
  audioFallbackText = fallbackText;
  if (audioPlayer.src !== src) {
    audioPlayer.src = src;
  }
  try {
    await audioPlayer.play();
    updateAudioUI({ playing: true, status: "Lecture en cours" });
  } catch (error) {
    if (hasSpeechSupport()) {
      speakQuestion(fallbackText);
    } else {
      updateAudioUI({ playing: false, status: "Audio introuvable" });
    }
  }
};

const prepareAudioForQuestion = () => {
  stopAudio();
  const q = activeQuestions[currentQuestionIndex];
  if (!q) {
    updateAudioUI({ playing: false, available: false, status: "" });
    return;
  }
  if (USE_SPEECH_ONLY) {
    const speechAvailable = hasSpeechSupport();
    updateAudioUI({
      playing: false,
      available: speechAvailable,
      status: speechAvailable
        ? "Synthèse vocale prête"
        : "Synthèse vocale indisponible",
    });
    return;
  }
  const src = getAudioSource(q, currentQuestionIndex);
  audioSourceForQuestion = src;
  audioFallbackText = q.text;
  if (src) {
    updateAudioUI({ playing: false, available: true, status: "Audio prêt" });
  } else if (hasSpeechSupport()) {
    updateAudioUI({
      playing: false,
      available: true,
      status: "Synthèse vocale disponible",
    });
  } else {
    updateAudioUI({
      playing: false,
      available: false,
      status: "Audio indisponible",
    });
  }
};

function toggleAudioPlayback() {
  if (!playAudioBtn) {
    return;
  }
  if (isAudioPlaying) {
    stopAudio({ showStatus: true });
    return;
  }
  const q = activeQuestions[currentQuestionIndex];
  if (!q) {
    return;
  }
  if (USE_SPEECH_ONLY) {
    if (hasSpeechSupport()) {
      speakQuestion(q.text);
    } else {
      updateAudioUI({ playing: false, status: "Synthèse vocale indisponible" });
    }
    return;
  }
  const src = getAudioSource(q, currentQuestionIndex);
  if (src) {
    playAudioFile(src, q.text);
  } else if (hasSpeechSupport()) {
    speakQuestion(q.text);
  } else {
    updateAudioUI({ playing: false, status: "Audio indisponible" });
  }
}

audioPlayer.addEventListener("ended", () => {
  updateAudioUI({ playing: false, status: "Audio prêt" });
});

audioPlayer.addEventListener("error", () => {
  if (hasSpeechSupport() && audioFallbackText) {
    speakQuestion(audioFallbackText);
  } else {
    updateAudioUI({ playing: false, status: "Audio introuvable" });
  }
});

if (hasSpeechSupport()) {
  loadSpeechVoices();
  window.speechSynthesis.onvoiceschanged = loadSpeechVoices;
}

const resetStats = () => {
  questionStats = new Array(activeQuestions.length).fill(null);
  questionStartTime = null;
  if (statsList) {
    statsList.innerHTML = "";
  }
  if (statsCorrect) {
    setText(statsCorrect, "0");
  }
  if (statsWrong) {
    setText(statsWrong, "0");
  }
  if (statsAverageTime) {
    setText(statsAverageTime, "0s");
  }
};

const recordQuestionStats = ({ isCorrect, timedOut }) => {
  if (questionStats[currentQuestionIndex]) {
    return;
  }
  const q = activeQuestions[currentQuestionIndex];
  if (!q) {
    return;
  }
  const now = Date.now();
  const timeSpent = questionStartTime ? (now - questionStartTime) / 1000 : 0;
  questionStats[currentQuestionIndex] = {
    text: q.text,
    difficulty: q.difficulty,
    isCorrect: Boolean(isCorrect) && !timedOut,
    timedOut: Boolean(timedOut),
    timeSpent,
  };
};

const renderStats = () => {
  if (!statsList) {
    return;
  }
  const entries = questionStats.filter(Boolean);
  const correctCount = entries.filter((entry) => entry.isCorrect).length;
  const wrongCount = entries.length - correctCount;
  const averageTime = entries.length
    ? entries.reduce((sum, entry) => sum + entry.timeSpent, 0) / entries.length
    : 0;

  setText(statsCorrect, correctCount.toString());
  setText(statsWrong, wrongCount.toString());
  setText(statsAverageTime, formatSeconds(averageTime));

  statsList.innerHTML = "";
  entries.forEach((entry, index) => {
    const item = document.createElement("div");
    item.classList.add("stats-item");

    const title = document.createElement("div");
    title.classList.add("stats-question");
    title.textContent = `${index + 1}. ${entry.text}`;

    const meta = document.createElement("div");
    meta.classList.add("stats-meta");

    const difficultyBadge = document.createElement("span");
    difficultyBadge.classList.add(
      "stats-badge",
      `stats-badge--${entry.difficulty || "medium"}`
    );
    difficultyBadge.textContent =
      difficultyLabels[entry.difficulty] || "Moyen";

    const statusBadge = document.createElement("span");
    if (entry.timedOut) {
      statusBadge.classList.add("stats-badge", "stats-badge--timeout");
      statusBadge.textContent = "Temps écoulé";
    } else if (entry.isCorrect) {
      statusBadge.classList.add("stats-badge", "stats-badge--good");
      statusBadge.textContent = "Bonne réponse";
    } else {
      statusBadge.classList.add("stats-badge", "stats-badge--bad");
      statusBadge.textContent = "Mauvaise réponse";
    }

    const timeBadge = document.createElement("span");
    timeBadge.classList.add("stats-time");
    timeBadge.textContent = formatSeconds(entry.timeSpent);

    meta.append(difficultyBadge, statusBadge, timeBadge);
    item.append(title, meta);
    statsList.appendChild(item);
  });
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
  if (statsScreen) {
    hideElement(statsScreen);
  }

  clearTimers();
  activeQuestions = buildProgressiveQuestions();
  resetStats();
  currentQuestionIndex = 0;
  score = 0;
  isTimeTrial = timeTrialToggle ? timeTrialToggle.checked : false;

  setText(totalQuestionsSpan, activeQuestions.length);

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
        recordQuestionStats({ isCorrect: false, timedOut: true });
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

  const q = activeQuestions[currentQuestionIndex];
  setText(questionText, q.text);
  setText(currentQuestionIndexSpan, currentQuestionIndex + 1);
  updateProgressBar();
  questionStartTime = Date.now();
  prepareAudioForQuestion();

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
      recordQuestionStats({ isCorrect: false, timedOut: true });
      lockAnswers(answersDiv);
      nextBtn.classList.remove("hidden");
    }
  );
}

function selectAnswer(index, btn) {
  clearInterval(questionTimerId);

  const q = activeQuestions[currentQuestionIndex];
  if (index === q.correct) {
    score++;
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
  }

  recordQuestionStats({ isCorrect: index === q.correct, timedOut: false });
  markCorrectAnswer(answersDiv, q.correct);
  lockAnswers(answersDiv);
  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < activeQuestions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearTimers();
  stopAudio();
  hideElement(questionScreen);
  showElement(resultScreen);

  updateScoreDisplay(scoreText, score, activeQuestions.length);

  if (score > bestScore) {
    bestScore = score;
    saveToLocalStorage("bestScore", bestScore);
  }
  setText(bestScoreEnd, bestScore);
  renderStats();
  if (statsScreen) {
    showElement(statsScreen);
  }
}

function restartQuiz() {
  clearTimers();
  stopAudio();
  hideElement(resultScreen);
  if (statsScreen) {
    hideElement(statsScreen);
  }
  showElement(introScreen);

  setText(bestScoreValue, bestScore);
}
