const router = require("express").Router();
const { RoomCategoryInsert, RoomCategoryView, RoomCategoryUpdate } = require('../rm_room_category_master/room_category.controller');



router.post('/insert', RoomCategoryInsert)
router.get('/view', RoomCategoryView)
router.patch('/update', RoomCategoryUpdate)
module.exports = router