const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { simOperatorInsert, simOperatorView, simOperatorUpdate, getsimOperator } = require('./sim_operators.controller');

router.post('/insert', checkToken, simOperatorInsert)
router.get('/view', checkToken, simOperatorView)
router.patch('/update', checkToken, simOperatorUpdate)

router.get('/getsimOperator', checkToken, getsimOperator)
module.exports = router