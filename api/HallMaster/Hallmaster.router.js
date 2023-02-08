const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { insertHallmaster, updatehallname, gethalldetail } = require('../HallMaster/Hallmaster.controller')



router.post('/inserthall', checkToken, insertHallmaster)
router.patch('/updatehall', checkToken, updatehallname)
router.get('/gethall', checkToken, gethalldetail)


module.exports = router;