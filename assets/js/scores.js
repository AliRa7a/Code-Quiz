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
    const clearButton = document.getElementById("clear");

  clearButton.addEventListener("click", function () {
    // Clear high scores from localStorage
    localStorage.removeItem("highscores");

    // Update the displayed high scores
    const highscoresList = document.getElementById("highscores");
    highscoresList.innerHTML = ""; // Clear the existing list

    // You can optionally display a message like "High scores cleared" or update UI as needed
  });
  });
  