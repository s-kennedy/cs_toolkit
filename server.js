const shell = require("shelljs")
const express = require('express');

const app = express();

app.get('/build', (req, res) => {
  shell.exec(`gatsby build`)
  res.status(200).send('Deploying app!').end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});