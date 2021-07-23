//grab from HTML
const question = document.getElementById("question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");

//set variables
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
const SCORE_POINTS = -10
const MAX_QUESTIONS = 10

//Question array
let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<link>",
        choice3: "<js>",
        choice4: "<javascript>",
        answer: 1,
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        choice1: "The <head> section",
        choice2: "The <body> section",
        choice3: "The <footer> section",
        choice4: "All the above",
        answer: 2,
    },
    {
        question: "What is the correct syntax for referring to an external script called 'bestscript.js'?",
        choice1: "<script class='bestscript.js'>",
        choice2: "<script href='bestscript.js'>",
        choice3: "<script src='bestscript.js'>",
        choice4: "<script id='bestscript.js'>",
        answer: 3,
    },
    {
        question: "How do you write 'Hello' inside an alert box?",
        choice1: "msg('Hello')",
        choice2: "alertBox('Hello')",
        choice3: "msgBox('Hello')",
        choice4: "alert('Hello')",
        answer: 4,
    }, {
        question: "How do you create a function named 'example' in JavaScript?",
        choice1: "function example()",
        choice2: "function:example()",
        choice3: "function = example()",
        choice4: "function, example()",
        answer: 1,
    },
    {
        question: "How do you call a function named 'example'?",
        choice1: "call example()",
        choice2: "function example()",
        choice3: "call function example()",
        choice4: "all the above",
        answer: 2,
    },
    {
        question: "How do you write an IF statement for executing code if 'i' is not equal to 4?",
        choice1: "if i =! 4 then",
        choice2: "if (i != 4)",
        choice3: "if (i <> 4)",
        choice4: "if i <> 4",
        answer: 2,
    },
    {
        question: "How can you add a comment in JavaScript?",
        choice1: "'this is a comment",
        choice2: "<!--this is a comment-->",
        choice3: "//this is a comment",
        choice4: "all the above",
        answer: 3,
    },
    {
        question: "How do you round the number 7.25 to the nearest integer?",
        choice1: "rnd(7.25)",
        choice2: "Math.rnd(7.25)",
        choice3: "round(7.25)",
        choice4: "Math.round(7.25)",
        answer: 4,
    },
    {
        question: "Which operator is used to assign value to a variable?",
        choice1: "-",
        choice2: "*",
        choice3: ":",
        choice4: "=",
        answer: 4,
    },
]

//start game function
startGame = () => {
    questionCounter = 0
    score = 75
    var interval = setInterval(function(){
    document.getElementById('score').innerHTML=score;
     score--;
    if (score < 0){
        clearInterval(interval);
        document.getElementById('score').innerHTML='0';
        // or...
        alert("You're out of time!");
        score= 0
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign("./end.html")
  }
}, 1000);
    availableQuestions = [...questions]  //spread operator
    getNewQuestion()
}

//select random question from array
getNewQuestion = () => {
    if(availableQuestions.length === 0 || score <= 0) {
        localStorage.setItem('mostRecentScore', score) 
        
        return window.location.assign("./end.html")  //keeps track of score
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    
    choices.forEach(choice => {
        const number = choice.dataset["number"]  //data-number
        choice.innerText = currentQuestion["choice" + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

//validates answer by updating color with css
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset["number"]

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" :
        "incorrect"

        if(classToApply != "correct") {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()