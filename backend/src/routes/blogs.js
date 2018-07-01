const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/blogs')

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getOne)
router.post('/', ctrl.create)
router.put('/', ctrl.update)
router.delete('/', deleteOne)

module.exports = router