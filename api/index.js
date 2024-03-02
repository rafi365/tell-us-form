const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/submitform',upload.none(), (req, res) => {
  console.log(req.body)
  res.send('post it!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})