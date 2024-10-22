const questions = [
    {
        question: "Which is my favorite Hindi movie?",
        answers: [
            { text: "3 Idiots", correct: true }, 
            { text: "Zindagi Na Milegi Dobara", correct: false },
            { text: "Taare Zameen Par", correct: false },
            { text: "Wake Up Sid", correct: false }
        ]
    },
    {
        question: "Which genre I wouldn't watch unless it's to be watched with my beloved?",
        answers: [
            { text: "Romantic", correct: false },
            { text: "Horror", correct: true }, 
            { text: "Sci-Fi", correct: false },
            { text: "Comedy", correct: false }
        ]
    },
    {
        question: "Which is my favorite Christopher Nolan movie?",
        answers: [
            { text: "Interstellar", correct: false }, 
            { text: "Inception", correct: true }, 
            { text: "The Dark Knight", correct: false },
            { text: "The Prestige", correct: false }
        ]
    },
    {
        question: "What is my favorite KK song?",
        answers: [
            { text: "Dil Kyu Yeh Mera", correct: false },
            { text: "Sach Keh Raha Hai", correct: false },
            { text: "Tu Hi Meri Shab Hai", correct: false },
            { text: "Kya Mujhe Pyaar Hai", correct: true }
        ]
    },
    {
        question: "Guess my favorite Aveng-her.",
        answers: [
            { text: "Black Widow (Natasha Romanoff)", correct: false },
            { text: "Scarlet Witch (Wanda Maximoff)", correct: true }, 
            { text: "Captain Marvel (Carol Danvers)", correct: false },
            { text: "Shuri", correct: true }
        ]
    }
];



const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none"; // Hide next button initially
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    if (isCorrect) {
        score++;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("incorrect");
    }
    
    // Disable all buttons after an answer is selected
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    
    nextButton.style.display = "block"; // Show next button
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    // Remove previous button styles
    Array.from(answerButtons.children).forEach(button => {
        button.classList.remove("correct", "incorrect");
        button.disabled = false;
    });
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        questionElement.innerHTML = `Quiz completed! Your score is ${score} out of ${questions.length}.`;
        nextButton.innerHTML = "PLAY AGAIN";
        nextButton.style.display = "block"; 
        nextButton.addEventListener("click", restartQuiz);
    }
}

function restartQuiz() {
    nextButton.removeEventListener("click", restartQuiz);
    startQuiz();
}

nextButton.addEventListener("click", showNextQuestion);

startQuiz();
