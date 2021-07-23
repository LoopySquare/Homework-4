//grab from HTML
const highScoresList = document.getElementById("highScoresList")
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

//add score from local storage to highscores page
highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name}: ${score.score}</li>`
}).join("")