const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { checkDetailInsertOrNot, ItemDetailsInsert } = require('../am_item_creation_detail/am_itemdetail.controller');

router.get("/checkDetailInsertOrNot/:id", checkToken, checkDetailInsertOrNot)

router.post('/ItemDetailsInsert', checkToken, ItemDetailsInsert)



module.exports = router