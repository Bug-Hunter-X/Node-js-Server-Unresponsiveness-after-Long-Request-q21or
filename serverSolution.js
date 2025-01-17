const express = require('express');
const app = express();
const { Worker } = require('worker_threads');
app.get('/', (req, res) => {
  const worker = new Worker('./worker.js');
  worker.on('message', (result) => {
    res.send(result);
  });
  worker.on('error', (err) => {
    res.status(500).send('Error processing request');
  });
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
// worker.js
const { parentPort } = require('worker_threads');
setTimeout(() => {
  parentPort.postMessage('Hello from worker!');
}, 5000);