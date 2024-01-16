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

const benchmarkSchemes = [
  { name: 'Kyber', answers: ['yes', 'no', 'yes', 'Kyber', 'yes'] },
  { name: 'McEliece', answers: ['yes', 'yes', 'no', 'RSA', 'yes'] },
  { name: 'FrodoKEM', answers: ['no', 'yes', 'yes', "I don't know", 'no'] },
];
