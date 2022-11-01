const router = require('express').Router();
const { checkToken } = require("../../authentication/token_validation");
const { employeeinsert, employeeupdate, getemplpyee, employeedelete, login, empInsert, employeeGetAll, updateEmployee } = require('../employee/employee.controller');

router.post("/login", login);
router.post('/', checkToken, employeeinsert);
router.patch('/', checkToken, employeeupdate);
router.get('/', checkToken, getemplpyee);
router.delete('/', checkToken, employeedelete);

router.post('/empInsert', checkToken, empInsert);
router.get('/getall', checkToken, employeeGetAll);
router.patch('/update', checkToken, updateEmployee);




module.exports = router;