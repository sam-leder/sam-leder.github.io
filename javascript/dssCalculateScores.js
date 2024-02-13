// dssCalculateScores.js
const questions = [
    {
        type: 'checkbox',
        name: 'q1',
        topic: 'Operations',
        intro: 'The characteristics of the various post-quantum cryptography algorithms vary per operations. For example, certain algorithms might be more efficient when it comes to signing while others will be faster during key generation. To give the best recommendation, it is important to know which operations will be predominantly used in your application. If all of them are equally important or you do not (yet) know which one will be used, the overall best performing algorithms will be selected.',
        prompt: 'What cryptographic operations are the most important in your application?',
        options: ['Key generation', 'Signing', 'Verification', "Don't know"],
    },
    {
        type: 'slider',
        name: 'q2',
        topic: 'Timespan',
        intro: 'If your organization is dealing with information that should remain secure or validated for an extended period of time, it might be beneficial to invest in a more robust post-quantum cryptographic scheme. This ensures that you minimize the chance of the scheme being vulnerable in the future and thus increasing the assurance that the data will remain secure or verified for its entire lifespan. If you do not know how long your data should stay secure, choose -1.',
        prompt: 'For how many years does the data that you are protecting have to stay secure?',
        options: [-1, 30, -1, 'years'],
    },
    {
        type: 'radio',
        name: 'q2 (Follow-up)',
        topic: 'Classified information',
        intro: "For the protection of classified information, some specific rules and requirements may apply. In case you don't know what classified information is, or in case you are not sure whether your application handles classified information, the answer to the following question is probably 'No'. The NLNCSA (Dutch: Nationaal Bureau voor Verbindingsbeveiliging, NBV) can provide guidance on these rules and requirements.",
        prompt: 'Are you working with classified information?',
        options: ['Yes', 'No', "Don't know"],
    },
    {
        type: 'radio',
        name: 'q3',
        topic: 'Performance vs security',
        intro: 'The design of the new post-quantum scheme is different from the classically used RSA and ECC. The designs are based on different mathematical problems. Some are very efficient, but considered less mature, while some others are considered more secure, but they pay the price in efficiency. It is important to evaluate the trade-off performance vs security when choosing the appropriate scheme',
        prompt: 'In my application, I can afford to trade performance for security.',
        options: ['Completely disagree', 'Disagree', 'Neutral', 'Agree', 'Completely agree'],
    },
    {
        type: 'radio',
        name: 'q3-1',
        topic: 'Conservativeness vs efficiency',
        prompt: 'Is your application willing to opt for a conservative choice at the expense of efficiency?',
        options: ['Completely disagree', 'Disagree', 'Neutral', 'Agree', 'Completely agree'],
        tooltip: ['conservative', 'Approach that prioritizes security over efficiency. The design bases its security on well understood mathematical problems, trying to minimize the risk of introducing vulnerabilities'],
    },
    {
        type: 'radio',
        name: 'q3-2',
        topic: 'Security level',
        intro: 'NIST has defined 5 levels of security as their evaluation criteria for the security of candidate post-quantum schemes. Every level is designed to meet the current requirements for bit security: Level 1 equals 128 bits of security, Level 3 equals 192 bits of security, and Level 5 equals 256 bits of security plus two intermediate levels. ',
        prompt: 'What is the required security level for your application?',
        options: [
            '128 bits - NIST level 1 - 3072 bit RSA keys - 256 bit ECC keys',
            '192 bits - NIST level 3 - 7680 bit RSA keys - 384 bit ECC keys',
            '256 bits - NIST level 5 - 15360 bit RSA keys - 521 bit ECC keys',
            "Don't know"
        ],
        tooltip: ['security', 'See nist.gov'],
    },
    {
        type: 'radio',
        name: 'q3-3',
        topic: 'Hybrid mode',
        intro: 'In case you application cannot opt for the optimal security, you might consider the option of using post-quantum cryptography in hybrid mode: using classical and post-quantum cryptography together. The advantage of using hybrid cryptography is that the security remains guaranteed as long as one of the two scheme is secure, and it aids backward-compatibility.',
        prompt: 'Can your application support the use of two cryptographic algorithms (classical and post-quantum) in hybrid mode?',
        options: ['Yes', 'No', "Don't know"],
    },
    {
        type: 'radio',
        name: 'q4',
        topic: 'Standardization',
        intro: 'As the scrutiny of the new schemes is ongoing, some schemes are ready or almost ready for standardization. Different standardization bodies will likely choose different schemes for standardization and with different timelines. In case your application follows specific standardization bodies, for example because you are mandated by the Dutch government, it is important to note it when selecting the most suitable algorithm.',
        prompt: 'Are you required to follow standardization bodies?',
        options: ['NIST', 'ISO', 'IETF', "Don't know"],
    },
    {
        type: 'checkbox',
        name: 'q5',
        topic: 'Platform',
        intro: 'The availability of cryptographic schemes for a large number of applications is tied to the hardware in which they operate. Some larger implementations might not fit the desired platform.',
        prompt: 'On what kind of platform will you use the cryptographic operations?',
        options: ['Laptop (or higher performance)', 'Smart phone', 'IoT device', 'Smart card', 'Sensor', "Don't know"],
    },
    {
        type: 'checkbox',
        name: 'q5-1',
        topic: 'Hardware acceleration',
        intro: 'The performance of post-quantum schemes in hardware can be improved if paired with cryptographic accelerators.',
        prompt: 'Does your device support hardware accelerators?',
        options: ['Hash function calls', 'Polynomial operations', "Don't know"],
    },
    {
        type: 'radio',
        name: 'q5-2',
        topic: 'Floating point arithmetic',
        intro: 'Some cryptographic schemes actually require support for floating point arithmetic to be able to perform securely.',
        prompt: 'Does your device support floating point arithmetic?',
        options: ['Yes', 'No', "Don't know"],
    },
    {
        type: 'radio',
        name: 'q6',
        topic: 'New hardware',
        intro: 'For hardware applications, it can occur that the hardware cannot be replaced or updated. Some schemes can be re-designed to accommodate pre-existing hardware, but it is possible that new -hardware might be required to execute the operation of the new post-quantum algorithms.',
        prompt: 'My application can afford to use new hardware.',
        options: ['Completely disagree', 'Disagree', 'Neutral', 'Agree', 'Completely agree'],
    },
    {
        type: 'radio',
        name: 'q7',
        topic: 'Space requirement',
        intro: 'The design of the new cryptographic schemes makes them slower than the currently deployed cryptographic schemes like RSA and ECC and will use larger cryptographic keys. This will impact the application, both in resources and time, and if not used correctly, they might become a bottleneck. The application will have to handle larger cryptographic materials (keys, ciphertexts, signatures, etc) which have to be stored and transmitted.',
        prompt: 'My application can afford larger cryptographic keys and ciphertexts.',
        options: ['Completely disagree', 'Disagree', 'Neutral', 'Agree', 'Completely agree'],
    },
    {
        type: 'slider',
        name: 'q7-1',
        topic: 'Communication requirement',
        intro: 'The sensibly larger cryptographic keys and ciphertexts/signatures will need to be handled in all the stages of data handling: Data in transit, data in use and data at rest. It is paramount that the application can allocate additional resources to the different stages of data handling. If you want to answer one of the expert questions, but do not know an answer to one of the others, choose -1.',
        prompt: 'Can your application afford additional communiction cost bandwidth (in MB)?',
        options: [-1, 1000, -1, "MB"],
    },
    {
        type: 'slider',
        name: 'q7-2',
        topic: 'Memory requirement',
        prompt: 'Can your application afford additional RAM usage (in MB)?',
        options: [-1, 1000, -1, "MB"],
    },
    {
        type: 'slider',
        name: 'q7-3',
        topic: 'Storage requirement',
        prompt: 'Can your application afford additional long-term storage (in GB)?',
        options: [-1, 100, -1, "GB"],
    },
    {
        type: 'radio',
        name: 'q8',
        topic: 'Delay requirement',
        intro: 'The post-quantum cryptographic schemes will be less efficient than the currently used schemes, which might negatively impact the application they are operating in, especially if it is time sensitive or heavily performance-based.',
        prompt: 'My application can afford additional delay.',
        options: ['Completely disagree', 'Disagree', 'Neutral', 'Agree', 'Completely agree'],
    },
    {
        type: 'slider',
        name: 'q8-1',
        topic: 'Communication time',
        intro: 'If you want to answer one of the expert questions, but do not know an answer to the other, choose -1.',
        prompt: 'Can your application afford additional communication cost (in seconds)?',
        options: [-1, 60, -1, 'seconds'],
    },
    {
        type: 'slider',
        name: 'q8-2',
        topic: 'Computation time',
        prompt: 'Can your application afford additional computational time (in seconds)?',
        options: [-1, 60, -1, 'seconds'],
    },
    {
        type: 'radio',
        name: 'q9',
        topic: 'Physical access',
        intro: 'Some schemes are easier to protect against side-channel attacks than others. In a side-channel attack, the attacker makes use of physical properties of a computation (power usage, fluctuations in computation time) to recover partial information on the secret. However, such attacks are only a concern when the attacker has a means to physically analyse the device in your application. The fact that an attacker has a means to access the device running the cryptographic operations is not by itself a security concern. However, it might be critical for your application to make sure that the secret key is not leaked by the device.',
        prompt: 'Can attackers potentially get physical access to your device and do you need to mitigate this risk?',
        options: ['Yes', 'No', "Don't know"],
    },
    {
        type: 'checkbox',
        name: 'q9-1',
        topic: 'Functionality',
        intro: 'The design of the operations for some cryptographic schemes makes it hard to implement side-channel countermeasures for some of their functionalities. It is therefore helpful to understand which operations in your application need to be fortified.',
        prompt: 'What functionality do you need to protect?',
        options: ['Signing', 'Verification', 'Key generation', "Don't know"],
    },
    {
        type: 'radio',
        name: 'q10',
        topic: 'Physical access',
        intro: 'A specific class of signature schemes, known as stateful hash-based signature schemes, combines high security guarantees with better efficiency than its stateless counterpart. The limitation in this case, is that the scheme can only sign a limited (tool-tip: typical range from 2^10 to 2^20 signatures) amount of messages and it requires a different key for every signature. Applications like secure booting are ideal for these schemes, but in general it is hard to adopt stateful hash-based schemes due to the difficulty in handling the signing keys.',
        prompt: 'My application requires only a limited number of signatures, and is able to securely handle the cryptographic state, i.e. the set of all signing keys.',
        options: ['Yes', 'No', "Don't know"],
        tooltip: ['securely', 'Storing all signing keys without leakage and preventing to re-use signing keys']
    },
    {
        type: 'checkbox',
        name: 'q11',
        intro: 'Finally, you have the option to indicate which question topics are most important to you. These will be weighed more heavily in the scoring. You can scroll up to review the questions.',
        prompt: 'What question topics do you find extra important?',
        options: [],
    },
];

questions.slice(0, -1).forEach((question, index) => {
    questions[questions.length-1].options.push(`Question ${question.name.slice(1)}: ${question.topic}`);
});


// Placeholder function
function calculateScores(answers) {
    let scores = {"Dilithium": Math.floor(Math.random() * 100), "Falcon": Math.floor(Math.random() * 100), "SPHINCS+": Math.floor(Math.random() * 100), "XMSS": Math.floor(Math.random() * 100)};
    const sortedScores = Object.fromEntries(Object.entries(scores).sort(([, value1], [, value2]) => value2 - value1));

    return sortedScores;
}

const div = document.getElementById("form-wrapper");
div.innerHTML += '<p>You answered as follows:</p>';

questions.forEach((question, index) => {
    let answer = sessionStorage.getItem(question.name);
    div.innerHTML += `<p>Question ${question.name.slice(1)}: ${answer ? answer : "Not answered"}</p>`;
});

let scores = calculateScores();

div.innerHTML += '<br><h4>Your scores are as follows:</h4><br>';

for (const scheme in scores) {
    div.innerHTML += `<h3><center>${scheme}: ${scores[scheme]}</center></h3>`;
}

// Print advice basend on answer of question 2 follow-up
if (sessionStorage.getItem('q2 (Follow-up)') == 'Yes') {
    div.innerHTML += `<br><p>Based on your answer to question 2 (Follow-up), it is advised to contact the Nationaal Bureau voor Verbindingsbeveiliging (NBV) or a similar governmental agency in your country to receive their guidelines on classified information.</p>`;
}

// Print advice based on answer of question 3-2
if (sessionStorage.getItem('q3-2')) {
    div.innerHTML += `<br><p>PQC algorithms with the same security level as your answer to question 3-2 would be ${adviceSecurityLevel()}.</p>`;
}
