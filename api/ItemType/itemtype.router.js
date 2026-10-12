const { checkToken } = require('../../authentication/token_validation');
const { requireMenuRight } = require('../../authentication/menuRights');
const { stampActor } = require('../../authentication/userChecks');
const { MENU_ITEM_TYPE } = require('../../authentication/menuNumbers');

const {
    insertItemType,
    getAllItemType,
    updateItemType
} = require('./itemtype.controller');

const router = require('express').Router();

// Writes need the right of the "Item Type Master" screen (menu 361)
router.post("/insert", checkToken, requireMenuRight(MENU_ITEM_TYPE), stampActor('created_by'), insertItemType);
router.get("/getall", checkToken, getAllItemType);
router.patch("/update", checkToken, requireMenuRight(MENU_ITEM_TYPE), stampActor('updated_by'), updateItemType);

module.exports = router;