// main.js
document.addEventListener('DOMContentLoaded', function () {
  const app = document.getElementById('app');

  // Load questions.js
  const scriptQuestions = document.createElement('script');
  scriptQuestions.src = 'questions.js';
  scriptQuestions.onload = function () {
    initializeQuiz();
  };
  app.appendChild(scriptQuestions);

  function initializeQuiz() {
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', function () {
      const userResponses = [];
      const userScore = benchmarkSchemes.map((benchmarkScheme, benchmarkIndex) => {
        const benchmarkScore = questions.reduce((score, question, index) => {
          const userChoice = document.querySelector(`input[name="question${index}"]:checked`);
          if (userChoice) {
            userResponses.push(userChoice.value);
            if (userChoice.value === benchmarkScheme.answers[index]) {
              return score + 1;
            }
          }
          return score;
        }, 0);

        return benchmarkScore;
      });

      // Calculate percentages
      const totalQuestions = questions.length;
      const percentages = benchmarkSchemes.map((_, benchmarkIndex) => {
        return ((userScore[benchmarkIndex] / totalQuestions) * 100).toFixed(2);
      });

      // Redirect to results.html with query parameters
      const queryString = `?user=${userResponses.join(',')}&scores=${percentages.join(',')}`;
      window.location.href = `results.html${queryString}`;
    });

    app.appendChild(submitButton);
  }
});
