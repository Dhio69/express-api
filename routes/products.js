var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator')
const v = new Validator();
const { Product, ProductTypes } = require('../models')
require('dotenv').config()
const authenticateToken = require('../jwt')


// router.use(authenticateToken)
router.get('/' ,async (req, res) => {
    let product = await Product.findAll({ include: ProductTypes });
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    return res.status(200).json({
        code : 200,
        message : 'success',
        data : product
    })
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    let product = await Product.findByPk(id, { include: ProductTypes });
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    return res.status(200).json({
        code : 200,
        message : 'success',
        data : product
    })
})

router.post('/', async (req, res) => {
    const schema = {
        name : 'string',
        brand : 'string',
        description : 'string|optional',
        image : 'string|optional',
        type : 'number|optional',
        stock : 'number',
    }
    const validate = v.validate(req.body, schema);
    res.header("Access-Control-Allow-Origin", "*");
    if (validate.length) {
        return res.status(400).json({
            code : 200,
            message : 'error',
            data : validate
        })
    }

    let product = await Product.create(req.body)

    return res.status(200).json({
        code : 200,
        message : 'success',
        data : product
    })
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    let product = await Product.findByPk(id)
    if (!product) {
        return res.status(400).json({
            code : 200,
            message : 'product not found',
            data : product
        })
    }

    const schema = {
        name : 'string|optional',
        brand : 'string|optional',
        description : 'string|optional',
        image : 'string|optional',
        type : 'number|optional',
        stock : 'number|optional',
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json({
            code : 200,
            message : 'error',
            data : validate
        })
    }

    product = await product.update(req.body)

    return res.status(200).json({
        code : 200,
        message : 'success',
        data : product
    })
})

router.delete('/:id', async (req, res) => {
    const ids = req.params.id;
    let product = await Product.destroy({where: { id: ids }})
    return res.status(200).json({
        code : 200,
        message : 'success',
        data : product
    })
})

module.exports = router;