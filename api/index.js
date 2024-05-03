const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
require('dotenv').config();
const mongoose = require('mongoose');
const formdb = require('./models/formdb');
(async () => {
  await mongoose.connect(process.env.MONGOCONNURI);
})();
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/submitform', upload.none(), async (req, res) => {
  console.log(req.body)
  const reqform = req.body;
  await formdb.create({
    name: reqform['input_name'],
    email: reqform['input_email'],
    message: reqform['input_msg'],
  });
  res.send('post it!')
})

app.post('/api/getdata', upload.none(), async (req, res) => {
  const reqform = req.body;
  if(reqform['password'] == process.env.ADMINPASSWORD){
    const dbres = await formdb.find({});
    res.status(200).json(dbres);
  }else{
    res.status(401).json('Wrong Password!');
  }
})

// Handling non matching request from the client
app.use((req, res, next) => {
  res.status(404).json('API Endpoint not found');
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(500).json(err.message);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})