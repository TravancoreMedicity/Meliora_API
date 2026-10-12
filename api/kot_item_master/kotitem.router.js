const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { kotItemInsert, getKotitem, updatekotitem, GetAllRoomTypeDetail, InsertDietRoomMaster, GetDietRoomMaster, UpdateDietRoomMaster, GetAllDietDeliveryDetail, InsertDietDeliveryDetail, UpdateDietDeliveryDetail, GetAllNsBasedBeds } = require('../kot_item_master/kotitem.controller');



router.post("/insert", checkToken, kotItemInsert)
router.get("/get/kotitem", getKotitem)// add checktoken
router.patch("/update/kotitem", checkToken, updatekotitem)


router.get('/room/getallroomtype', checkToken, GetAllRoomTypeDetail)
router.post("/insertdietroom", checkToken, InsertDietRoomMaster);
router.patch("/updatedietroom", checkToken, UpdateDietRoomMaster);
router.get("/getalldietroom", checkToken, GetDietRoomMaster);

//Diet Delivery Master
router.get('/getalldietdelivery', GetAllDietDeliveryDetail)// add checktoken
router.post("/insertdietdelivery", checkToken, InsertDietDeliveryDetail);
router.patch("/updatedietdelivery", checkToken, UpdateDietDeliveryDetail);


router.post('/getnsbeds', GetAllNsBasedBeds) // add checktoken



module.exports = router;