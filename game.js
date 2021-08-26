const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");


let currentquestion = {};
let acceptingAnswers = false;
let score = 0;
let questioncounter = 0;
let availablequestions = [];
let questions = [
    {
        question: "Which of these is NOT an early computer?",
        choice1: "ENIAC",
        choice2: "UNIVAC",
        choice3: "SAGE",
        choice4: "NIAC",
        answer: 4,

    },
    {
        question: "To which of these devices is the cellular telephone most closely related?",
        choice1: "Radio",
        choice2: "Telegraph",
        choice3: "Telescope",
        choice4: "Light Bulb",
        answer: 1
    },
    {
        question: "How many computer languages are currently in use?",
        choice1: "100",
        choice2: "50",
        choice3: "25",
        choice4: "2000",
        answer: 4
    },
    {
        "question": "Which of the following is NOT one of the early 'protocols', or ways to use the Internet?",
        "choice1": "Telnet",
        "choice2": "Blogging",
        "choice3": "Gopher",
        "choice4": "FTP",
        "answer": 2
    },
    {
        "question": "A network designed to allow communication within an organization is called: ",
        "choice1": "World Wide Web",
        "choice2": "Yahoo",
        "choice3": "Intranet",
        "choice4": "Internet",
        "answer": 3
    }
]


const CORRECT_POINTS = 50;
const MAX_Q = 5;

startGame = () => {
    questioncounter = 0;
    score = 0;
    availablequestions = [...questions];
    console.log(availablequestions);
    getNewQuestion();
}

getNewQuestion = () => {
    if(availablequestions.length === 0 || questioncounter >= MAX_Q){
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("file:///C:/Users/Lenovo/Desktop/Quiz-App/end.html");
    }
    questioncounter++;
    questionCounterText.innerText = questioncounter+"/"+MAX_Q;
    const qIndex = Math.floor(Math.random() * availablequestions.length);
    currentquestion = availablequestions[qIndex];
    question.innerText = currentquestion.question;

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentquestion["choice" + number];
    });

    availablequestions.splice(qIndex, 1);
    acceptingAnswers = true;
};
choices.forEach( choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classToApply = selectedAnswer == currentquestion.answer ? "correct" : "incorrect";
        /*const correctop = "correctAnsClass";
        let correctAns = currentquestion.answer;*/

        if(classToApply === 'correct'){
            incrementScore(CORRECT_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        /*correctAns.parentElement.classList.add(correctop);*/
        /*Something I have tried
        selectedChoice.parentElement.classList.add(classToApply);
        if(classToApply === 'incorrect'){
            currentquestion.answer.parentElement.classList.add(correctAnsClass);
        }*/
        

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();
