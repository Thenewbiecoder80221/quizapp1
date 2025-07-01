document.addEventListener('DOMContentLoaded', () => {
    const highScoresList = document.getElementById("highScoresList");
    
    // Check if highScoresList element exists
    if (!highScoresList) {
        console.error("Error: #highScoresList element not found in the DOM");
        return;
    }

    let highScores = [];
    try {
        const storedScores = localStorage.getItem("highScores");
        highScores = storedScores ? JSON.parse(storedScores) : [];
    } catch (error) {
        console.error("Error parsing highScores from localStorage:", error);
    }

    // Display fallback message if no scores are available
    if (!Array.isArray(highScores) || highScores.length === 0) {
        highScoresList.innerHTML = '<li class="high-score">No high scores available</li>';
        return;
    }

    // Populate the high scores list with rank, name, and score
    highScoresList.innerHTML = highScores
        .map((score, index) => {
            // Ensure score object has name and score properties
            const name = score.name || "Anonymous";
            const scoreValue = Number.isFinite(score.score) ? score.score : 0;
            return `<li class="high-score">Rank ${index + 1}: ${name} - ${scoreValue}</li>`;
        })
        .join('');
});