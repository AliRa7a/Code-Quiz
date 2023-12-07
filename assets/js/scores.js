document.addEventListener("DOMContentLoaded", function () {
    const highscoresElement = document.getElementById("highscores");
  
    // Retrieve high scores from local storage
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  
    // Sort high scores by score in descending order
    highscores.sort((a, b) => b.score - a.score);
  
    // Display high scores on the page
    highscores.forEach((score, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${score.initials} - ${score.score}`;
      highscoresElement.appendChild(listItem);
    });
  });
  