import './style.css';

const refreshBtn = document.querySelector('.refresh');
const submitBtn = document.querySelector('.submit');
const userName = document.querySelector('.userName');
const score = document.querySelector('.score');
const table = document.querySelector('.table');
const scoresURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/c2SA5FRX072PtSEl1hwJ/scores/';

const sendHttpRequest = (method, url, data) => fetch(url, {
  method,
  body: JSON.stringify(data),
  headers: data ? { 'Content-Type': 'application/json' } : {},
});

const populateTable = (arr) => {
  table.textContent = '';
  for (let i = 0; i < arr.length; i += 1) {
    const trow = document.createElement('tr');
    const userData = document.createElement('td');
    const scoreData = document.createElement('td');
    userData.textContent = arr[i].user;
    scoreData.textContent = arr[i].score;
    table.appendChild(trow);
    trow.appendChild(userData);
    trow.appendChild(scoreData);
  }
};

const getData = async () => {
  const responseData = await sendHttpRequest('GET', scoresURL);
  const data = await responseData.json();
  const sortedData = data.result.sort((a, b) => b.score - a.score);
  populateTable(sortedData);
};
const sendData = async () => {
  await sendHttpRequest('POST', scoresURL, {
    user: userName.value,
    score: score.value,
  });
  getData();
  userName.value = '';
  score.value = '';
};
getData();
refreshBtn.addEventListener('click', () => window.location.reload());
submitBtn.addEventListener('click', sendData);
