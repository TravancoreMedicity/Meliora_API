const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { dietdetlinsert, getdatadetl, updatedietdetl, getdatedeittype } = require('../Dietdetl/dietdetl.controller')


router.post('/insert', checkToken, dietdetlinsert)
router.get('/getdietdetl', checkToken, getdatadetl)
router.patch('/update/dietdetl', checkToken, updatedietdetl)
router.get('/date/:id', checkToken, getdatedeittype)


module.exports = router;