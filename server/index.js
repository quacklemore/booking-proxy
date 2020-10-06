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

app.post('/api/pictures/', (req, res) => {
  console.log('hotel', req.body.hotel);
  let options = {
    uri: 'http://localhost:4000/api/pictures/',
    json: true,
    body: {hotel: req.body.hotel}
  }
  request.post(options).pipe(res);
});

app.get('/api/hotel/:hotelId', (req, res) => {
  let hotelId = req.params.hotelId
  request(`http://localhost:4001/api/hotel/${hotelId}`).pipe(res);
});

app.get('/reviews', (req, res) => {
  request('http://localhost:4003/reviews').pipe(res);
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..','public', 'index.html'));
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});