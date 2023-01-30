const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { getEmployeeID, getMenuBasedRights, getModuleGroupByID, getSubModuleRights, getSelectMenu, getEmpName,
    getModuleGroup, getModuleRights, getempId, inpatientList, getBranch, getDesignation, getSalutation,
    getSerialnumber, getSerialnoEmpDetl, getInchargehod,
    getproceedcount, getNewOrderCount, getDietpatient, getNurstation, getDietMenu, getLoginProfile,
    getDashboardRights, getEmployeedeptSec, getfloor, getnurstationbyfloor } = require('../commoncode/common.controller');

router.get("/getempid/:id", checkToken, getEmployeeID)
router.get("/getMenu/:id", checkToken, getMenuBasedRights)
router.post("/getModlRight", checkToken, getModuleRights) //get User Module right
router.get("/empname", checkToken, getEmpName)
router.get("/menuname", checkToken, getSelectMenu);
router.get("/modulegroup", checkToken, getModuleGroup)
router.get("/modulegroup/:id", checkToken, getModuleGroupByID);
router.post("/getSubModlRight", checkToken, getSubModuleRights) //get User Module right
router.get("/getempId", checkToken, getempId)
router.get("/inpatientList/:id", checkToken, inpatientList)
router.get("/branch/getList", checkToken, getBranch);
router.get("/getList/designation", checkToken, getDesignation);
router.get("/getList/Salutation", checkToken, getSalutation);
router.get("/getSerialno", checkToken, getSerialnumber);
router.get("/getproceedcount", checkToken, getproceedcount)
router.get('/getNewOrderCount', checkToken, getNewOrderCount)
router.get('/dietplan/:id', checkToken, getDietpatient);
router.get('/getnurstn', checkToken, getNurstation)

router.get("/dMenu/:id", checkToken, getDietMenu)
router.get("/getLoginProfile/:id", checkToken, getLoginProfile)
router.get("/dashrights/:id", checkToken, getDashboardRights) //Dashboard Rights

router.get("/emp/deptsec/:id", checkToken, getEmployeedeptSec);
router.get('/get/floor', checkToken, getfloor)
router.get('/nursfloor/:id', checkToken, getnurstationbyfloor)
router.get("/getEmpSlno", checkToken, getSerialnoEmpDetl);
router.get("/inchargehod/:id", checkToken, getInchargehod)


module.exports = router;