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

function question1() {
    chosen = {dilithium: {performance: {}, size: {}}, falcon: {performance: {}, size: {}}, sphincs: {performance: {}, size: {}}, xmss: {performance: {}, size: {}}}
    if (sessionStorage.getItem('q1').includes('Key generation')) {
        chosen.dilithium.performance.keygen = 4;
        chosen.falcon.performance.keygen    = 2;
        chosen.sphincs.performance.keygen   = 1;
        chosen.xmss.performance.keygen      = 2;
    }
    if (sessionStorage.getItem('q1').includes('Signing')) {
        chosen.dilithium.performance.sign   = 5;
        chosen.falcon.performance.sign      = 4;
        chosen.sphincs.performance.sign     = 2;
        chosen.xmss.performance.sign        = 2;
    }
    if (sessionStorage.getItem('q1').includes('Verification')) {
        chosen.dilithium.performance.ver    = 4;
        chosen.falcon.performance.ver       = 5;
        chosen.sphincs.performance.ver      = 2;
        chosen.xmss.performance.ver         = 5;
    }
    if (sessionStorage.getItem('q1').includes('Key generation') || sessionStorage.getItem('q1').includes('Signing')) {
        chosen.dilithium.size.sk    = 3;
        chosen.falcon.size.sk       = 4;
        chosen.sphincs.size.sk      = 5;
        chosen.xmss.size.sk         = 2;
    }
    if (sessionStorage.getItem('q1').includes('Key generation') || sessionStorage.getItem('q1').includes('Verification')) {
        chosen.dilithium.size.pk    = 3;
        chosen.falcon.size.pk       = 4;
        chosen.sphincs.size.pk      = 5;
        chosen.xmss.size.pk         = 3;
    }
    if (sessionStorage.getItem('q1').includes('Signing') || sessionStorage.getItem('q1').includes('Verification')) {
        chosen.dilithium.size.sig   = 4;
        chosen.falcon.size.sig      = 5;
        chosen.sphincs.size.sig     = 1;
        chosen.xmss.size.sig        = 3;
    }

    return chosen
}

function question2() {
    let scores2 = {dilithium: 3, falcon: 3, sphincs: 5, xmss: 5};

    // Include result from question 2
    if (sessionStorage.getItem('q2') > -1) {
        scores2.dilithium = Math.round(3 - sessionStorage.getItem('q2') * 2 / 30);
        scores2.falcon = Math.round(3 - sessionStorage.getItem('q2') * 2 / 30);
    }

    // Include result from question 2 follow-up
    switch (sessionStorage.getItem('q2 (Follow-up)')) {
        case 'Yes':
            scores2.dilithium = (scores2.dilithium + 4)/2;
            scores2.falcon = (scores2.falcon + 3)/2;
            scores2.sphincs = (scores2.sphincs + 5)/2;
            scores2.xmss = (scores2.xmss + 5)/2;
            break;
        case 'No':
            scores2.dilithium = (scores2.dilithium + 3)/2;
            scores2.falcon = (scores2.falcon + 3)/2;
            scores2.sphincs = (scores2.sphincs + 3)/2;
            scores2.xmss = (scores2.xmss + 3)/2;
            break;
        default: // Don't know
            scores2.dilithium = (scores2.dilithium + 3)/2;
            scores2.falcon = (scores2.falcon + 3)/2;
            scores2.sphincs = (scores2.sphincs + 4)/2;
            scores2.xmss = (scores2.xmss + 4)/2;
    }

    return scores2;
}

function question3() {
    let scores3 = {};
    // If Expert question 3-1 is answered or 3-3 is answered with something other than Don't know
    if (sessionStorage.getItem('q3-1') || (sessionStorage.getItem('q3-3') && sessionStorage.getItem('q3-3') != "Don't know")) {
        // Use expert answers of question 3-1 and 3-3

        switch (sessionStorage.getItem('q3-1')) {
            case 'Completely agree':
                scores3.dilithium   = 1;
                scores3.falcon      = 1;
                scores3.sphincs     = 5;
                scores3.xmss        = 5;
                break;
            case 'Agree':
                scores3.dilithium   = 2;
                scores3.falcon      = 2;
                scores3.sphincs     = 4;
                scores3.xmss        = 4;
                break;
            case 'Neutral':
                scores3.dilithium   = 3;
                scores3.falcon      = 3;
                scores3.sphincs     = 3;
                scores3.xmss        = 3;
                break;
            case 'Disagree':
                scores3.dilithium   = 4;
                scores3.falcon      = 4;
                scores3.sphincs     = 2;
                scores3.xmss        = 2;
                break;
            case 'Completely disagree':
                scores3.dilithium   = 5;
                scores3.falcon      = 5;
                scores3.sphincs     = 1;
                scores3.xmss        = 1;
                break;
            default:
                scores3.dilithium   = 0;
                scores3.falcon      = 0;
                scores3.sphincs     = 0;
                scores3.xmss        = 0;
        }

        switch (sessionStorage.getItem('q3-3')) {
            case 'Yes':
                scores3.dilithium   += 5;
                scores3.falcon      += 5;
                scores3.sphincs     += 1;
                scores3.xmss        += 1;
                break;
            case 'No':
                scores3.dilithium   += 1;
                scores3.falcon      += 1;
                scores3.sphincs     += 5;
                scores3.xmss        += 5;
                break;
            default: // Don't know
                scores3.dilithium   += 0;
                scores3.falcon      += 0;
                scores3.sphincs     += 0;
                scores3.xmss        += 0;
        }

        // Normalise over subquestions if multiple were answered
        if (sessionStorage.getItem('q3-1') && sessionStorage.getItem('q3-3')) {
            scores3.dilithium   /= 2;
            scores3.falcon      /= 2;
            scores3.sphincs     /= 2;
            scores3.xmss        /= 2;
        }

    } else {
        // Use answer of Question 3
        switch (sessionStorage.getItem('q3')) {
            case 'Completely agree':
                scores3.dilithium   = 1;
                scores3.falcon      = 1;
                scores3.sphincs     = 5;
                scores3.xmss        = 5;
                break;
            case 'Agree':
                scores3.dilithium   = 2;
                scores3.falcon      = 2;
                scores3.sphincs     = 4;
                scores3.xmss        = 4;
                break;
            case 'Neutral':
                scores3.dilithium   = 3;
                scores3.falcon      = 3;
                scores3.sphincs     = 3;
                scores3.xmss        = 3;
                break;
            case 'Disagree':
                scores3.dilithium   = 4;
                scores3.falcon      = 4;
                scores3.sphincs     = 2;
                scores3.xmss        = 2;
                break;
            case 'Completely disagree':
                scores3.dilithium   = 5;
                scores3.falcon      = 5;
                scores3.sphincs     = 1;
                scores3.xmss        = 1;
                break;
            default:
                scores3.dilithium   = 0;
                scores3.falcon      = 0;
                scores3.sphincs     = 0;
                scores3.xmss        = 0;
        }
    }

    return scores3;
}

function question4() {
    let scores4 = {dilithium: 0, falcon: 0, sphincs: 0, xmss: 0};

    let numberOfAnswers = 0;

    if (sessionStorage.getItem('q4').includes('NIST')) {
        scores4.dilithium   += 5;
        scores4.falcon      += 3;
        scores4.sphincs     += 5;
        scores4.xmss        += 5;
        numberOfAnswers     += 1;
    }

    if (sessionStorage.getItem('q4').includes('ISO')) {
        scores4.dilithium   += 0;
        scores4.falcon      += 0;
        scores4.sphincs     += 0;
        scores4.xmss        += 0;
        numberOfAnswers     += 1;
    }

    if (sessionStorage.getItem('q4').includes('IETF')) {
        scores4.dilithium   += 2;
        scores4.falcon      += 0;
        scores4.sphincs     += 1;
        scores4.xmss        += 5;
        numberOfAnswers     += 1;
    }
    // If only Don't know or nothing is selected
    if (numberOfAnswers == 0) {
        return {dilithium: 5, falcon: 3, sphincs: 4, xmss: 4};
    }

    // Normalise over number of chosen standardisation bodies
    if (numberOfAnswers >= 1) {
        scores4.dilithium   /= numberOfAnswers;
        scores4.falcon      /= numberOfAnswers;
        scores4.sphincs     /= numberOfAnswers;
        scores4.xmss        /= numberOfAnswers;
    }

    return scores4;
}

function question5() {

    let scores5 = {dilithium: 0, falcon: 0, sphincs: 0, xmss: 0};

    let numberOfAnswers = 0;

    if (sessionStorage.getItem('q5-1') || sessionStorage.getItem('q5-2')) {
        // Use answer of question 5-1
        if (sessionStorage.getItem('q5-1')) {
            if (sessionStorage.getItem('q5-1').includes('Hash function calls')) {
                scores5.dilithium   += 3;
                scores5.falcon      += 3;
                scores5.sphincs     += 5;
                scores5.xmss        += 5;
                numberOfAnswers     += 1;
            }
            if (sessionStorage.getItem('q5-1').includes('Polynomial operations')) {
                scores5.dilithium   += 4;
                scores5.falcon      += 4;
                scores5.sphincs     += 0;
                scores5.xmss        += 0;
                numberOfAnswers     += 1;
            }
            if (numberOfAnswers == 0 && sessionStorage.getItem('q5').includes("Don't know")) {
                scores5.dilithium   += 3;
                scores5.falcon      += 3;
                scores5.sphincs     += 1;
                scores5.xmss        += 1;
                numberOfAnswers     += 1;
            }

            // Normalise over number of chosen standardisation bodies
            if (numberOfAnswers >= 1) {
                scores5.dilithium   /= numberOfAnswers;
                scores5.falcon      /= numberOfAnswers;
                scores5.sphincs     /= numberOfAnswers;
                scores5.xmss        /= numberOfAnswers;
            }
            numberOfAnswers = 1;
        }
        if (sessionStorage.getItem('q5-2')) {
            switch (sessionStorage.getItem('q5-2')) {
                case 'Yes':
                    scores5.dilithium   += 3;
                    scores5.falcon      += 5;
                    scores5.sphincs     += 3;
                    scores5.xmss        += 3;
                    break;
                case 'No':
                    scores5.dilithium   += 3;
                    scores5.falcon      += 0;
                    scores5.sphincs     += 3;
                    scores5.xmss        += 3;
                    break;
                case "Don't know":
                    scores5.dilithium   += 3;
                    scores5.falcon      += 1;
                    scores5.sphincs     += 3;
                    scores5.xmss        += 3;
                    break;
            }
            numberOfAnswers += 1;
        }

    } else if (sessionStorage.getItem('q5')) {
        // Use answer of question 5
        if (sessionStorage.getItem('q5').includes('Laptop (or higher performance)')) {
            scores5.dilithium   += 5;
            scores5.falcon      += 5;
            scores5.sphincs     += 5;
            scores5.xmss        += 5;
            numberOfAnswers     += 1;
        }
        if (sessionStorage.getItem('q5').includes('Smart phone')) {
            scores5.dilithium   += 5;
            scores5.falcon      += 5;
            scores5.sphincs     += 5;
            scores5.xmss        += 4;
            numberOfAnswers     += 1;
        }
        if (sessionStorage.getItem('q5').includes('IoT device')) {
            scores5.dilithium   += 4;
            scores5.falcon      += 3;
            scores5.sphincs     += 4;
            scores5.xmss        += 3;
            numberOfAnswers     += 1;
        }
        if (sessionStorage.getItem('q5').includes('Smart card')) {
            scores5.dilithium   += 3;
            scores5.falcon      += 3;
            scores5.sphincs     += 0;
            scores5.xmss        += 0;
            numberOfAnswers     += 1;
        }
        if (sessionStorage.getItem('q5').includes('Sensor')) {
            scores5.dilithium   += 2;
            scores5.falcon      += 3;
            scores5.sphincs     += 1;
            scores5.xmss        += 0;
            numberOfAnswers     += 1;
        }
        if (numberOfAnswers == 0 && sessionStorage.getItem('q5').includes("Don't know")) {
            scores5.dilithium   += 5;
            scores5.falcon      += 5;
            scores5.sphincs     += 2;
            scores5.xmss        += 0;
            numberOfAnswers     += 1;
        }

    } else {
        // Nothing is selected in question 5 or 5-1
        scores5 = {dilithium: 5, falcon: 5, sphincs: 2, xmss: 0};
        numberOfAnswers += 1;
    }

    // Normalise over number of chosen standardisation bodies
    if (numberOfAnswers >= 1) {
        scores5.dilithium   /= numberOfAnswers;
        scores5.falcon      /= numberOfAnswers;
        scores5.sphincs     /= numberOfAnswers;
        scores5.xmss        /= numberOfAnswers;
    }

    return scores5;
}

function question6() {
    switch (sessionStorage.getItem('q6')) {
        case 'Completely agree':
            return {dilithium: 5, falcon: 5, sphincs: 5, xmss: 5};
        case 'Agree':
            return {dilithium: 5, falcon: 5, sphincs: 4, xmss: 3};
        case 'Neutral':
            return {dilithium: 4, falcon: 4, sphincs: 3, xmss: 2};
        case 'Disagree':
            return {dilithium: 3, falcon: 3, sphincs: 2, xmss: 1};
        case 'Completely disagree':
            return {dilithium: 2, falcon: 2, sphincs: 1, xmss: 1};
        default:
            return {dilithium: 0, falcon: 0, sphincs: 0, xmss: 0};
    }
}

function averageSizes(size) {
    let average = {all: 0, withoutSk: 0, withoutSig: 0};
    let numberOfSizes = {all: 0, withoutSk: 0, withoutSig: 0};
    if (size.sk || size.sk == 0) {
        average.all += size.sk;
        average.withoutSig += size.sk;
        numberOfSizes.all += 1;
        numberOfSizes.withoutSig += 1;
    }
    if (size.pk || size.pk == 0) {
        average.all += size.pk;
        average.withoutSk += size.pk;
        average.withoutSig += size.pk;
        numberOfSizes.all += 1;
        numberOfSizes.withoutSk += 1;
        numberOfSizes.withoutSig += 1;
    }
    if (size.sig || size.sig == 0) {
        average.all += size.sig;
        average.withoutSk += size.sig;
        numberOfSizes.all += 1;
        numberOfSizes.withoutSk += 1;
    }
    if (numberOfSizes.all > 0) {
        average.all /= numberOfSizes.all;
    } else {
        average.all = -1;
    }
    if (numberOfSizes.withoutSk > 0) {
        average.withoutSk /= numberOfSizes.withoutSk;
    } else {
        average.withoutSk = -1;
    }
    if (numberOfSizes.withoutSig > 0) {
        average.withoutSig /= numberOfSizes.withoutSig;
    } else {
        average.withoutSig = -1;
    }
    return average
}

function question7(chosen) {
    let scores7 = {dilithium: 0, falcon: 0, sphincs: 0, xmss: 0};
    if (!chosen.dilithium.size) {
        // No sizes were chosen in question 1
        return scores7;
    }
    averages = {dilithium: averageSizes(chosen.dilithium.size), falcon: averageSizes(chosen.falcon.size), sphincs: averageSizes(chosen.sphincs.size), xmss: averageSizes(chosen.xmss.size)};

    if (sessionStorage.getItem('q7')) {
        // Use answer to question 7
        scores7.dilithium = Math.round(averages.dilithium.all);
        scores7.falcon = Math.round(averages.falcon.all);
        scores7.sphincs = Math.round(averages.sphincs.all);
        scores7.xmss = Math.round(averages.xmss.all);
        switch (sessionStorage.getItem('q7')) {
            case 'Completely agree':
                scores7.dilithium = Math.max(0, scores7.dilithium);
                scores7.falcon = Math.max(0, scores7.falcon);
                scores7.sphincs = Math.max(0, scores7.sphincs);
                scores7.xmss = Math.max(0, scores7.xmss);
                break;
            case 'Agree':
                scores7.dilithium = Math.max(0, scores7.dilithium - 1);
                scores7.falcon = Math.max(0, scores7.falcon - 1);
                scores7.sphincs = Math.max(0, scores7.sphincs - 1);
                scores7.xmss = Math.max(0, scores7.xmss - 1);
                break;
            case 'Neutral':
                scores7.dilithium = Math.max(0, scores7.dilithium - 2);
                scores7.falcon = Math.max(0, scores7.falcon - 2);
                scores7.sphincs = Math.max(0, scores7.sphincs - 2);
                scores7.xmss = Math.max(0, scores7.xmss - 2);
                break;
            case 'Disagree':
                scores7.dilithium = Math.max(0, scores7.dilithium - 3);
                scores7.falcon = Math.max(0, scores7.falcon - 3);
                scores7.sphincs = Math.max(0, scores7.sphincs - 3);
                scores7.xmss = Math.max(0, scores7.xmss - 3);
                break;
            case 'Completely disagree':
                scores7.dilithium = Math.max(0, scores7.dilithium - 4);
                scores7.falcon = Math.max(0, scores7.falcon - 4);
                scores7.sphincs = Math.max(0, scores7.sphincs - 4);
                scores7.xmss = Math.max(0, scores7.xmss - 4);
                break;
        }
    } else {
        // Use answers to questions 7-1, 7-2, 7-3
        let numberOfAnswers = 0;

        // Question 7-1
        if (sessionStorage.getItem('q7-1') > -1 && averages.dilithium.withoutSk > -1) {
            scores7.dilithium = Math.round((5 - averages.dilithium.withoutSk)/1000 * sessionStorage.getItem('q7-1') + averages.dilithium.withoutSk);
            scores7.falcon = Math.round((5 - averages.falcon.withoutSk)/1000 * sessionStorage.getItem('q7-1') + averages.falcon.withoutSk);
            scores7.sphincs = Math.round((5 - averages.sphincs.withoutSk)/1000 * sessionStorage.getItem('q7-1') + averages.sphincs.withoutSk);
            scores7.xmss = Math.round((5 - averages.xmss.withoutSk)/1000 * sessionStorage.getItem('q7-1') + averages.xmss.withoutSk);
            numberOfAnswers += 1
        } else if (averages.dilithium.withoutSk > -1) {
            scores7.dilithium = Math.max(0, Math.round(averages.dilithium.withoutSk) - 2);
            scores7.falcon = Math.max(0, Math.round(averages.falcon.withoutSk) - 2);
            scores7.sphincs = Math.max(0, Math.round(averages.sphincs.withoutSk) - 2);
            scores7.xmss = Math.max(0, Math.round(averages.xmss.withoutSk) - 2);
            numberOfAnswers += 1;
        }

        // Question 7-2
        if (sessionStorage.getItem('q7-2') > -1) {
            scores7.dilithium += Math.round((5 - averages.dilithium.all)/1000 * sessionStorage.getItem('q7-2') + averages.dilithium.all);
            scores7.falcon += Math.round((5 - averages.falcon.all)/1000 * sessionStorage.getItem('q7-2') + averages.falcon.all);
            scores7.sphincs += Math.round((5 - averages.sphincs.all)/1000 * sessionStorage.getItem('q7-2') + averages.sphincs.all);
            scores7.xmss += Math.round((5 - averages.xmss.all)/1000 * sessionStorage.getItem('q7-2') + averages.xmss.all);
            numberOfAnswers += 1
        } else {
            scores7.dilithium += Math.max(0, Math.round(averages.dilithium.all) - 2);
            scores7.falcon += Math.max(0, Math.round(averages.falcon.all) - 2);
            scores7.sphincs += Math.max(0, Math.round(averages.sphincs.all) - 2);
            scores7.xmss += Math.max(0, Math.round(averages.xmss.all) - 2);
            numberOfAnswers += 1;
        }

        // Question 7-3
        if (sessionStorage.getItem('q7-3') > -1 && averages.dilithium.withoutSig > -1) {
            scores7.dilithium += Math.round((5 - averages.dilithium.withoutSig)/1000 * sessionStorage.getItem('q7-3') + averages.dilithium.withoutSig);
            scores7.falcon += Math.round((5 - averages.falcon.withoutSig)/1000 * sessionStorage.getItem('q7-3') + averages.falcon.withoutSig);
            scores7.sphincs += Math.round((5 - averages.sphincs.withoutSig)/1000 * sessionStorage.getItem('q7-3') + averages.sphincs.withoutSig);
            scores7.xmss += Math.round((5 - averages.xmss.withoutSig)/1000 * sessionStorage.getItem('q7-3') + averages.xmss.withoutSig);
            numberOfAnswers += 1
        } else if (averages.dilithium.withoutSig > -1) {
            scores7.dilithium += Math.max(0, Math.round(averages.dilithium.withoutSig) - 2);
            scores7.falcon += Math.max(0, Math.round(averages.falcon.withoutSig) - 2);
            scores7.sphincs += Math.max(0, Math.round(averages.sphincs.withoutSig) - 2);
            scores7.xmss += Math.max(0, Math.round(averages.xmss.withoutSig) - 2);
            numberOfAnswers += 1;
        }

        if (numberOfAnswers >= 1) {
            scores7.dilithium   /= numberOfAnswers;
            scores7.falcon      /= numberOfAnswers;
            scores7.sphincs     /= numberOfAnswers;
            scores7.xmss        /= numberOfAnswers;
        }

    }

    return scores7;
}

function averagePerformances(performance, size) {
    let average = {all: 0, withoutSk: 0};
    let numberOfSizes = {all: 0, withoutSk: 0};
    if (performance.keygen || performance.keygen == 0) {
        average.all += performance.keygen;
        average.withoutSk += performance.keygen;
        numberOfSizes.all += 1;
        numberOfSizes.withoutSk += 1;
    }
    if (performance.sign || performance.sign == 0) {
        average.all += performance.sign;
        average.withoutSk += performance.sign;
        numberOfSizes.all += 1;
        numberOfSizes.withoutSk += 1;
    }
    if (performance.ver || performance.ver == 0) {
        average.all += performance.ver;
        average.withoutSk += performance.ver;
        numberOfSizes.all += 1;
        numberOfSizes.withoutSk += 1;
    }
    if (size.pk || size.pk == 0) {
        average.withoutSk += size.pk;
        numberOfSizes.withoutSk += 1;
    }
    if (size.sig || size.sig == 0) {
        average.withoutSk += size.sig;
        numberOfSizes.withoutSk += 1;
    }
    if (numberOfSizes.all > 0) {
        average.all /= numberOfSizes.all;
    } else {
        average.all = -1;
    }
    if (numberOfSizes.withoutSk > 0) {
        average.withoutSk /= numberOfSizes.withoutSk;
    } else {
        average.withoutSk = -1;
    }
    return average
}

function question8(chosen) {
    let scores8 = {dilithium: 0, falcon: 0, sphincs: 0, xmss: 0};
    if (!chosen.dilithium.size) {
        // No sizes were chosen in question 1
        return scores8;
    }
    averages = {dilithium: averagePerformances(chosen.dilithium.performance, chosen.dilithium.size), falcon: averagePerformances(chosen.falcon.performance, chosen.falcon.size), sphincs: averagePerformances(chosen.sphincs.performance, chosen.sphincs.size), xmss: averagePerformances(chosen.xmss.performance, chosen.xmss.size)};

    if (sessionStorage.getItem('q8')) {
        // Use answer to question 8
        scores8.dilithium = Math.round(averages.dilithium.all);
        scores8.falcon = Math.round(averages.falcon.all);
        scores8.sphincs = Math.round(averages.sphincs.all);
        scores8.xmss = Math.round(averages.xmss.all);
        switch (sessionStorage.getItem('q8')) {
            case 'Completely agree':
                scores8.dilithium = Math.max(0, scores8.dilithium);
                scores8.falcon = Math.max(0, scores8.falcon);
                scores8.sphincs = Math.max(0, scores8.sphincs);
                scores8.xmss = Math.max(0, scores8.xmss);
                break;
            case 'Agree':
                scores8.dilithium = Math.max(0, scores8.dilithium - 1);
                scores8.falcon = Math.max(0, scores8.falcon - 1);
                scores8.sphincs = Math.max(0, scores8.sphincs - 1);
                scores8.xmss = Math.max(0, scores8.xmss - 1);
                break;
            case 'Neutral':
                scores8.dilithium = Math.max(0, scores8.dilithium - 2);
                scores8.falcon = Math.max(0, scores8.falcon - 2);
                scores8.sphincs = Math.max(0, scores8.sphincs - 2);
                scores8.xmss = Math.max(0, scores8.xmss - 2);
                break;
            case 'Disagree':
                scores8.dilithium = Math.max(0, scores8.dilithium - 3);
                scores8.falcon = Math.max(0, scores8.falcon - 3);
                scores8.sphincs = Math.max(0, scores8.sphincs - 3);
                scores8.xmss = Math.max(0, scores8.xmss - 3);
                break;
            case 'Completely disagree':
                scores8.dilithium = Math.max(0, scores8.dilithium - 4);
                scores8.falcon = Math.max(0, scores8.falcon - 4);
                scores8.sphincs = Math.max(0, scores8.sphincs - 4);
                scores8.xmss = Math.max(0, scores8.xmss - 4);
                break;
        }
    } else {
        // Use answers to questions 8-1, 8-2, 8-3
        let numberOfAnswers = 0;

        // Question 8-1
        if (sessionStorage.getItem('q8-1') > -1 && averages.dilithium.withoutSk > -1) {
            scores8.dilithium = Math.round((5 - averages.dilithium.withoutSk)/60 * sessionStorage.getItem('q8-1') + averages.dilithium.withoutSk);
            scores8.falcon = Math.round((5 - averages.falcon.withoutSk)/60 * sessionStorage.getItem('q8-1') + averages.falcon.withoutSk);
            scores8.sphincs = Math.round((5 - averages.sphincs.withoutSk)/60 * sessionStorage.getItem('q8-1') + averages.sphincs.withoutSk);
            scores8.xmss = Math.round((5 - averages.xmss.withoutSk)/60 * sessionStorage.getItem('q8-1') + averages.xmss.withoutSk);
            numberOfAnswers += 1
        } else if (averages.dilithium.withoutSk > -1) {
            scores8.dilithium = Math.max(0, Math.round(averages.dilithium.withoutSk) - 2);
            scores8.falcon = Math.max(0, Math.round(averages.falcon.withoutSk) - 2);
            scores8.sphincs = Math.max(0, Math.round(averages.sphincs.withoutSk) - 2);
            scores8.xmss = Math.max(0, Math.round(averages.xmss.withoutSk) - 2);
            numberOfAnswers += 1;
        }

        // Question 8-2
        if (sessionStorage.getItem('q8-2') > -1) {
            scores8.dilithium += Math.round((5 - averages.dilithium.all)/60 * sessionStorage.getItem('q8-2') + averages.dilithium.all);
            scores8.falcon += Math.round((5 - averages.falcon.all)/60 * sessionStorage.getItem('q8-2') + averages.falcon.all);
            scores8.sphincs += Math.round((5 - averages.sphincs.all)/60 * sessionStorage.getItem('q8-2') + averages.sphincs.all);
            scores8.xmss += Math.round((5 - averages.xmss.all)/60 * sessionStorage.getItem('q8-2') + averages.xmss.all);
            numberOfAnswers += 1;
        } else {
            scores8.dilithium += Math.max(0, Math.round(averages.dilithium.all) - 2);
            scores8.falcon += Math.max(0, Math.round(averages.falcon.all) - 2);
            scores8.sphincs += Math.max(0, Math.round(averages.sphincs.all) - 2);
            scores8.xmss += Math.max(0, Math.round(averages.xmss.all) - 2);
            numberOfAnswers += 1;
        }

        if (numberOfAnswers >= 1) {
            scores8.dilithium   /= numberOfAnswers;
            scores8.falcon      /= numberOfAnswers;
            scores8.sphincs     /= numberOfAnswers;
            scores8.xmss        /= numberOfAnswers;
        }

    }

    return scores8;
}

function question9() {

    let scores9 = {dilithium: 0, falcon: 0, sphincs: 0, xmss: 0};

    let numberOfAnswers = 0;

    if (sessionStorage.getItem('q9-1')) {
        // Use answer of question 9-1
        if (sessionStorage.getItem('q9-1').includes('Signing')) {
            scores9.dilithium   += 5;
            scores9.falcon      += 1;
            scores9.sphincs     += 5;
            scores9.xmss        += 5;
            numberOfAnswers     += 1;
        }
        if (sessionStorage.getItem('q9-1').includes('Verification')) {
            scores9.dilithium   += 5;
            scores9.falcon      += 5;
            scores9.sphincs     += 5;
            scores9.xmss        += 5;
            numberOfAnswers     += 1;
        }
        if (sessionStorage.getItem('q9-1').includes('Key generation')) {
            scores9.dilithium   += 5;
            scores9.falcon      += 1;
            scores9.sphincs     += 5;
            scores9.xmss        += 5;
            numberOfAnswers     += 1;
        }
        if (numberOfAnswers == 0) {
            scores9.dilithium   += 5;
            scores9.falcon      += 1;
            scores9.sphincs     += 5;
            scores9.xmss        += 5;
            numberOfAnswers     += 1;
        }
    } else {
        // Use answer of question 9
        switch (sessionStorage.getItem('q9')) {
            case 'Yes':
                scores9.dilithium   = 5;
                scores9.falcon      = 1;
                scores9.sphincs     = 5;
                scores9.xmss        = 5;
                break;
            case 'No':
                break;
            default:
                scores9.dilithium   = 5;
                scores9.falcon      = 1;
                scores9.sphincs     = 5;
                scores9.xmss        = 5;
        }

        numberOfAnswers += 1;
    }

    // Normalise over number of chosen answers
    if (numberOfAnswers >= 1) {
        scores9.dilithium   /= numberOfAnswers;
        scores9.falcon      /= numberOfAnswers;
        scores9.sphincs     /= numberOfAnswers;
        scores9.xmss        /= numberOfAnswers;
    }

    return scores9;
}

function question10() {
    if (sessionStorage.getItem('q10') == 'Yes') {
        return 1;
    }
    return 0;
}

function calculateScores() {
    let dilithiumScore = 0;
    let falconScore = 0;
    let sphincsScore = 0;
    let xmssScore = 0;

    let maxScore = 40;

    // Question 1
    chosen = question1()

    // Question 2
    let scores2 = question2();
    let factor = 1;
    if (sessionStorage.getItem('q11').includes('Question 2: Timespan') || sessionStorage.getItem('q11').includes('Question 2 (Follow-up): Classified information')) {
        factor = 2;
        maxScore += 5;
    }
    dilithiumScore += factor * scores2.dilithium;
    falconScore += factor * scores2.falcon;
    sphincsScore += factor * scores2.sphincs;
    xmssScore += factor * scores2.xmss;

    // Question 3
    let scores3 = question3();
    factor = 1;
    if (sessionStorage.getItem('q11').includes('Question 3: Performance vs security') || sessionStorage.getItem('q11').includes('Question 3-1: Conservativeness vs efficiency') || sessionStorage.getItem('q11').includes('Question 3-2: Security level') || sessionStorage.getItem('q11').includes('Question 3-3: Hybrid mode')) {
        factor = 2;
        maxScore += 5;
    }
    dilithiumScore += factor * scores3.dilithium;
    falconScore += factor * scores3.falcon;
    sphincsScore += factor * scores3.sphincs;
    xmssScore += factor * scores3.xmss;

    // Question 4
    let scores4 = question4();
    factor = 1;
    if (sessionStorage.getItem('q11').includes('Question 4: Standardization')) {
        factor = 2;
        maxScore += 5;
    }
    dilithiumScore += factor * scores4.dilithium;
    falconScore += factor * scores4.falcon;
    sphincsScore += factor * scores4.sphincs;
    xmssScore += factor * scores4.xmss;

    // Question 5
    let scores5 = question5();
    factor = 1;
    if (sessionStorage.getItem('q11').includes('Question 5: Platform') || sessionStorage.getItem('q11').includes('Question 5-1: Hardware acceleration') || sessionStorage.getItem('q11').includes('Question 5-2: Floating point arithmetic')) {
        factor = 2;
        maxScore += 5;
    }
    dilithiumScore += factor * scores5.dilithium;
    falconScore += factor * scores5.falcon;
    sphincsScore += factor * scores5.sphincs;
    xmssScore += factor * scores5.xmss;

    // Question 6
    let scores6 = question6();
    factor = 1;
    if (sessionStorage.getItem('q11').includes('Question 6: New hardware')) {
        factor = 2;
        maxScore += 5;
    }
    dilithiumScore += factor * scores6.dilithium;
    falconScore += factor * scores6.falcon;
    sphincsScore += factor * scores6.sphincs;
    xmssScore += factor * scores6.xmss;

    // Question 7
    let scores7 = question7(chosen);
    factor = 1;
    if (sessionStorage.getItem('q11').includes('Question 7: Space requirement') || sessionStorage.getItem('q11').includes('Question 7-1: Communication requirement') || sessionStorage.getItem('q11').includes('Question 7-2: Memory requirement') || sessionStorage.getItem('q11').includes('Question 7-3: Storage requirement')) {
        factor = 2;
        maxScore += 5;
    }
    dilithiumScore += factor * scores7.dilithium;
    falconScore += factor * scores7.falcon;
    sphincsScore += factor * scores7.sphincs;
    xmssScore += factor * scores7.xmss;

    // Question 8
    let scores8 = question8(chosen);
    factor = 1;
    if (sessionStorage.getItem('q11').includes('Question 8: Delay requirement') || sessionStorage.getItem('q11').includes('Question 8-1: Communication time') || sessionStorage.getItem('q11').includes('Question 8-2: Computation time')) {
        factor = 2;
        maxScore += 5;
    }
    dilithiumScore += factor * scores8.dilithium;
    falconScore += factor * scores8.falcon;
    sphincsScore += factor * scores8.sphincs;
    xmssScore += factor * scores8.xmss;

    // Question 9
    let scores9 = question9();
    factor = 1;
    if (sessionStorage.getItem('q11').includes('Question 9: Physical access') || sessionStorage.getItem('q11').includes('Question 9-1: Functionality')) {
        factor = 2;
        maxScore += 5;
    }
    dilithiumScore += factor * scores9.dilithium;
    falconScore += factor * scores9.falcon;
    sphincsScore += factor * scores9.sphincs;
    xmssScore += factor * scores9.xmss;

    // Question 10
    xmssScore = xmssScore * question10();

    // Normalise to range 0-100
    dilithiumScore = Math.round(dilithiumScore / maxScore * 100);
    falconScore = Math.round(falconScore / maxScore * 100);
    sphincsScore = Math.round(sphincsScore / maxScore * 100);
    xmssScore = Math.round(xmssScore / maxScore * 100)

    //  Question 11 has been implemented with the factors above

    let scores = {"Dilithium": dilithiumScore, "Falcon": falconScore, "Sphincs+": sphincsScore, "XMSS": xmssScore};
    const sortedScores = Object.fromEntries(Object.entries(scores).sort(([, value1], [, value2]) => value2 - value1));

    return sortedScores;
}

function adviceSecurityLevel() {
    switch (sessionStorage.getItem('q3-2')) {
        case '128 bits - NIST level 1 - 3072 bit RSA keys - 256 bit ECC keys':
            return 'Dilithium2, Falcon-512, Sphincs+-128 or XMSS-256';
        case '192 bits - NIST level 3 - 7680 bit RSA keys - 384 bit ECC keys':
            return 'Dilithium3, Sphincs+-192 or XMSS-256';
        case '256 bits - NIST level 5 - 15360 bit RSA keys - 521 bit ECC keys':
            return 'Dilithium5, Falcon-1024, Sphincs+-256 or XMSS-256';
        default:
            return false;
    }
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
