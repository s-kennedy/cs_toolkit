const express = require('express')
const shell = require('shelljs')
const admin = require("firebase-admin");
const serviceAccount = require("./firebaseServiceAccountKey.json");
const cors = require('cors')

const app = express()
app.use(cors({credentials: true, origin: true}))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL
});

app.get('/', (req, res) => {
  const authHeader = req.headers['authorization']
  if (!!authHeader) {
    const token = authHeader.split(' ')[1];
    const checkRevoked = true;

    admin.auth().verifyIdToken(token, checkRevoked)
      .then(payload => {
        console.log("Deploying toolkit!")

        const child = shell.exec(`yarn deploy`, { async: true });
        res.json({ "status": "success" });

        child.on(`exit`, (code, signal) => {
          console.log(
            `====== Child process exited with code ${code} and signal ${signal} ======`
          )
        })

        child.on(`error`, err => console.log(`err:`, err))
      })
      .catch(error => {
        if (error.code == 'auth/id-token-revoked') {
          // Token has been revoked. Inform the user to reauthenticate or signOut() the user.
          res.json({ "status": "unauthorized", "message": "Your session is no longer valid. Please log in and try again." });
        } else {
          res.json({ "status": "unauthorized", "message": "Your account is not authorized for this action."})
        }
      });
  } else {
    res.json({ "status": "unauthorized", "message": "Missing authorization token"})
  }
})


app.listen(8080, () => console.log('App listening on port 8080!'))
