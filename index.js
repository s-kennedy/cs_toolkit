const express = require('express')
const shell = require('shelljs')
const { spawn } = require("child_process")
const path = require("path")
const app = express()

app.get('/deploy', (req, res) => {
  const child = shell.exec(`yarn deploy`, { async: true });
  res.json({ "status": "success" });

  child.on(`exit`, (code, signal) => {
    console.log(
      `====== Child process exited with code ${code} and signal ${signal} ======`
    )
  })
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))