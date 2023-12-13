// main.js
document.addEventListener('DOMContentLoaded', function () {
  const app = document.getElementById('app');
  const benchmarkSchemes = [
    { name: 'Kyber', answers: ['yes', 'no', 'yes', 'Kyber', 'yes'] },
    { name: 'McEliece', answers: ['yes', 'yes', 'no', 'RSA', 'yes'] },
    { name: 'FrodoKEM', answers: ['no', 'yes', 'yes', "I don't know", 'no'] },
  ];

  const questions = [
    {
      text: 'Are you working with state sensitive data?',
      choices: ['Yes', 'No'],
    },
    {
      text: 'Will your data still be sensitive in 20 years?',
      choices: ['Yes', 'No'],
    },
    {
      text: 'Are you deploying secure hardware?',
      choices: ['Yes', 'No'],
    },
    {
      text: 'What scheme are you currently using?',
      choices: ['RSA', 'Elliptic curves', 'Kyber', "I don't know"],
    },
    {
      text: 'Is your application time critical?',
      choices: ['Yes', 'No',],
    },
  ];

  questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.innerHTML = `<p>${question.text}</p>`;

    const choicesContainer = document.createElement('div');
    question.choices.forEach((choice) => {
      const choiceInput = document.createElement('input');
      choiceInput.type = 'radio';
      choiceInput.name = `question${index}`;
      choiceInput.value = choice.toLowerCase();

      const choiceLabel = document.createElement('label');
      choiceLabel.innerHTML = choice;

      choicesContainer.appendChild(choiceInput);
      choicesContainer.appendChild(choiceLabel);
    });
    questionElement.appendChild(choicesContainer);

    app.appendChild(questionElement);
  });

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

      const scoreMessage = benchmarkScore === questions.length
        ? `${benchmarkScheme.name} agrees with you on all questions!`
        : `${benchmarkScheme.name}'s score: ${benchmarkScore}/${questions.length}`;

      alert(`${scoreMessage}\n\n${benchmarkScheme.name}'s responses: ${benchmarkScheme.answers.join(', ')}`);
      return benchmarkScore;
    });

    const userScoreMessage = userScore.every(score => score === questions.length)
      ? 'You agree with all benchmark people on all questions!'
      : `Your score: ${userScore.join(', ')}`;

    alert(`${userScoreMessage}\n\nYour responses: ${userResponses.join(', ')}`);
  });

  app.appendChild(submitButton);
});
