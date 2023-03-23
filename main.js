function tokenPriceCalculator(pricePer1k, dailyBudget = null, monthlyBudget = null) {
  let tokensPerDay, tokensPerMonth;
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

const form = document.getElementById('token-form');
const results = document.getElementById('results');

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

  const [tokensPerDay, tokensPerMonth] = tokenPriceCalculator(pricePer1k, dailyBudget, monthlyBudget);
  const resultTokens = budgetType === 'daily' ? tokensPerDay : tokensPerMonth;

  results.textContent = `Tokens: ${resultTokens}`;
});