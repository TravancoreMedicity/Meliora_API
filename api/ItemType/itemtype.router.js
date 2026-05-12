const { checkToken } = require('../../authentication/token_validation');

const {
    insertItemType,
    getAllItemType,
    updateItemType
} = require('./itemtype.controller');

const router = require('express').Router();

router.post("/insert", checkToken, insertItemType);
router.get("/getall", checkToken, getAllItemType);
router.patch("/update", checkToken, updateItemType);

module.exports = router;