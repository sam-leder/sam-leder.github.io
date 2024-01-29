// processForm.js
const questions = [
    {
        type: 'checkbox',
        name: 'q0',
        prompt: 'What operations will you use in your application?',
        options: ['KeyGen', 'Sign', 'Verify', "Don't know"],
    },
    {
        type: 'slider',
        name: 'q1',
        prompt: 'For how many years does the data that you are protecting have to stay confidential?',
        options: [0, 30, 15, 'years'],
    },
    {
        type: 'checkbox',
        name: 'q2',
        prompt: 'Are you bound by standardization?',
        options: ['NIST', 'ISO', 'IETF', 'Not sure'],
    },
    {
        type: 'checkbox',
        name: 'q3',
        prompt: 'On what kind of platform will you use the cryptographic operations?',
        options: ['Laptop (or better)', 'Smart phone', 'IoT device', 'Smart card', 'Sensor', "Don't know"],
    },
    {
        type: 'checkbox',
        name: 'q4',
        prompt: 'My device supports hardware accelerators',
        options: ['Hash function calls', 'Polynomial operations', "Don't know"],
    },
    {
        type: 'radio',
        name: 'q5',
        prompt: 'Can your application afford to use new hardware?',
        options: ['Yes', 'No', "Don't know"],
    },
    {
        type: 'radio',
        name: 'q6',
        prompt: 'Can your application afford larger cryptographic keys and ciphertexts?',
        options: ['Completely disagree', 'Disagree', 'Neutral', 'Agree', 'Completely agree'],
    },
    {
        type: 'slider',
        name: 'q7',
        prompt: 'Can your application afford additional communiction cost (in bandwidth)?',
        options: [0, 1000, 500, "MB"],
    },
    {
        type: 'slider',
        name: 'q8',
        prompt: 'Can your application afford additional RAM usage?',
        options: [0, 1000, 500, "MB"],
    },
    {
        type: 'slider',
        name: 'q9',
        prompt: 'Can your application afford additional long-term storage?',
        options: [0, 100, 500, "GB"],
    },
    {
        type: 'radio',
        name: 'q10',
        prompt: 'Can your application afford additional delay?',
        options: ['Completely disagree', 'Disagree', 'Neutral', 'Agree', 'Completely agree'],
    },
    {
        type: 'slider',
        name: 'q11',
        prompt: 'Can your application afford additional communication cost (in time)?',
        options: [0, 60, 30, 'seconds'],
    },
    {
        type: 'slider',
        name: 'q12',
        prompt: 'Can your application afford additional computational time?',
        options: [0, 60, 30, 'seconds'],
    },
    {
        type: 'radio',
        name: 'q13',
        prompt: 'My application is willing to trade performance for security',
        options: ['Completely disagree', 'Disagree', 'Neutral', 'Agree', 'Completely agree'],
    },
    {
        type: 'radio',
        name: 'q14',
        prompt: 'My application is willing to opt for a conservatice choice at the expense of efficiency',
        options: ['Yes', 'No', "Don't know"],
    },
    {
        type: 'radio',
        name: 'q15',
        prompt: 'What is the required security level for your application? [TBD]',
        options: ['A', 'B', 'C'],
    },
    {
        type: 'radio',
        name: 'q16',
        prompt: 'My application can support the use of two cryptographic algorithms (classical and post-quantum) in hybrid mode.',
        options: ['Yes', 'No', "Don't know"],
    },
    {
        type: 'radio',
        name: 'q17',
        prompt: 'Can attackers potentially get physical access to your device?',
        options: ['Yes', 'No', "Don't know"],
    },
    {
        type: 'radio',
        name: 'q18',
        prompt: '(Follow-up) Do you need to mitigate this risk?',
        options: ['Yes', 'No', "Don't know"],
    },
    {
        type: 'checkbox',
        name: 'q19',
        prompt: 'What functionality do you need to protect?',
        options: ['Signing', 'Verification', 'Key generation', "Don't know"],
    },
];


function processForm() {

    let form = document.getElementById('kemform');
    sessionStorage.clear()

    questions.forEach(question => {
        if (question.type === "checkbox") {
            let answer = [];
            let checkboxes = form.elements[question.name + "[]"];
            for (let i=0; i<checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    answer.push(checkboxes[i].value);
                }
            }
            sessionStorage.setItem(question.name, answer);
        } else {
            sessionStorage.setItem(question.name, form.elements[question.name].value);
        }
    });

    // Redirect to kemresult.html
    window.location.href = 'kemresult.html';
}

