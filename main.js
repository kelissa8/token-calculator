const form = document.getElementById('token-form');
const additionalForm = document.getElementById('additional-form');
const results = document.getElementById('results');
const additionalQuestions = document.getElementById('additional-questions');
const donateButton = document.getElementById('donate-button');

let tokensPerDay, tokensPerMonth;

function tokenPriceCalculator(pricePer1k, dailyBudget = null, monthlyBudget = null) {
  if (dailyBudget !== null) {
    tokensPerDay = dailyBudget / pricePer1k * 1000;
    tokensPerMonth = tokensPerDay * 30;
  } else {
    tokensPerDay = (monthlyBudget / 30) / pricePer1k * 1000;
    tokensPerMonth = monthlyBudget / pricePer1k * 1000;
  }

  return [tokensPerDay, tokensPerMonth];
}

function calculateMessages(tokens, tokensPerMessage = null, messagesPerDay = null) {
  let messages;
  if (tokensPerMessage !== null) {
    messages = tokens / tokensPerMessage;
  } else {
    tokensPerMessage = tokens / messagesPerDay;
    messages = messagesPerDay;
  }

  return [messages, tokensPerMessage];
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const pricePer1k = parseFloat(document.getElementById('price-per-1k').value);
  const budgetType = document.getElementById('budget-type').value;
  const budget = parseFloat(document.getElementById('budget').value);

  let dailyBudget, monthlyBudget;
  if (budgetType === 'daily') {
    dailyBudget = budget;
    monthlyBudget = null;
  } else {
    dailyBudget = null;
    monthlyBudget = budget;
  }

  [tokensPerDay, tokensPerMonth] = tokenPriceCalculator(pricePer1k, dailyBudget, monthlyBudget);

  const resultTokens = budgetType === 'daily' ? tokensPerDay : tokensPerMonth;

  results.textContent = `Tokens: ${resultTokens.toFixed(2)}`;

  additionalQuestions.style.display = 'block';
});

additionalForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const calcType = document.getElementById('calc-type').value;
  const calcValue = parseFloat(document.getElementById('calc-value').value);

  let tokensPerMessage, messagesPerDay;
  if (calcType === 'tokens-per-message') {
    tokensPerMessage = calcValue;
    messagesPerDay = null;
  } else {
    tokensPerMessage = null;
    messagesPerDay = calcValue;
  }

  const resultTokens = budgetType === 'daily' ? tokensPerDay : tokensPerMonth;
const [messages, calculatedTokensPerMessage] = calculateMessages(resultTokens, tokensPerMessage, messagesPerDay);

  let resultText;
  if (calcType === 'tokens-per-message') {
    resultText = `Messages per day: ${messages.toFixed(2)}`;
  } else {
    resultText = `Tokens per message: ${calculatedTokensPerMessage.toFixed(2)}`;
  }

  results.textContent += ` | ${resultText}`;
});
