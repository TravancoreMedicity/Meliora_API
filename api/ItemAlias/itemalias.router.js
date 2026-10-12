const { checkToken } = require('../../authentication/token_validation');
const {
    insertItemAlias,
    getAllItemAlias,
    updateItemAlias
} = require('./itemalias.controller');

const router = require('express').Router();

router.post("/insert", checkToken, insertItemAlias);
router.get("/getall", checkToken, getAllItemAlias);
router.patch("/update", checkToken, updateItemAlias);

module.exports = router;