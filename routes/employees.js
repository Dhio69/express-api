var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator')
const v = new Validator();
const { Employee } = require('../models')
require('dotenv').config()
const authenticateToken = require('../jwt')

router.use(authenticateToken)
router.get('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    let employee = await Employee.findAll();
   
    return res.status(200).json({
        code : 200,
        message : 'success',
        data : employee
    })
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    let employee = await Employee.findByPk(id);
    return res.status(200).json({
        code : 200,
        message : 'success',
        data : employee
    })
})

router.post('/', async (req, res) => {
    const schema = {
        name : 'string',
        uid : 'string',
        address : 'string',
        pob : 'string',
        phone : 'string',
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

    let employee = await Employee.create(req.body)

    return res.status(200).json({
        code : 200,
        message : 'success',
        data : employee
    })
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    let employee = await Employee.findByPk(id)
    if (!employee) {
        return res.status(400).json({
            code : 200,
            message : 'employee not found',
            data : employee
        })
    }

    const schema = {
        name : 'string',
        uid : 'string',
        address : 'string|optional',
        pob : 'string|optional',
        phone : 'string|optional',
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json({
            code : 200,
            message : 'error',
            data : validate
        })
    }

    employee = await employee.update(req.body)

    return res.status(200).json({
        code : 200,
        message : 'success',
        data : employee
    })
})

router.delete('/:id', async (req, res) => {
    const ids = req.params.id;
    let employee = await Employee.destroy({where: { id_emp: ids }})
    return res.status(200).json({
        code : 200,
        message : 'success',
        data : employee
    })
})

module.exports = router;