const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { InsertToken, getToken, updatetoken, Insertdate, Getdate, GetDateThisMonth, Insertdivision, Getdivision, updatedivision, InsertTax, Gettax, updatetax, GetDashboardTokens } = require('../tokenmaster/tokenmaster.controller');


router.post('/insert', checkToken, InsertToken)
router.get('/Gettoken', checkToken, getToken)
router.post("/update", checkToken, updatetoken)
router.post('/insertdate', checkToken, Insertdate)
router.get('/Getdate', checkToken, Getdate)
router.get('/GetdateThisMonth', checkToken, GetDateThisMonth)
router.post('/insertdivision', checkToken, Insertdivision)
router.get('/Getdivision', checkToken, Getdivision)
router.post('/updatedivision', checkToken, updatedivision)
router.post('/inserttax', checkToken, InsertTax)
router.get('/Gettax', checkToken, Gettax)
router.post("/updatetax", checkToken, updatetax)
router.get("/GetDashboardTokens", checkToken, GetDashboardTokens)
module.exports = router
