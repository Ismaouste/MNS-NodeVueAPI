const express = require('express')
const router = express.Router()


const todoCtrl = require ('../controllers/todoCtrl');

router.get('/', todoCtrl.list);
router.get('/:id', todoCtrl.getOneItem);
router.post('/', todoCtrl.postItem);
// router.delete('/:id',todoCtrl.delete);
// router.patch('/:id',todoCtrl.edit);

module.exports = router;