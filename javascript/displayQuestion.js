// displayQuestion.js
import questions from "./questions.js";

function displayQuestion(question) {

    const outerDiv = document.createElement("div");
    outerDiv.classList.add("question-wrapper");
    const questionLabel = document.createElement("label");
    questionLabel.classList.add("form-label");
    questionLabel.innerHTML = `<br><p>${question.intro}</p> <br> <strong>Question ${Number(question.name.slice(1)) + 1}:</strong> `;
    if (question.tooltip) {
        let term = question.tooltip[0];
        let explanation = question.tooltip[1];
        let startIndex = question.prompt.indexOf(term);
        let endIndex = startIndex + term.length;
        questionLabel.innerHTML += question.prompt.slice(0, startIndex)
                                + `<div class="tooltip">${term}<span class="tooltiptext">${explanation}</span></div>`
                                + question.prompt.slice(endIndex);
    } else {
        questionLabel.innerHTML += question.prompt;
    }
    outerDiv.appendChild(questionLabel)

    switch(question.type) {
        
        case "radio":
            const radioDiv = document.createElement("div");
            radioDiv.classList.add("question-flex");
            
            question.options.forEach((option, index) => {
                const answerLabel = document.createElement("label");
                answerLabel.classList.add("radio-label");
                answerLabel.htmlFor = `${question.name}a${index}`;
                
                const answerInput = document.createElement("input");
                answerInput.classList.add("input-radio");
                answerInput.type = "radio";
                answerInput.id = answerLabel.htmlFor;
                answerInput.name = question.name;
                answerInput.value = option;
                answerLabel.appendChild(answerInput);

                const answerSpan = document.createElement("span");
                answerSpan.textContent = option;
                answerLabel.appendChild(answerSpan);

                const answerCheckmark = document.createElement("span");
                answerCheckmark.classList.add("radio-checkmark");
                answerLabel.appendChild(answerCheckmark);
                
                radioDiv.appendChild(answerLabel);
            })

            outerDiv.appendChild(radioDiv);
            break;
        
        case "checkbox":
            const checkboxDiv = document.createElement("div");
            checkboxDiv.classList.add("question-flex");
            
            question.options.forEach((option, index) => {
                const answerLabel = document.createElement("label");
                answerLabel.classList.add("checkbox-label");
                answerLabel.htmlFor = `${question.name}a${index}`;
                
                const answerInput = document.createElement("input");
                answerInput.classList.add("input-checkbox");
                answerInput.type = "checkbox";
                answerInput.id = answerLabel.htmlFor;
                answerInput.name = `${question.name}[]`;
                answerInput.value = option;
                answerLabel.appendChild(answerInput);

                const answerSpan = document.createElement("span");
                answerSpan.textContent = option;
                answerLabel.appendChild(answerSpan);

                const answerCheckmark = document.createElement("span");
                answerCheckmark.classList.add("checkbox-checkmark");
                answerLabel.appendChild(answerCheckmark);
                
                checkboxDiv.appendChild(answerLabel);
            })

            outerDiv.appendChild(checkboxDiv);
            break;
        
        case "slider":
            const sliderDiv = document.createElement("div");
            sliderDiv.classList.add("question-flex");

            const sliderInput = document.createElement("input");
            sliderInput.classList.add("slider");
            sliderInput.type = "range";
            sliderInput.min = question.options[0];
            sliderInput.max = question.options[1];
            sliderInput.value = question.options[2];
            sliderInput.id = `${question.name}a`;
            sliderInput.name = question.name;
            sliderDiv.appendChild(sliderInput);

            const sliderP = document.createElement("p");
            sliderP.textContent = "Answer: "
            const sliderSpan = document.createElement("span");
            sliderSpan.id = `${question.name}s`;
            sliderSpan.value = sliderInput.value;
            sliderP.appendChild(sliderSpan);
            sliderDiv.appendChild(sliderP);

            sliderInput.oninput = function() {
                sliderSpan.textContent = this.value;
            }

            outerDiv.appendChild(sliderDiv);
            break;
    }

    container.appendChild(outerDiv);
    return 0;
}

const container = document.getElementById("form-container");
questions.forEach(question => displayQuestion(question));
