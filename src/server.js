const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.static('out'))

app.use(cors())

app.get("/NCEAStudy/Contact", function (req, res) {
    res.send("very cool")
})
app.listen(3000)
