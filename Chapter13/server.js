const express = require('express');
const request = require('request');

const app = express();

app.use(express.static('./'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  console.log('req', req);
  const api = request('http://api.jquery.com/api');
  req.pipe(api);
  api.pipe(res);
});

app.get('/g', (req, res) => {
  res.json(G_entries);
});

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
