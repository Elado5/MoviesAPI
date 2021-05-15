//load modules

const express = require(`express`)
const cors = require(`cors`)
const http = require(`http`)
const path = require(`path`)

//global variables
const PORT = process.env.PORT || 5000
process.setMaxListeners(100) // ask shai

//create the server -> use the modules
let app = express()
app.use(cors())
app.use(express.json())

//create static folder with read access
app.use(express.static(__dirname + '/build/'))

//send back the index.html in the static ''build'' folder
app.get(`/*`, (req, res) => res.sendFile(path.join(__dirname)))

//routes
app.use(`/api/movies`, require(`./server/routes/movies`))

//apply the http server - use the http
const server = http.createServer(app)

//run the server i created
server.listen(PORT, () => {console.log(`yo! server is live at http://localhost:${PORT}`)})