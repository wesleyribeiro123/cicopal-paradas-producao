const functions = require("firebase-functions")
const express = require("express")
const app = express()
const firebase = require("firebase/app")
const cors = require("cors")

const firebaseConfig = require("./firebase-config")

require("firebase/auth")
require("firebase/firestore")

const firebaseApp = firebase.default.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebaseApp.auth()

const authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send("Unauthorized")
  }
  let authorization = req.headers.authorization;
  authorization = authorization.replace("Basic ", "")
  authorization = Buffer.from(authorization, "base64").toString()
  const [email, password] = authorization.split(":")
  console.log({ email, password });

  if (!email || !password) {
    return res.status(403).send("Unauthorized")
  }
  auth
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      req.body.user = user.user.uid;
      return next();
    })
    .catch(e => {
      res.status(403).send(e.message)
    })
}

app.use(cors())
app.use(authenticate)

app.post("/:collection", async(req, res) => {
  const coll = req.params.collection
  const body = req.body
  const created_at = firebase.firestore.Timestamp.fromDate(new Date())

  const data = {
    ...body,
    created_at
  }

  try {
    const doc = await db.collection(coll).add(data)
    return res.status(201).json({ status_request: "ok", id: doc.id })
  } catch (e) {
    return res
      .status(500)
      .json({ status_request: "error", error: e.message })
  }
})

app.put("/:collection/:id", async (req, res) => {
  const coll = req.params.collection
  const id = req.params.id
  const body = req.body
  const update_at = firebase.firestore.Timestamp.fromDate(new Date())

  try {
    const doc = await db
      .collection(coll)
      .doc(id)
      .get()
    if (!doc.exists) {
      return res.status(404).send("Invalid ID");
    }

    const data= {
      ...doc.data(),
      ...body,
      update_at
    }
    await db
      .collection(coll)
      .doc(id)
      .set(data)

    return res.status(201).json(data)
  } catch (e) {
    return res.status(500).send(e.message)
  }
})

app.delete("/:collection/:id", async (req, res) => {
  const coll = req.params.collection
  const id = req.params.id

  try {
    await db
      .collection(coll)
      .doc(id)
      .delete()
    return res.status(200).send()
  } catch (e) {
    return res.status(500).send(e.message)
  }
})

app.get("/:collection/:status", async (req, res) => {
  const coll = req.params.collection
  const status = req.params.status

  const data = []

  try {
    const querySnashot = await db
      .collection(coll)
      .where("status", "==", status)
      .get()

    querySnashot.forEach(doc => {
      data.push({
        id: doc.id,
        ...doc.data()
      })
    })

    return res.status(201).json(data)
  } catch (e) {
    return res.status(500).send(e.message)
  }
})

exports.api = functions.https.onRequest(app)