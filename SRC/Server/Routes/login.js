const bcrypt = require('bcryptjs')
const Connection = require('../DB')()

module.exports = (app) => {
    app.get('/login', (req, res) => {
        res.render('login.ejs')
    })

    app.post('/login', async (req, res) => {
        const Connection = require('../DB')()

        const Users = require('../Schemas/Users')
        await Users.findOne({ email: req.body.email }).then(async (response) => {
            if (response == null) {
                return res.send("Email/Senha incorretos...")
            } else {
                await bcrypt.compare(req.body.password, response.password).then(async (result) => {
                    if (result == null) {
                        return res.send("Email/Senha incorretos...")
                    } else {
                        res.redirect(`/produtos?serial=${response.serial}`)
                    }
                })

            }
        })
    })
}