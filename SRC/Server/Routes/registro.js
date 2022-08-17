module.exports = (app) => {
    const bcryptjs = require('bcryptjs')

    app.get('/registro', (req, res) => {
        res.render('registro.ejs')
    })

    app.post('/registro', async (req, res) => {
        var Data = req.body
        const Connection = require('../DB')()
        const Users = require('../Schemas/Users')

        await Users.findOne({ email: Data.email }).then(async users =>{
            if (users) {
                res.send("Email já cadastrado...")
            } else {
                var UserID = require('crypto').randomBytes(164).toString('hex')

                await bcryptjs.hash(Data.password, 10).then(async (hash) => {
                    await new Users({
                        serial: UserID,
                        name: Data.name,
                        email: Data.email,
                        password: hash
                    }).save()
                    res.redirect('/login')
                })
            }
        })
    })
}