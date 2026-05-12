const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const {
    insertCategoryItemMaster,
    getItemCategoryMaster,
    updateItemCategoryMaster,
    getAllItemCategory
} = require('./ItemCategory.controller');


router.post("/insert", checkToken, insertCategoryItemMaster);
router.get("/fetchalldata", checkToken, getItemCategoryMaster);
router.patch("/update", checkToken, updateItemCategoryMaster);

router.post("/fetchdatabyid", checkToken, getAllItemCategory);

module.exports = router;