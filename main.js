// main.js
document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');
    
    // Sample questions and answers (replace with your quiz data)
    const questions = ['Question 1', 'Question 2', 'Question 3'];
    
    questions.forEach((question, index) => {
      const questionElement = document.createElement('div');
      questionElement.innerHTML = `<p>${question}</p>`;
  
      const answerInput = document.createElement('input');
      answerInput.type = 'text';
      answerInput.placeholder = 'Your answer...';
      answerInput.addEventListener('input', function (event) {
        // You can handle user input here
        console.log(`Question ${index + 1} Answer: ${event.target.value}`);
      });
  
      questionElement.appendChild(answerInput);
      app.appendChild(questionElement);
    });
  
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', function () {
      // You can perform calculations and display results here
      alert('Submitting answers...');
    });
  
    app.appendChild(submitButton);
  });
  