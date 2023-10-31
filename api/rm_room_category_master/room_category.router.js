const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { RoomCategoryInsert, RoomCategoryView, RoomCategoryUpdate } = require('../rm_room_category_master/room_category.controller');

router.post('/insert', checkToken, RoomCategoryInsert)
router.get('/view', checkToken, RoomCategoryView)
router.patch('/update', checkToken, RoomCategoryUpdate)
module.exports = router