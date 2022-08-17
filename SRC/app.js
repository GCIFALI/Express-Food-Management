const servidor = require('./Server/Config')
const app = servidor.app
const porta = servidor.port

const consign = require('consign')

consign().include('./SRC/Server/Routes').into(app)

app.listen(porta)
console.log("Server listening on http://localhost:" + porta)