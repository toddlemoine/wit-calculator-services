const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

function terms(req, fromBody) {
  const root = fromBody ? req.body : req.query;
  return [
    parseInt(root.term1, 10),
    parseInt(root.term2, 10)
  ];
}

function sendResponse(res, result) {
  Number.isNaN(result)
    ? res.status(500).send({ error: 'NaN' })
    : res.json({ result });
}

app.get('/', (req, res) => {
  res.send('It works!');
});

app.get('/add', (req, res) => {
  const [term1, term2] = terms(req);
  sendResponse(res, term1+term2);
})

app.post('/add', (req, res) => {
  const [term1, term2] = terms(req, true);
  sendResponse(res, term1+term2);
})

app.get('/subtract', (req, res) => {
  const [term1, term2] = terms(req);
  sendResponse(res, term1-term2);
});

app.post('/subtract', (req, res) => {
  const [term1, term2] = terms(req, true);
  sendResponse(res, term1-term2);
});

app.get('/multiply', (req, res) => {
  const [term1, term2] = terms(req);
  sendResponse(res, term1*term2);
});

app.post('/multiply', (req, res) => {
  const [term1, term2] = terms(req, true);
  sendResponse(res, term1*term2);
});

app.get('/divide', (req, res) => {
  const [term1, term2] = terms(req);
  sendResponse(res, term1/term2);
});

app.post('/divide', (req, res) => {
  const [term1, term2] = terms(req, true);
  sendResponse(res, term1/term2);
})


app.listen(9001, () => {
  console.log('Calculator services running, with server listening on port 9001.')
});
