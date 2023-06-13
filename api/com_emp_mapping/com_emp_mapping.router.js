const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { inserEmpmap, getEmpMapping, updateEmpMap, selectallEmpMapping } = require('../com_emp_mapping/com_emp_mapping.controller')

router.post('/insertEmp', checkToken, inserEmpmap)
router.get('/get', checkToken, getEmpMapping)
router.patch('/update', checkToken, updateEmpMap)
router.get("/selectall/:id", checkToken, selectallEmpMapping);


module.exports = router;