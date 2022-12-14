const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { InsertHighBiotic, updateHighBiotic, gethighantibio } = require('../HighAntiBioticMaster/HighAntiBiotic.controll')


router.post('/antibiotic', checkToken, InsertHighBiotic)
router.patch('/updatehighbio', checkToken, updateHighBiotic)
router.get('/getbio', checkToken, gethighantibio)



module.exports = router;