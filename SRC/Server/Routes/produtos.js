module.exports = (app) => {
    app.get('/produtos', async (req, res) => {
        const Users = require('../Schemas/Users')
        const Produtos = require('../Schemas/Products');
        const Connection = require('../DB')()
        var UserSerial = req.query.serial
        var User = await Users.findOne({serial: UserSerial}).then(async (response) => {
            if (response == null) {
                return res.redirect('/login');
            } else {
                var ProductsList = await Produtos.find({UserSerial: UserSerial, Status: 0}).sort({ExpirationDate:1})
                ProductsList.forEach(product => {
                    product.ExpirationDate = product.ExpirationDate.toLocaleDateString()
                })
                ProductsList.forEach(function(product){
                    product.ExpirationDate = product.ExpirationDate.toLocaleDateString()
                } )

                res.render('produtos.ejs', {SerialUser: UserSerial, Products: ProductsList});
            }
        })
    })
    app.get('/cadastrarproduto', async (req, res) => {   
        var UserSerial = req.query.serial
        
        const Users = require('../Schemas/Users')
        await Users.findOne({serial: UserSerial}).then(async (response) => {
            if (response == null) {
                return res.redirect('/login');
            } else {
                res.render('cadastrarproduto.ejs', { UserSerial: UserSerial});
            }
        })
    })
    app.post('/cadastrarproduto', async (req, res) => { 
        var ProductName = req.body.produto 
        var ExpirationDate = req.body.validade
        var UserSerial = req.body.SerialUserComp
        
        if (ProductName !== null || ProductName !== "") {
            const Products = require('../Schemas/Products');
            const Connection = require('../DB')()
    
            await new Products({
                UserSerial: UserSerial,
                ProductName: ProductName,
                ExpirationDate: ExpirationDate,
                Status: 0
            }).save()
            res.redirect(`/produtos?serial=${UserSerial}`)
        }
    })
    app.post('/editarproduto', async (req, res) => {
        var NewProductName = req.body.novonomeproduto
        var NewExpirationDate = req.body.novavalidadeproduto
        var UserSerial = req.body.SerialUserComp
        var ProductID = req.body.ProductID

        if (NewProductName !== null || NewProductName !== "") {
            const Products = require('../Schemas/Products');
            const Connection = require('../DB')()
            await Products.updateOne({UserSerial: UserSerial, _id: ProductID}, {ProductName: NewProductName, ExpirationDate: NewExpirationDate}).then(async (response) => {
                res.redirect(`/produtos?serial=${UserSerial}`)
            })
        }
    })

    app.get('/deletarproduto', async (req, res) => {
        var ProductID = req.query.id
        const Products = require('../Schemas/Products');
        const Connection = require('../DB')()
        await Products.findOne({_id: ProductID}).then(async (response) => {
            await res.redirect(`/produtos?serial=${response.UserSerial}`)
            await Products.deleteOne({_id: ProductID})
        })
    })  

    app.get('/produtosconsumidos', async (req, res) => {   
        var UserSerial = req.query.serial

        const Produtos = require('../Schemas/Products');
        const Users = require('../Schemas/Users')

        await Users.findOne({serial: UserSerial}).then(async (response) => {
            if (response == null) {
                return res.redirect('/login');
            } else {
                var ProductsList = await Produtos.find({UserSerial: UserSerial, Status: 1}).sort({ExpirationDate:1})
                res.render('produtosconsumidos.ejs', { Products: ProductsList, SerialUser: UserSerial});
            }
        })
    })

    app.get('/produtosvencidos', async (req, res) => {   
        var UserSerial = req.query.serial

        const Produtos = require('../Schemas/Products');
        const Users = require('../Schemas/Users')

        await Users.findOne({serial: UserSerial}).then(async (response) => {
            if (response == null) {
                return res.redirect('/login');
            } else {
                var ProductsList = await Produtos.find({UserSerial: UserSerial, Status: 2}).sort({ExpirationDate:1})
                res.render('produtosvencidos.ejs', { Products: ProductsList, SerialUser: UserSerial});
            }
        })
    })

    app.get('/editarproduto', async (req, res) => {   
        var url = req.query.id

        var ProductID = url.split('?')[0]
        var UserSerial = url.split('=')[1]

        const Produtos = require('../Schemas/Products');
        const Users = require('../Schemas/Users')

        await Produtos.findOne({_id: ProductID, UserSerial: UserSerial}).then(async (response) => {
            if (response == null) {
                return res.redirect('/login');
            } else {
                res.render('editarproduto.ejs', {IDProduct: ProductID, UserSerial: UserSerial});
                var ProductsList = await Produtos.findOneAndUpdate({UserSerial: UserSerial, IDProduct: ProductID})
            }
        })
    })

    app.get('/produtoconsumido', async (req, res) => {   
        var ProductID = req.query.id
        const Produtos = require('../Schemas/Products');
        await Produtos.findOneAndUpdate({_id: ProductID}, {Status: 1}).then(async (response) => {
            res.redirect('back');
        })
    })

    app.get('/produtovencido', async (req, res) => {   
        var ProductID = req.query.id
        const Produtos = require('../Schemas/Products');
        await Produtos.findOneAndUpdate({_id: ProductID}, {Status: 2}).then(async (response) => {
            res.redirect('back');
        })
    })

}