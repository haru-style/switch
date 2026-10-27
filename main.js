const amount = document.getElementById('amount');
const from = document.getElementById('from');
const to = document.getElementById('to');
const result = document.getElementById('result');

async function convert() {
  const value = parseFloat(amount.value);
  if (isNaN(value) || value < 0) {
    result.textContent = '올바른 금액을 입력하세요.';
    return;
  }

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from.value}`);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    const converted = value * data.rates[to.value];
    result.textContent = `${value.toLocaleString()} ${from.value} = ${converted.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${to.value}`;
  } catch {
    result.textContent = '환율 정보를 가져오지 못했습니다.';
  }
}

document.getElementById('convert').addEventListener('click', convert);

document.getElementById('swap-btn').addEventListener('click', () => {
  [from.value, to.value] = [to.value, from.value];
  if (amount.value !== '') convert();
});
