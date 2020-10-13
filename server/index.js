const path = require('path');
const express = require('express');
const request = require('request');

const app = express();

const PORT = 4004;

app.use(express.static(__dirname + '/../public/'));
app.use(express.json())

app.use(express.static(path.join(__dirname, '..','public')));



app.get('/api/low-days/:id', (req, res) => {
  let id = req.params.id;
  request(`http://localhost:4002/api/low-days/${id}`).pipe(res);
});

app.get('/api/pictures/:id', (req, res) => {
  let id = req.params.id;

  request(`http://localhost:4000/api/pictures/${id}`).pipe(res);
});

app.get('/api/hotel/:hotelId', (req, res) => {
  let hotelId = req.params.hotelId
  request(`http://localhost:4001/api/hotel/${hotelId}`).pipe(res);
});

app.get('/hotel/:hotel', (req, res) => {
  request(`http://localhost:4003/hotel/${req.params.hotel}`).pipe(res);
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..','public', 'index.html'));
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});