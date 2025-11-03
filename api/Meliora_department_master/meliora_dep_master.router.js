const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { createDept, DeptMasterGet, Updatedeptmaster, createDeptSecMaster, DeptSecMasterGet, UpdatedeptSecmaster, UpdatedeptSecmasterID, GetdeptSecEmp } = require('../Meliora_department_master/meliora_dep_master.controller')


router.post("/deptmaster", checkToken, createDept);
router.get("/DeptMasterGet", checkToken, DeptMasterGet);
router.patch("/Updatedeptmaster", checkToken, Updatedeptmaster);

// depsec master
router.post("/deptSecmaster", checkToken, createDeptSecMaster);
router.get("/DeptSecMasterGet", checkToken, DeptSecMasterGet);
router.patch("/UpdatedeptSecmaster", checkToken, UpdatedeptSecmaster);

router.get("/DeptSecMasterGetID/:id", checkToken, UpdatedeptSecmasterID);
router.get("/Melempdeptsec/:id", checkToken, GetdeptSecEmp);


module.exports = router;
