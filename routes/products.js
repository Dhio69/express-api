var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator')
const v = new Validator();
const { Product, ProductTypes } = require('../models')
require('dotenv').config()
const authenticateToken = require('../jwt')


router.use(authenticateToken)
router.get('/' ,async (req, res) => {
    let product = await Product.findAll({ include: ProductTypes });
    
    return res.status(200).json({
        code : 200,
        message : 'success',
        data : product
    })
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    let product = await Product.findByPk(id, { include: ProductTypes });
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
    }
    const validate = v.validate(req.body, schema);
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

module.exports = router;