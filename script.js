const questions = [
    {
        question: "Which keyword is used to declare variables in JavaScript?",
        answers: [
            {text: "var", correct: false},
            {text: "let", correct: false},
            {text: "const", correct: false},
            {text: "all of the above", correct: true}
        ]
    },
    {
        question: "What does the typeof operator in JavaScript return for the type of null?",
        answers: [
            {text: "object", correct: true},
            {text: "undefined", correct: false},
            {text: "null", correct: false},
            {text: "number", correct: false}
        ]
    },
    {
        question: "Which of the following is a valid way to declare a JavaScript function?",
        answers: [
            {text: "function myFunction() { }", correct: false},
            {text: "var myFunction = function() { }", correct: false},
            {text: "Both A and B", correct: true},
            {text: "None of the above", correct: false}
        ]
    },
    {
        question: "Which of the following statements about drawing on a HTML5 canvas using JavaScript is true?",
        answers: [
            {text: "The clearRect() method is used to draw a rectangle on the canvas.", correct: false},
            {text: "The canvas element can be resized directly using CSS properties like width and height.", correct: true},
            {text: "The arc() method is used to draw a filled rectangle on the canvas.", correct: false},
            {text: "he canvas context method stroke() is used to fill the interior of a shape.", correct: false}
        ]
    },
    {
        question: "What is the result of 3 === '3' in JavaScript?",
        answers: [
            {text: "true", correct: false},
            {text: "false", correct: true},
            {text: "undefined", correct: false},
            {text: "NaN", correct: false}
        ]
    },
    {
        question: "Which method is used to add a new element to the end of an array in JavaScript?",
        answers: [
            {text: "push()", correct: true},
            {text: "pop()", correct: false},
            {text: "shift()", correct: false},
            {text: "unshift()", correct: false}
        ]
    },
    {
        question: "What does the event.preventDefault() method do in JavaScript?",
        answers: [
            {text: "Stops the event from bubbling up the DOM tree", correct: false},
            {text: " Cancels the default action of the event", correct: true},
            {text: "Registers an event handler", correct: false},
            {text: "Retrieves the target element of the event", correct: false}
        ]
    },
    {
        question: "How can you stop an event from bubbling up the DOM tree?",
        answers: [
            {text: "Using event.stopPropagation()", correct: true},
            {text: " Using event.cancelBubble()", correct: false},
            {text: "Using event.preventDefault()", correct: false},
            {text: "Using event.preventBubble()", correct: false}
        ]
    },
    {
        question: "How do you draw a line on an HTML canvas element using JavaScript?",
        answers: [
            {text: "canvas.drawLine(x1, y1, x2, y2)", correct: false},
            {text: "canvas.beginPath(); canvas.moveTo(x1, y1); canvas.lineTo(x2, y2); canvas.stroke();", correct: true},
            {text: "canvas.drawLineTo(x1, y1, x2, y2)", correct: false},
            {text: "canvas.createLine(x1, y1, x2, y2)", correct: false}
        ]
    },
    {
        question: "What method is used to clear the entire drawing on an HTML canvas element?",
        answers: [
            {text: "canvas.clear()", correct: false},
            {text: "canvas.clearRect()", correct: false},
            {text: "canvas.reset()", correct: false},
            {text: "canvas.width = canvas.width", correct: true}
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer =>
    {
        
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButton.appendChild(button);
            if(answer.correct){
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
const isCorrect = selectedBtn.dataset.correct === "true";
if(isCorrect) {
selectedBtn.classList.add("correct");
score++;
}else{
selectedBtn.classList.add("incorrect");
}
    Array.from(answerButton.children).forEach(button =>
    {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function displayScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        displayScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();

    }
    else{
        startQuiz();
    }
})
startQuiz();
